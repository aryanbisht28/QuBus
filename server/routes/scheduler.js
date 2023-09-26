const router = require("express").Router();
const cron = require("node-cron");
const Reach = require("../models/reaches");
const { User } = require("../models/user");
const sendMail = require("../utils/sendMail");

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

let clientData = [];
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
  for (let month = mon; month < 12; month++) {
    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const currentDate = new Date(year, month, day);
      if (currentDate.getDay() === 5) {
        const formattedDate = `${year}-${(month + 1)
          .toString()
          .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        fridays.push(formattedDate);
      }
    }
  }
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

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function percentange(rows, client) {
  // console.log("Inside percentage");
  let upRows = rows;
  let details = {};
  details["dailynotperformed"] = 0;
  details["dailyperformed"] = 0;
  details["weeklynotperformed"] = 0;
  details["weeklyperformed"] = 0;
  details["monthlynotperformed"] = 0;
  details["monthlyperformed"] = 0;

  for (let i = 0; i < upRows.length; i++) {
    if (upRows[i]["Frequency"] === "Daily") {
      let end_date = new Date();
      let start_date = new Date(end_date.getTime() - 7 * 24 * 60 * 60 * 1000);
      // var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));

      const dates = [];
      let currentDate = new Date(start_date);
      const today = new Date();
      while (currentDate <= today && currentDate <= end_date) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      let performArray = [];
      upRows[i]["performed"].map((date) => {
        performArray.push(formatDate(date));
      });
      const missingElements = dates.filter((el) => !performArray.includes(el));
      upRows[i]["notperformed"] = missingElements;
      if (
        !performArray.includes(formatDate(end_date)) &&
        missingElements.length > 1
      ) {
        upRows[i]["status"] = "Pending and Not Performed";
        upRows[i]["pending"] = formatDate(end_date);
        upRows[i]["dispstatus"] = "Not Completed";
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
      }
      // console.log("daily",client)
    } else if (upRows[i]["Frequency"] === "Weekly") {
      if (upRows[i]["Client"] === "Plum") {
        let arry = [];
        let end_date = new Date();
        let start_date = new Date(end_date.getTime() - 7 * 24 * 60 * 60 * 1000);
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
        }
        // console.log("weekly")
      } else if (upRows[i]["Client"] === "CPFS") {
        let arry = [];
        let end_date = new Date();
        let start_date = new Date(end_date.getTime() - 7 * 24 * 60 * 60 * 1000);
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
          upRows[i]["dispstatus"] = "Not Completed";
        } else if (
          arry.length > 0 &&
          !arry.includes(formatDate(new Date(presentDate)))
        ) {
          upRows[i]["status"] = "Not Performed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (arry.length == 0) {
          upRows[i]["status"] = "Completed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (arry.includes(formatDate(now))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(now);
          upRows[i]["dispstatus"] = "Not Completed";
        }
      } else if (upRows[i]["Client"] === "Nextlink") {
        let arry = [];
        let end_date = new Date();
        let start_date = new Date(end_date.getTime() - 7 * 24 * 60 * 60 * 1000);
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
          upRows[i]["dispstatus"] = "Not Completed";
        } else if (
          arry.length > 0 &&
          !arry.includes(formatDate(new Date(presentDate)))
        ) {
          upRows[i]["status"] = "Not Performed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (arry.length == 0) {
          upRows[i]["status"] = "Completed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (arry.includes(formatDate(now))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(now);
          upRows[i]["dispstatus"] = "Not Completed";
        }
      } else {
        let arry = [];
        let end_date = new Date();
        let start_date = new Date(end_date.getTime() - 7 * 24 * 60 * 60 * 1000);
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
          upRows[i]["dispstatus"] = "Not Completed";
        } else if (
          arry.length > 0 &&
          !arry.includes(formatDate(new Date(presentDate)))
        ) {
          upRows[i]["status"] = "Not Performed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (arry.length == 0) {
          upRows[i]["status"] = "Completed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (arry.includes(formatDate(now))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(now);
          upRows[i]["dispstatus"] = "Not Completed";
        }
      }
      // console.log("weekly")
    } else if (upRows[i]["Frequency"] === "Monthly") {
      let arry = [];
      let end_date = new Date();
      let start_date = new Date(end_date.getTime() - 7 * 24 * 60 * 60 * 1000);
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
      } else if (arry.length > 0) {
        upRows[i]["status"] = "Not Performed";
      } else if (arry.length == 0) {
        upRows[i]["status"] = "Completed";
      } else if (arry.includes(formatDate(new Date(presentDate)))) {
        upRows[i]["status"] = "Pending";
        upRows[i]["pending"] = formatDate(new Date(presentDate));
      }
      // console.log("monthly")
    }
  }
  // console.log('after for1')

  for (let i = 0; i < upRows.length; i++) {
    if (upRows[i]["Frequency"] === "Daily") {
      details["dailynotperformed"] += upRows[i]["notperformed"].length;
      details["dailyperformed"] += upRows[i]["performed"].length;
    } else if (upRows[i]["Frequency"] === "Weekly") {
      details["weeklynotperformed"] += upRows[i]["notperformed"].length;
      details["weeklyperformed"] += upRows[i]["performed"].length;
    } else if (upRows[i]["Frequency"] === "Monthly") {
      details["monthlynotperformed"] += upRows[i]["notperformed"].length;
      details["monthlyperformed"] += upRows[i]["performed"].length;
    }
  }

  let percentage = 0;
  let performed = 0;
  let total = 0;
  // if (freq === "All") {
  total +=
    details.dailynotperformed +
    details.dailyperformed +
    details.monthlynotperformed +
    details.monthlyperformed +
    details.weeklynotperformed +
    details.weeklyperformed;
  performed +=
    details.dailyperformed + details.monthlyperformed + details.weeklyperformed;
  percentage = (performed / total) * 100;
  // console.log('total',total,'per',performed,'percent',percentage, 'client',client)
  let obj = {};
  obj["Client"] = client;
  obj["performed"] = performed;
  obj["notperformed"] = total - performed;
  obj["total"] = total;
  obj["percentage"] = percentage;
  clientData.push(obj);
}

// async function percentange(rows, user) {
//   let upRows = rows;
//   let manager = [];
//   for (let i = 0; i < upRows.length; i++) {
//     const Manager = await User.findOne({ name: upRows[i]["Manager"] });
//     manager.push(Manager.email);
//     if (upRows[i]["Frequency"] === "Daily") {
//       let start_date = new Date(upRows[i]["startdate"]);
//       let end_date = new Date();
//       const dates = [];
//       let currentDate = new Date(start_date);
//       const today = new Date();
//       while (currentDate <= today && currentDate <= end_date) {
//         dates.push(formatDate(currentDate));
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//       // //console.log('dates',upRows[i]["performed"])
//       let performArray = [];
//       upRows[i]["performed"].map((date) => {
//         // //console.log('yo',formatDate(date))
//         performArray.push(formatDate(date));
//       });
//       // //console.log('performed',performArray)
//       const missingElements = dates.filter((el) => !performArray.includes(el));
//       upRows[i]["notperformed"] = missingElements;
//       if (
//         !performArray.includes(formatDate(end_date)) &&
//         missingElements.length > 1
//       ) {
//         upRows[i]["status"] = "Pending and Not Performed";
//         upRows[i]["pending"] = formatDate(end_date);
//       } else if (
//         performArray.includes(formatDate(end_date)) &&
//         !missingElements.includes(formatDate(end_date)) &&
//         missingElements.length > 0
//       ) {
//         upRows[i]["status"] = "Not Performed";
//       } else if (missingElements.length == 0) {
//         upRows[i]["status"] = "Completed";
//       } else if (missingElements.includes(formatDate(end_date))) {
//         upRows[i]["status"] = "Pending";
//         upRows[i]["pending"] = formatDate(end_date);
//       }
//     } else if (upRows[i]["Frequency"] === "Weekly") {
//       if (upRows[i]["Client"] === "Plum") {
//         let arry = [];
//         let start_date = new Date(upRows[i]["startdate"]);
//         const currentYear = new Date().getFullYear();
//         const month = start_date.getMonth();
//         const tuesdays = getAllTuesdays(currentYear, month);
//         let monthTuesdays = [];
//         for (let i = 0; i < tuesdays.length; i++) {
//           if (tuesdays[i] >= formatDate(start_date)) {
//             monthTuesdays.push(tuesdays[i]);
//           }
//         }
//         let performArray = [];
//         upRows[i]["performed"].map((date) => {
//           performArray.push(formatDate(date));
//         });
//         const missingElements = monthTuesdays.filter(
//           (el) => !performArray.includes(el)
//         );
//         for (let i = 0; i < missingElements.length; i++) {
//           if (new Date(missingElements[i]) < new Date(presentDate)) {
//             arry.push(missingElements[i]);
//           }
//         }

//         const daysOfWeek = [
//           "Sunday",
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ];
//         const now = new Date();
//         const dayOfWeekName = daysOfWeek[now.getDay()];
//         if (dayOfWeekName === "Tuesday") {
//           if (!performArray.includes(formatDate(now)))
//             arry.push(formatDate(now));
//         }
//         upRows[i]["notperformed"] = arry;
//         if (arry.includes(formatDate(now)) && arry.length > 1) {
//           upRows[i]["status"] = "Pending and Not Performed";
//           upRows[i]["pending"] = formatDate(now);
//         } else if (
//           arry.length > 0 &&
//           !arry.includes(formatDate(new Date(presentDate)))
//         ) {
//           upRows[i]["status"] = "Not Performed";
//         } else if (arry.length == 0) {
//           upRows[i]["status"] = "Completed";
//         } else if (arry.includes(formatDate(now))) {
//           upRows[i]["status"] = "Pending";
//           upRows[i]["pending"] = formatDate(now);
//         }
//       } else if (upRows[i]["Client"] === "CPFS") {
//         let arry = [];
//         let start_date = new Date(upRows[i]["startdate"]);
//         const currentYear = new Date().getFullYear();
//         const month = start_date.getMonth();
//         const wednesdays = getAllWednesdays(currentYear, month);
//         let monthWednesday = [];
//         for (let i = 0; i < wednesdays.length; i++) {
//           if (wednesdays[i] >= formatDate(start_date)) {
//             monthWednesday.push(wednesdays[i]);
//           }
//         }
//         let performArray = [];
//         upRows[i]["performed"].map((date) => {
//           performArray.push(formatDate(date));
//         });
//         const missingElements = monthWednesday.filter(
//           (el) => !performArray.includes(el)
//         );
//         for (let i = 0; i < missingElements.length; i++) {
//           if (new Date(missingElements[i]) < new Date(presentDate)) {
//             arry.push(missingElements[i]);
//           }
//         }
//         const daysOfWeek = [
//           "Sunday",
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ];
//         const now = new Date();
//         const dayOfWeekName = daysOfWeek[now.getDay()];
//         if (dayOfWeekName === "Wednesday") {
//           if (!performArray.includes(formatDate(now)))
//             arry.push(formatDate(now));
//         }
//         upRows[i]["notperformed"] = arry;
//         if (arry.includes(formatDate(now)) && arry.length > 1) {
//           upRows[i]["status"] = "Pending and Not Performed";
//           upRows[i]["pending"] = formatDate(now);
//         } else if (
//           arry.length > 0 &&
//           !arry.includes(formatDate(new Date(presentDate)))
//         ) {
//           upRows[i]["status"] = "Not Performed";
//         } else if (arry.length == 0) {
//           upRows[i]["status"] = "Completed";
//         } else if (arry.includes(formatDate(now))) {
//           upRows[i]["status"] = "Pending";
//           upRows[i]["pending"] = formatDate(now);
//         }
//       } else if (upRows[i]["Client"] === "Nextlink") {
//         let arry = [];
//         let start_date = new Date(upRows[i]["startdate"]);
//         const currentYear = new Date().getFullYear();
//         const month = start_date.getMonth();
//         const thursdays = getAllThursdays(currentYear, month);
//         let monthThursdays = [];
//         for (let i = 0; i < thursdays.length; i++) {
//           if (thursdays[i] >= formatDate(start_date)) {
//             monthThursdays.push(thursdays[i]);
//           }
//         }
//         let performArray = [];
//         upRows[i]["performed"].map((date) => {
//           performArray.push(formatDate(date));
//         });
//         const missingElements = monthThursdays.filter(
//           (el) => !performArray.includes(el)
//         );
//         for (let i = 0; i < missingElements.length; i++) {
//           if (new Date(missingElements[i]) < new Date(presentDate)) {
//             arry.push(missingElements[i]);
//           }
//         }

//         const daysOfWeek = [
//           "Sunday",
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ];
//         const now = new Date();
//         const dayOfWeekName = daysOfWeek[now.getDay()];
//         if (dayOfWeekName === "Thursday") {
//           if (!performArray.includes(formatDate(now)))
//             arry.push(formatDate(now));
//         }
//         upRows[i]["notperformed"] = arry;
//         if (arry.includes(formatDate(now)) && arry.length > 1) {
//           upRows[i]["status"] = "Pending and Not Performed";
//           upRows[i]["pending"] = formatDate(now);
//         } else if (
//           arry.length > 0 &&
//           !arry.includes(formatDate(new Date(presentDate)))
//         ) {
//           upRows[i]["status"] = "Not Performed";
//         } else if (arry.length == 0) {
//           upRows[i]["status"] = "Completed";
//         } else if (arry.includes(formatDate(now))) {
//           upRows[i]["status"] = "Pending";
//           upRows[i]["pending"] = formatDate(now);
//         }
//       } else {
//         let arry = [];
//         let start_date = new Date(upRows[i]["startdate"]);
//         const currentYear = new Date().getFullYear();
//         const month = start_date.getMonth();
//         const fridays = getAllFridays(currentYear, month);
//         let monthFriday = [];
//         for (let i = 0; i < fridays.length; i++) {
//           if (fridays[i] >= formatDate(start_date)) {
//             monthFriday.push(fridays[i]);
//           }
//         }
//         let performArray = [];
//         upRows[i]["performed"].map((date) => {
//           performArray.push(formatDate(date));
//         });
//         const missingElements = monthFriday.filter(
//           (el) => !performArray.includes(el)
//         );
//         for (let i = 0; i < missingElements.length; i++) {
//           if (new Date(missingElements[i]) < new Date(presentDate)) {
//             arry.push(missingElements[i]);
//           }
//         }

//         const daysOfWeek = [
//           "Sunday",
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ];
//         const now = new Date();
//         const dayOfWeekName = daysOfWeek[now.getDay()];
//         if (dayOfWeekName === "Friday") {
//           if (!performArray.includes(formatDate(now)))
//             arry.push(formatDate(now));
//         }
//         upRows[i]["notperformed"] = arry;
//         if (arry.includes(formatDate(now)) && arry.length > 1) {
//           upRows[i]["status"] = "Pending and Not Performed";
//           upRows[i]["pending"] = formatDate(now);
//         } else if (
//           arry.length > 0 &&
//           !arry.includes(formatDate(new Date(presentDate)))
//         ) {
//           upRows[i]["status"] = "Not Performed";
//         } else if (arry.length == 0) {
//           upRows[i]["status"] = "Completed";
//         } else if (arry.includes(formatDate(now))) {
//           upRows[i]["status"] = "Pending";
//           upRows[i]["pending"] = formatDate(now);
//         }
//       }
//     } else if (upRows[i]["Frequency"] === "Monthly") {
//       let arry = [];
//       let start_date = new Date(upRows[i]["startdate"]);
//       const month = start_date.getMonth();
//       const currentYear = new Date().getFullYear();
//       const lastWorkingDays = getLastWorkingDaysOfYear(currentYear, month);
//       // setmonthlastDate(lastWorkingDays);
//       // //console.log("last working", lastWorkingDays);
//       const weekendDays = [6, 0];
//       const today = new Date();
//       const lastDayOfMonth = new Date(
//         today.getFullYear(),
//         today.getMonth() + 1,
//         0
//       );
//       let performArray = [];
//       upRows[i]["performed"].map((date) => {
//         performArray.push(formatDate(date));
//       });
//       const missingElements = lastWorkingDays.filter(
//         (el) => !performArray.includes(el)
//       );
//       for (let i = 0; i < missingElements.length; i++) {
//         if (new Date(missingElements[i]) < new Date(presentDate)) {
//           arry.push(missingElements[i]);
//         }
//       }
//       if (
//         lastWorkingDays.includes(presentDate) &&
//         !weekendDays.includes(today.getDay())
//       ) {
//         const formattedDate = today.toISOString().substring(0, 10);
//         // setmonthEndDate(formattedDate);
//         if (!upRows[i]["performed"].includes(presentDate))
//           arry.push(presentDate);
//       }
//       // //console.log("arr", arry);
//       upRows[i]["notperformed"] = arry;
//       if (arry.includes(formatDate(new Date(presentDate))) && arry.length > 1) {
//         upRows[i]["status"] = "Pending and Not Performed";
//         upRows[i]["pending"] = formatDate(new Date(presentDate));
//       } else if (arry.length > 0) {
//         upRows[i]["status"] = "Not Performed";
//       } else if (arry.length == 0) {
//         upRows[i]["status"] = "Completed";
//       } else if (arry.includes(formatDate(new Date(presentDate)))) {
//         upRows[i]["status"] = "Pending";
//         upRows[i]["pending"] = formatDate(new Date(presentDate));
//       }
//     }
//   }
//   const uniqueManager = [...new Set(manager)];
//   //  //console.log("data manager", uniqueManager);
//   let message = "";
//   message +=
//     `<p>Dear ${user["name"]},<p>` +
//     "<p>I hope you are doing well. I wanted to provide you with a comprehensive update on the controls status. Here's a summary of all the controls assigned to you for all the clients :- </p>" +
//     "<p>Not Completed :- " +
//     "</p>" +
//     '<table style="border: 1px solid #333;">' +
//     "<thead>" +
//     '<th style="border: 1px solid #333;"> Client </th>' +
//     '<th style="border: 1px solid #333;"> Control Name </th>' +
//     '<th style="border: 1px solid #333;"> Dates </th>' +
//     "</thead>";
//   upRows.map((row) => {
//     if (row.notperformed.length > 0) {
//       message += `<tr style="border: 1px solid #333;">
//           <td style="border: 1px solid #333;">${row.Client}</td>
//           <td style="border: 1px solid #333;"> ${row["Control Name"]}</td>
//           <td style="border: 1px solid #333;">${row.notperformed}</td>
//           </tr style="border: 1px solid #333;">`;
//     }
//   });
//   message +=
//     "</table>" +
//     "<p>Completed :- " +
//     "</p>" +
//     '<table style="border: 1px solid #333;">' +
//     "<thead>" +
//     '<th style="border: 1px solid #333;"> Client </th>' +
//     '<th style="border: 1px solid #333;"> Control Name </th>' +
//     '<th style="border: 1px solid #333;"> Dates </th>' +
//     "</thead>";
//   upRows.map((row) => {
//     if (row.performed.length > 0) {
//       message += `<tr style="border: 1px solid #333;">
//           <td style="border: 1px solid #333;">${row.Client}</td>
//           <td style="border: 1px solid #333;"> ${row["Control Name"]}</td>
//           <td style="border: 1px solid #333;">${row.performed.map((date) =>
//             formatDate(date)
//           )}</td>
//           </tr style="border: 1px solid #333;">`;
//     }
//   });
//   message +=
//     "</table>" +
//     `<p> Thank you for your attention to this matter.</p>` +
//     `<p> Best regards,</p>` +
//     "<p> Support Team </p>";
//   // await sendMail(user["email"], uniqueManager, "Control Review", message);

//   return upRows;
// }

async function mailfunction() {
  // console.log("clientdata", clientData);
  const users = await User.find({ desig: "Manager" });
  // console.log(users)
  let email = users.map((use)=>use.email)
  // console.log('email',email)
  let message = "";
  message +=
    `<p>Dear,<p>` +
    "<p>Please find below comprehensive update on the controls status for this week.</p>" +
    '<table style="border: 1px solid #333;">' +
    "<thead>" +
    '<th style="border: 1px solid #333;"> Client </th>' +
    '<th style="border: 1px solid #333;"> Controls Performed </th>' +
    '<th style="border: 1px solid #333;"> Controls Not Performed </th>' +
    '<th style="border: 1px solid #333;"> Total Controls to be Performed </th>' +
    '<th style="border: 1px solid #333;"> Performed Percentage </th>' +
    "</thead>";
  clientData.map((row) => {
    message += `<tr style="border: 1px solid #333;">
          <td style="border: 1px solid #333;">${row.Client}</td>
          <td style="border: 1px solid #333;"> ${row.performed}</td>
          <td style="border: 1px solid #333;">${row.notperformed}</td>
          <td style="border: 1px solid #333;">${row.total}</td>
          <td style="border: 1px solid #333;">${row.percentage}</td>
          </tr style="border: 1px solid #333;">`;
  });

  message +=
    "</table>" +
    // `<p> Thank you for your attention to this matter.</p>` +
    `<p>Best regards, <br>Support Team </p>`;
  await sendMail(email, "", "Weekly Controls Review", message);
}

// cron.schedule("*/35 * * * * *", async function () {
  cron.schedule("0 23 * * 5", async function () {
  const clients = await Reach.aggregate([
    {
      $group: {
        _id: "$Client",
      },
    },
  ]);
  // console.log("running a task every 35 second", clients);
  for (let i = 0; i < clients.length; i++) {
    const details = await Reach.aggregate([
      { $match: { Client: clients[i]._id } },
    ]);
    percentange(details, clients[i]._id);
  }
  mailfunction();
});
// cron.schedule("0 21 * * 1-5", async function () {
//   const users = await User.find({ desig: "Analyst" });
//   for (let i = 0; i < users.length; i++) {
//     const details = await Reach.aggregate([
//       { $match: { User: users[i].email } },
//     ]);
//     percentange(details, users[i]);
//   }
// });

module.exports = router;
