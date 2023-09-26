const router = require("express").Router();
const cron = require("node-cron");
const Reach = require("../models/reach");
const { User } = require("../models/user");
const sendMail = require("../utils/sendMail");

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const presentDate = formatDate(new Date());
// //console.log('present date',presentDate,new Date())

function getLastWorkingDayOfMonth(year, month) {
  const lastDay = new Date(year, month + 1, 0);
  if (lastDay.getDay() === 6) {
    return new Date(lastDay.getTime() - 1 * 24 * 60 * 60 * 1000);
  } else if (lastDay.getDay() === 0) {
    return new Date(lastDay.getTime() - 2 * 24 * 60 * 60 * 1000);
  }
  return lastDay;
}

function getAllMondays(year, mon) {
  const mondays = [];
  for (let month = mon; month < 12; month++) {
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() === 1) {
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        mondays.push(formattedDate);
      }
    }
  }
  return mondays;
}

function getAllTuesdays(year, mon) {
  const tuesdays = [];
  for (let month = mon; month < 12; month++) {
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() === 2) {
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        tuesdays.push(formattedDate);
      }
    }
  }
  return tuesdays;
}

function getAllWednesdays(year, mon) {
  const wednesdays = [];
  for (let month = mon; month < 12; month++) {
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() === 3) {
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        wednesdays.push(formattedDate);
      }
    }
  }
  return wednesdays;
}

function getAllThursdays(year, mon) {
  const thursdays = [];
  for (let month = mon; month < 12; month++) {
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() === 4) {
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        thursdays.push(formattedDate);
      }
    }
  }
  return thursdays;
}

function getAllFridays(year, mon) {
  const fridays = [];

  // Loop through each month of the year
  for (let month = mon; month < 12; month++) {
    // Loop through each day of the month
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      // Check if the current day is a Friday
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() === 5) {
        // Add the Friday to the array
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        fridays.push(formattedDate);
      }
    }
  }
  ////console.log("fridays", fridays);

  return fridays;
}

function getLastWorkingDaysOfYear(year, mon) {
  const lastWorkingDays = [];
  for (let month = mon; month < 12; month++) {
    const lastWorkingDay = getLastWorkingDayOfMonth(year, month);
    const formattedDate = `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${lastWorkingDay
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    lastWorkingDays.push(formattedDate);
  }
  return lastWorkingDays;
}

async function percentange(rows, user) {
  // //console.log('hello rows',rows)
  let task = [];
  let upRows = rows;
  let manager = [];
  for (let i = 0; i < upRows.length; i++) {
    const Manager = await User.findOne({ name: upRows[i]["Manager"] });
    manager.push(Manager.email);
    if (upRows[i]["Frequency"] === "Daily") {
      let start_date = new Date(upRows[i]["startdate"]);
      let end_date = new Date();
      const dates = [];
      let currentDate = new Date(start_date);
      const today = new Date();
      while (currentDate <= today && currentDate <= end_date) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      // //console.log('dates',upRows[i]["performed"])
      let performArray = [];
      upRows[i]["performed"].map((date) => {
        // //console.log('yo',formatDate(date))
        performArray.push(formatDate(date));
      });
      // //console.log('performed',performArray)
      const missingElements = dates.filter((el) => !performArray.includes(el));
      upRows[i]["notperformed"] = missingElements;
      if (
        !performArray.includes(formatDate(end_date)) &&
        missingElements.length > 1
      ) {
        upRows[i]["status"] = "Pending and Not Performed";
        upRows[i]["pending"] = formatDate(end_date);
        task.push(upRows[i]);
      } else if (
        performArray.includes(formatDate(end_date)) &&
        !missingElements.includes(formatDate(end_date)) &&
        missingElements.length > 0
      ) {
        upRows[i]["status"] = "Not Performed";
      } else if (missingElements.length == 0) {
        upRows[i]["status"] = "Completed";
      } else if (missingElements.includes(formatDate(end_date))) {
        upRows[i]["status"] = "Pending";
        upRows[i]["pending"] = formatDate(end_date);
        task.push(upRows[i]);
      }
    } else if (upRows[i]["Frequency"] === "Weekly") {
      if (upRows[i]["Client"] === "Plum") {
        let arry = [];
        let start_date = new Date(upRows[i]["startdate"]);
        const currentYear = new Date().getFullYear();
        const month = start_date.getMonth();
        const tuesdays = getAllTuesdays(currentYear, month);
        let monthTuesdays = [];
        for (let i = 0; i < tuesdays.length; i++) {
          if (tuesdays[i] >= formatDate(start_date)) {
            monthTuesdays.push(tuesdays[i]);
          }
        }
        let performArray = [];
        upRows[i]["performed"].map((date) => {
          performArray.push(formatDate(date));
        });
        const missingElements = monthTuesdays.filter(
          (el) => !performArray.includes(el)
        );
        for (let i = 0; i < missingElements.length; i++) {
          if (new Date(missingElements[i]) < new Date(presentDate)) {
            arry.push(missingElements[i]);
          }
        }

        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const now = new Date();
        const dayOfWeekName = daysOfWeek[now.getDay()];
        if (dayOfWeekName === "Tuesday") {
          if (!performArray.includes(formatDate(now)))
            arry.push(formatDate(now));
        }
        upRows[i]["notperformed"] = arry;
        if (arry.includes(formatDate(now)) && arry.length > 1) {
          upRows[i]["status"] = "Pending and Not Performed";
          upRows[i]["pending"] = formatDate(now);
          task.push(upRows[i]);
        } else if (
          arry.length > 0 &&
          !arry.includes(formatDate(new Date(presentDate)))
        ) {
          upRows[i]["status"] = "Not Performed";
        } else if (arry.length == 0) {
          upRows[i]["status"] = "Completed";
        } else if (arry.includes(formatDate(now))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(now);
          task.push(upRows[i]);
        }
      } else if (upRows[i]["Client"] === "CPFS") {
        let arry = [];
        let start_date = new Date(upRows[i]["startdate"]);
        const currentYear = new Date().getFullYear();
        const month = start_date.getMonth();
        const wednesdays = getAllWednesdays(currentYear, month);
        let monthWednesday = [];
        for (let i = 0; i < wednesdays.length; i++) {
          if (wednesdays[i] >= formatDate(start_date)) {
            monthWednesday.push(wednesdays[i]);
          }
        }
        let performArray = [];
        upRows[i]["performed"].map((date) => {
          performArray.push(formatDate(date));
        });
        const missingElements = monthWednesday.filter(
          (el) => !performArray.includes(el)
        );
        for (let i = 0; i < missingElements.length; i++) {
          if (new Date(missingElements[i]) < new Date(presentDate)) {
            arry.push(missingElements[i]);
          }
        }
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const now = new Date();
        const dayOfWeekName = daysOfWeek[now.getDay()];
        if (dayOfWeekName === "Wednesday") {
          if (!performArray.includes(formatDate(now)))
            arry.push(formatDate(now));
        }
        upRows[i]["notperformed"] = arry;
        if (arry.includes(formatDate(now)) && arry.length > 1) {
          upRows[i]["status"] = "Pending and Not Performed";
          upRows[i]["pending"] = formatDate(now);
          task.push(upRows[i]);
        } else if (
          arry.length > 0 &&
          !arry.includes(formatDate(new Date(presentDate)))
        ) {
          upRows[i]["status"] = "Not Performed";
        } else if (arry.length == 0) {
          upRows[i]["status"] = "Completed";
        } else if (arry.includes(formatDate(now))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(now);
          task.push(upRows[i]);
        }
      } else if (upRows[i]["Client"] === "Nextlink") {
        let arry = [];
        let start_date = new Date(upRows[i]["startdate"]);
        const currentYear = new Date().getFullYear();
        const month = start_date.getMonth();
        const thursdays = getAllThursdays(currentYear, month);
        let monthThursdays = [];
        for (let i = 0; i < thursdays.length; i++) {
          if (thursdays[i] >= formatDate(start_date)) {
            monthThursdays.push(thursdays[i]);
          }
        }
        let performArray = [];
        upRows[i]["performed"].map((date) => {
          performArray.push(formatDate(date));
        });
        const missingElements = monthThursdays.filter(
          (el) => !performArray.includes(el)
        );
        for (let i = 0; i < missingElements.length; i++) {
          if (new Date(missingElements[i]) < new Date(presentDate)) {
            arry.push(missingElements[i]);
          }
        }

        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const now = new Date();
        const dayOfWeekName = daysOfWeek[now.getDay()];
        if (dayOfWeekName === "Thursday") {
          if (!performArray.includes(formatDate(now)))
            arry.push(formatDate(now));
        }
        upRows[i]["notperformed"] = arry;
        if (arry.includes(formatDate(now)) && arry.length > 1) {
          upRows[i]["status"] = "Pending and Not Performed";
          upRows[i]["pending"] = formatDate(now);
          task.push(upRows[i]);
        } else if (
          arry.length > 0 &&
          !arry.includes(formatDate(new Date(presentDate)))
        ) {
          upRows[i]["status"] = "Not Performed";
        } else if (arry.length == 0) {
          upRows[i]["status"] = "Completed";
        } else if (arry.includes(formatDate(now))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(now);
          task.push(upRows[i]);
        }
      } else {
        let arry = [];
        let start_date = new Date(upRows[i]["startdate"]);
        const currentYear = new Date().getFullYear();
        const month = start_date.getMonth();
        const fridays = getAllFridays(currentYear, month);
        let monthFriday = [];
        for (let i = 0; i < fridays.length; i++) {
          if (fridays[i] >= formatDate(start_date)) {
            monthFriday.push(fridays[i]);
          }
        }
        let performArray = [];
        upRows[i]["performed"].map((date) => {
          performArray.push(formatDate(date));
        });
        const missingElements = monthFriday.filter(
          (el) => !performArray.includes(el)
        );
        for (let i = 0; i < missingElements.length; i++) {
          if (new Date(missingElements[i]) < new Date(presentDate)) {
            arry.push(missingElements[i]);
          }
        }

        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const now = new Date();
        const dayOfWeekName = daysOfWeek[now.getDay()];
        if (dayOfWeekName === "Friday") {
          if (!performArray.includes(formatDate(now)))
            arry.push(formatDate(now));
        }
        upRows[i]["notperformed"] = arry;
        if (arry.includes(formatDate(now)) && arry.length > 1) {
          upRows[i]["status"] = "Pending and Not Performed";
          upRows[i]["pending"] = formatDate(now);
          task.push(upRows[i]);
        } else if (
          arry.length > 0 &&
          !arry.includes(formatDate(new Date(presentDate)))
        ) {
          upRows[i]["status"] = "Not Performed";
        } else if (arry.length == 0) {
          upRows[i]["status"] = "Completed";
        } else if (arry.includes(formatDate(now))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(now);
          task.push(upRows[i]);
        }
      }
    } else if (upRows[i]["Frequency"] === "Monthly") {
      let arry = [];
      let start_date = new Date(upRows[i]["startdate"]);
      const month = start_date.getMonth();
      const currentYear = new Date().getFullYear();
      const lastWorkingDays = getLastWorkingDaysOfYear(currentYear, month);
      const weekendDays = [6, 0];
      const today = new Date();
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      let performArray = [];
      upRows[i]["performed"].map((date) => {
        performArray.push(formatDate(date));
      });
      const missingElements = lastWorkingDays.filter(
        (el) => !performArray.includes(el)
      );
      for (let i = 0; i < missingElements.length; i++) {
        if (new Date(missingElements[i]) < new Date(presentDate)) {
          arry.push(missingElements[i]);
        }
      }
      if (
        lastWorkingDays.includes(presentDate) &&
        !weekendDays.includes(today.getDay())
      ) {
        const formattedDate = today.toISOString().substring(0, 10);
        // setmonthEndDate(formattedDate);
        if (!upRows[i]["performed"].includes(presentDate))
          arry.push(presentDate);
      }
      // //console.log("arr", arry);
      upRows[i]["notperformed"] = arry;
      if (arry.includes(formatDate(new Date(presentDate))) && arry.length > 1) {
        upRows[i]["status"] = "Pending and Not Performed";
        upRows[i]["pending"] = formatDate(new Date(presentDate));
        task.push(upRows[i]);
      } else if (arry.length > 0) {
        upRows[i]["status"] = "Not Performed";
      } else if (arry.length == 0) {
        upRows[i]["status"] = "Completed";
      } else if (arry.includes(formatDate(new Date(presentDate)))) {
        upRows[i]["status"] = "Pending";
        upRows[i]["pending"] = formatDate(new Date(presentDate));
        task.push(upRows[i]);
      }
    }
  }
  const uniqueManager = [...new Set(manager)];
  let message = "";
  message +=
    `<p>Dear ${user["name"]},<p>` +
    "<p>This is a reminder regarding the tasks that need to be completed. It's important to ensure that everything is on track and completed in a timely manner. Here are the tasks that require your attention: </p>" +
    "</p>" +
    '<table style="border: 1px solid #333;">' +
    "<thead>" +
    '<th style="border: 1px solid #333;"> Client </th>' +
    '<th style="border: 1px solid #333;"> Control Name </th>' +
    "</thead>";
  task.map((row) => {
    message += `<tr style="border: 1px solid #333;">
          <td style="border: 1px solid #333;">${row.Client}</td>
          <td style="border: 1px solid #333;"> ${row["Control Name"]}</td>
          </tr style="border: 1px solid #333;">`;
  });
  message +=
    "</table>" +
    `<p> Thank you for your attention to this matter.</p>` +
    `<p>Best regards, <br>Support Team </p>`;
  await sendMail(user["email"], uniqueManager, "Daily Task Reminder", message);

  return upRows;
}

cron.schedule("0 9 * * 1-5", async function () {
  const users = await User.find({ desig: "Analyst" });
  for (let i = 0; i < users.length; i++) {
    const details = await Reach.aggregate([
      { $match: { User: users[i].email } },
    ]);
    percentange(details, users[i]);
  }
});

module.exports = router;
