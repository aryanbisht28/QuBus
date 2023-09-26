import { React, useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Layout/Header";
import SideNav from "../../Layout/SideNav";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import SideCards from "./SideCards";
import { Bar } from "react-chartjs-2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import Grid from "@mui/material/Grid";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import "./scroll.css";
import "chartjs-plugin-datalabels";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import plugin from "chartjs-plugin-datalabels";
import { useRef } from "react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
// import 'echarts/styles';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

Chart.register(CategoryScale);

const Index = () => {
  const [client, setClient] = useState("All");
  const [freq, setFreq] = useState("All");
  const [menu, setMenu] = useState([]);
  const [ttlControl, setttlControl] = useState("0");
  const [pie, setpie] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [details, setdetails] = useState({});
  const [per, setPer] = useState("");
  const [tot, setTot] = useState("");
  const [perfo, setPerfo] = useState("");
  const [nperfo, setNPerfo] = useState("");
  const [Revenue, setRevenue] = useState("");
  const [totalDefects, settotalDefects] = useState(0);
  const [openDefects, setopenDefects] = useState(0);
  const [closeDefects, setcloseDefects] = useState(0);
  const [line, setLine] = useState([]);
  const [task, settask] = useState([]);
  const [software, setSoftware] = useState(0);
  const [issue, setissue] = useState(0);
  const [issueprior, setIssueprior] = useState([]);
  const [issueteam, setIssueteam] = useState([]);
  const [presentDate, setpresentDate] = useState(moment().format("YYYY-MM-DD"));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ACA7FC",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: "rgba(149, 114, 250, 0.33)",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  useEffect(() => {
    const url = "http://localhost:8000/clientDetails/dash";
    axios
      .get(url, {
        params: {
          email: localStorage.getItem("email"),
        },
      })
      .then(async (res) => {
        console.log("res useEffect", res);
        setMenu(res.data.clients);
        setttlControl(res.data.controls.length);

        setpie(res.data.pie);

        settotalDefects(res.data.totalDefects);
        setopenDefects(res.data.openCount);
        setcloseDefects(res.data.closeCount);
        setLine(res.data.line);
        setSoftware(res.data.softwarelevelfixCount);
        setIssueprior(res.data.issuePrior);
        setIssueteam(res.data.teamwise);
        setissue(res.data.incidentlevelCount);
        if (res.data.Revenue.length !== 0)
          setRevenue(res.data.Revenue[0]["totalRevenueImpact"]);
        if (res.data.Revenue.length === 0) setRevenue(0);
        percentange(res.data.details);
      });
  }, []);

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

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function percentange(rows) {
    // //console.log("Inside percentage", rows);
    let task = [];
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
        let start_date = new Date(upRows[i]["startdate"]);
        let end_date = new Date();
        const dates = [];
        let currentDate = new Date(start_date);
        const today = new Date();
        while (currentDate <= today && currentDate <= end_date) {
          dates.push(formatDate(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        let performArray = [];
        upRows[i]["performed"].map((date) => {
          performArray.push(date.split("T")[0]);
        });
        const missingElements = dates.filter(
          (el) => !performArray.includes(el)
        );
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
            performArray.push(date.split("T")[0]);
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
            performArray.push(date.split("T")[0]);
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
            performArray.push(date.split("T")[0]);
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
            performArray.push(date.split("T")[0]);
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
        // setmonthlastDate(lastWorkingDays);
        // //console.log("last working", lastWorkingDays);
        const weekendDays = [6, 0];
        const today = new Date();
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        let performArray = [];
        upRows[i]["performed"].map((date) => {
          performArray.push(date.split("T")[0]);
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
        if (
          arry.includes(formatDate(new Date(presentDate))) &&
          arry.length > 1
        ) {
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
    //console.log("data", upRows, details);
    settask(task);
    setdetails(details);
    let percentage = 0;
    let performed = 0;
    let total = 0;
    if (freq === "All") {
      total +=
        details.dailynotperformed +
        details.dailyperformed +
        details.monthlynotperformed +
        details.monthlyperformed +
        details.weeklynotperformed +
        details.weeklyperformed;
      performed +=
        details.dailyperformed +
        details.monthlyperformed +
        details.weeklyperformed;
      percentage = (performed / total) * 100;
    } else if (freq === "Monthly") {
      total += details.monthlynotperformed + details.monthlyperformed;
      performed += details.monthlyperformed;
      percentage = (performed / total) * 100;
    } else if (freq === "Weekly") {
      total += details.weeklynotperformed + details.weeklyperformed;
      performed += details.weeklyperformed;
      percentage = (performed / total) * 100;
    } else if (freq === "Daily") {
      total += details.dailynotperformed + details.dailyperformed;
      performed += details.dailyperformed;
      percentage = (performed / total) * 100;
    }
    //console.log("per", percentage);
    setPer(percentage.toFixed(2));
    setTot(total);
    setPerfo(performed);
    setNPerfo(total - performed);
  }

  const handleclient = async (event) => {
    if (freq === "All" && event.target.value != "All") {
      const url = "http://localhost:8000/clientDetails/dashfilterclient";
      await axios
        .get(url, {
          params: {
            email: localStorage.getItem("email"),
            Client: event.target.value,
          },
        })
        .then(async (res) => {
          //console.log("res client", res);
          setMenu(res.data.clients);
          setttlControl(res.data.controls.length);
          // setttlperform(res.data.perform[0]["totalPerformed"]);
          setIssueprior(res.data.issuePrior);
          setIssueteam(res.data.teamwise);
          setpie(res.data.pie);
          settotalDefects(res.data.totalDefects);
          setopenDefects(res.data.openCount);
          setcloseDefects(res.data.closeCount);
          setSoftware(res.data.softwarelevelfixCount);
          setissue(res.data.incidentlevelCount);
          setLine(res.data.line);
          if (res.data.Revenue.length !== 0)
            setRevenue(res.data.Revenue[0]["totalRevenueImpact"]);
          if (res.data.Revenue.length === 0) setRevenue(0);
          setClient(event.target.value);
          percentange(res.data.details);
          if (client != " ") {
            setDisabled(false);
          }
        });
    } else if (freq !== "All" && event.target.value != "All") {
      const url = "http://localhost:8000/clientDetails/dashfilterfreq";
      // await axios
      //   .get(url, {
      //     params: {
      //       email: localStorage.getItem("email"),
      //       Client: event.target.value,
      //       Frequency: freq
      //     },
      //   })
      //   .then(async (res) => {
      //     //console.log("res client", res);
      //     setMenu(res.data.clients);
      //     setttlControl(res.data.controls.length);
      //     // setttlperform(res.data.perform[0]["totalPerformed"]);
      //     setIssueprior(res.data.issuePrior);
      //     setIssueteam(res.data.teamwise);
      //     setpie(res.data.pie);
      //     settotalDefects(res.data.totalDefects);
      //     setopenDefects(res.data.openCount);
      //     setcloseDefects(res.data.closeCount);
      //     setSoftware(res.data.softwarelevelfixCount);
      //     setissue(res.data.incidentlevelCount);
      //     setLine(res.data.line);
      //     if (res.data.Revenue.length !== 0)
      //       setRevenue(res.data.Revenue[0]["totalRevenueImpact"]);
      //     if (res.data.Revenue.length === 0) setRevenue(0);
      //     setClient(event.target.value);
      //     percentange(res.data.details);
      //     setFreq("All");
      //     if (client != " ") {
      //       setDisabled(false);
      //     }
      //   });
      await axios
        .get(url, {
          params: {
            email: localStorage.getItem("email"),
            Client: event.target.value,
            Frequency: freq,
          },
        })
        .then(async (res) => {
          //console.log("res", res);
          // setMenu(res.data.clients);
          setttlControl(res.data.controls.length);
          setpie(res.data.pie);
          setClient(event.target.value);
          percentange(res.data.details);
        });
    } else if (event.target.value === "All" && freq === "All") {
      const url = "http://localhost:8000/clientDetails/dash";
      axios
        .get(url, {
          params: {
            email: localStorage.getItem("email"),
          },
        })
        .then(async (res) => {
          console.log("res useEffect", res);
          setMenu(res.data.clients);
          setttlControl(res.data.controls.length);

          setpie(res.data.pie);

          settotalDefects(res.data.totalDefects);
          setopenDefects(res.data.openCount);
          setcloseDefects(res.data.closeCount);
          setLine(res.data.line);
          setSoftware(res.data.softwarelevelfixCount);
          setIssueprior(res.data.issuePrior);
          setIssueteam(res.data.teamwise);
          setissue(res.data.incidentlevelCount);
          setClient(event.target.value);
          if (res.data.Revenue.length !== 0)
            setRevenue(res.data.Revenue[0]["totalRevenueImpact"]);
          if (res.data.Revenue.length === 0) setRevenue(0);
          percentange(res.data.details);
        });
    } else if (event.target.value === "All" && freq !== "All") {
      let url = "http://localhost:8000/clientDetails/dashfilterfreqalone";
      await axios
        .get(url, {
          params: {
            email: localStorage.getItem("email"),
            Frequency: freq,
          },
        })
        .then(async (res) => {
          setttlControl(res.data.controls.length);
          setpie(res.data.pie);
          // setFreq(event.target.value);
          setClient(event.target.value);
          percentange(res.data.details);
        });
    }
  };

  const handleFreq = async (event) => {
    //console.log("Client", client);
    if (client != "All") {
      let url = "";
      url = "http://localhost:8000/clientDetails/dashfilterfreq";
      if (event.target.value === "All") {
        url = "http://localhost:8000/clientDetails/dashfilterclient";
      }
      await axios
        .get(url, {
          params: {
            email: localStorage.getItem("email"),
            Client: client,
            Frequency: event.target.value,
          },
        })
        .then(async (res) => {
          //console.log("res", res);
          setMenu(res.data.clients);
          setttlControl(res.data.controls.length);
          setpie(res.data.pie);
          setFreq(event.target.value);
        });
      let percentage = 0;
      let performed = 0;
      let total = 0;
      if (event.target.value === "All") {
        total +=
          details.dailynotperformed +
          details.dailyperformed +
          details.monthlynotperformed +
          details.monthlyperformed +
          details.weeklynotperformed +
          details.weeklyperformed;
        performed +=
          details.dailyperformed +
          details.monthlyperformed +
          details.weeklyperformed;
        percentage = (performed / total) * 100;
      } else if (event.target.value === "Monthly") {
        total += details.monthlynotperformed + details.monthlyperformed;
        performed += details.monthlyperformed;
        percentage = (performed / total) * 100;
      } else if (event.target.value === "Weekly") {
        total += details.weeklynotperformed + details.weeklyperformed;
        performed += details.weeklyperformed;
        percentage = (performed / total) * 100;
      } else if (event.target.value === "Daily") {
        total += details.dailynotperformed + details.dailyperformed;
        performed += details.dailyperformed;
        percentage = (performed / total) * 100;
      }
      //console.log("per", percentage);
      setPer(percentage.toFixed(2));
      setTot(total);
      setPerfo(performed);
      setNPerfo(total - performed);
    } else {
      let url = "";
      url = "http://localhost:8000/clientDetails/dashfilterfreqalone";
      if (event.target.value === "All") {
        url = "http://localhost:8000/clientDetails/dash";
      }
      await axios
        .get(url, {
          params: {
            email: localStorage.getItem("email"),
            // Client: client,
            Frequency: event.target.value,
          },
        })
        .then(async (res) => {
          //console.log("res", res);
          setttlControl(res.data.controls.length);
          setpie(res.data.pie);
          setFreq(event.target.value);
        });
      let percentage = 0;
      let performed = 0;
      let total = 0;
      if (event.target.value === "All") {
        total +=
          details.dailynotperformed +
          details.dailyperformed +
          details.monthlynotperformed +
          details.monthlyperformed +
          details.weeklynotperformed +
          details.weeklyperformed;
        performed +=
          details.dailyperformed +
          details.monthlyperformed +
          details.weeklyperformed;
        percentage = (performed / total) * 100;
      } else if (event.target.value === "Monthly") {
        total += details.monthlynotperformed + details.monthlyperformed;
        performed += details.monthlyperformed;
        percentage = (performed / total) * 100;
      } else if (event.target.value === "Weekly") {
        total += details.weeklynotperformed + details.weeklyperformed;
        performed += details.weeklyperformed;
        percentage = (performed / total) * 100;
      } else if (event.target.value === "Daily") {
        total += details.dailynotperformed + details.dailyperformed;
        performed += details.dailyperformed;
        percentage = (performed / total) * 100;
      }
      //console.log("per", percentage);
      setPer(percentage.toFixed(2));
      setTot(total);
      setPerfo(performed);
      setNPerfo(total - performed);
    }
  };

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("en-US", { month: "long" });
  }

  const ChartComponent = () => {
    const chartRef = useRef(null);

    useEffect(() => {
      const myChart = echarts.init(chartRef.current);

      const option = {
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
        tooltip: {
          trigger: "item",
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        // },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: issueteam.map((item) => ({
              value: item.count,
              name: item._id,
            })),
            itemStyle: {
              color: function (params) {
                const customColors = [
                  "#9B8FFF",
                  "#7489FF",
                  "#CE8FFF",
                  "#AE3CFC",
                  "#4734F0",
                  "#8FCCFF",
                ];
                return customColors[params.dataIndex % customColors.length];
              },
            },
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.name + "(" + param.value + ")";
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            // itemStyle: {
            //   // Custom color scheme
            //   color: [  "#9b8fff",]
            // }
          },
        ],
      };

      myChart.setOption(option);

      // Clean up on unmount
      return () => {
        myChart.dispose();
      };
    }, []);

    return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
  };
  //console.log("pie", pie);

  // Extracting labels from '_id.client'
  const labels = pie.map((data) => data._id);
  // const datasets = pie.map((data) => data.totalControls);

  //console.log("Labels:", labels);
  // //console.log("Datasets:", datasets);
  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    barThickness: 18, // Set the width of each bar in pixels
    maxBarThickness: 40, // Set the maximum width of each bar in pixels
    borderWidth: 1,
    borderRadius: 20, // This will round the corners
    plugins: {
      title: {
        display: false,
      },
      legend: {
        labels: {
          color: "#000000",
          font: {
            size: 10,
          },
          usePointStyle: true,
          boxWidth: 6,
        },
      },
      datalabels: {
        display: true,
        labels: {
          title: {
            font: {
              fontSize: "1.5rem",
              weight: "bold",
            },
          },
          value: {
            color: "#ffff",
          },
        },
        formatter: function (value) {
          return "\n" + value;
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const options1 = {
    responsive: true,
    tension: 0.5,
    pointStrokeColor: "#ffc8dd",
    pointColor: "#ffc8dd",
    strokeColor: "#ffc8dd",

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
      },
      legend: {
        position: "top",
        display: false,
        labels: {
          color: "#000000",
          font: {
            size: 10,
          },
          align: "center",

          usePointStyle: true,
          boxWidth: 6,
        },
      },
      title: {
        display: false,
        text: "Monthly Network Performance",
      },
    },
  };

  // let label1 = pie.map((data) =>
  //   data.items[0] ? data.items[0].frequency : ""
  // );
  // let label2 = pie.map((data) =>
  //   data.items[1] ? data.items[1].frequency : " "
  // );
  // let label3 = pie.map((data) =>
  //   data.items[2] ? data.items[2].frequency : " "
  // );

  const MyChart = () => {
    useEffect(() => {
      // Initialize the chart
      const chartDom = document.getElementById("main");
      const myChart = echarts.init(chartDom);

      // Set the chart options
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "-1%",
          left: "center",
          // doesn't perfectly work with our tricks, disable it
          selectedMode: false,
        },
        grid: {
          top: 100,
          // bottom: ''
        },
        series: [
          {
            // name: 'Access From',
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.value;
              },
            },
            itemStyle: {
              color: function (params) {
                const customColors = ["#9B8FFF", "#7489FF", "#CE8FFF"];
                return customColors[params.dataIndex % customColors.length];
              },
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: 'bold'
            //   }
            // },
            // labelLine: {
            //   show: false
            // },
            data: issueprior.map((item) => ({
              value: item.count,
              name: item._id,
            })),
          },
        ],
      };

      // Set the options and render the chart
      option && myChart.setOption(option);

      // Clean up the chart on component unmount
      return () => {
        myChart.dispose();
      };
    }, []);

    return <div id="main" style={{ width: "100%", height: "100%" }} />;
  };

  const MyChart1 = () => {
    useEffect(() => {
      // Initialize the chart
      const chartDom = document.getElementById("main1");
      const myChart1 = echarts.init(chartDom);

      // Set the chart options
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "-1%",
          left: "center",
          // doesn't perfectly work with our tricks, disable it
          selectedMode: false,
        },
        series: [
          {
            // name: 'Access From',
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter(param) {
                // correct the percentage
                return param.value;
              },
            },
            itemStyle: {
              color: function (params) {
                const customColors = ["#9B8FFF", "#7489FF"];
                return customColors[params.dataIndex % customColors.length];
              },
            },
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: 40,
            //     fontWeight: 'bold'
            //   }
            // },
            // labelLine: {
            //   show: false
            // },
            data: [
              { value: openDefects, name: "Open" },
              { value: closeDefects, name: "Close" },
            ],
          },
        ],
      };

      // Set the options and render the chart
      option && myChart1.setOption(option);

      // Clean up the chart on component unmount
      return () => {
        myChart1.dispose();
      };
    }, []);

    return <div id="main1" style={{ width: "100%", height: "100%" }} />;
  };

  const data = {
    labels,
    datasets: [
      {
        data: pie.map((data) => data.daily),
        backgroundColor: "#613DF1",
        label: "Daily",
      },
      {
        data: pie.map((data) => data.monthly),
        backgroundColor: "#9494FF",
        label: "Monthly",
      },
      {
        data: pie.map((data) => data.weekly),
        backgroundColor: "#8F61FF",
        label: "Weekly",
      },
    ],
  };

  const data1 = {
    datasets: [
      {
        data: [perfo, nperfo],
        backgroundColor: ["#b894ff", "#613df1"],
        display: false,
      },
    ],
  };

  const data2 = {
    labels: ["Open", "Close"],
    datasets: [
      {
        data: [openDefects, closeDefects],
        backgroundColor: ["#A6A6FF", "#7489FF"],
        borderColor: ["#A6A6FF", "#7489FF"],
        borderWidth: 1,
      },
    ],
  };

  const data4 = {
    labels: issueprior.map((data) => data._id),
    datasets: [
      {
        data: issueprior.map((data) => data.count),
        backgroundColor: ["#9B8FFF", "#7489FF", "#CE8FFF"],
        borderColor: ["#9B8FFF", "#7489FF", "#CE8FFF"],
        borderWidth: 1,
      },
    ],
  };

  const data5 = {
    labels: issueteam.map((data) => data._id),
    datasets: [
      {
        data: issueteam.map((data) => data.count),
        backgroundColor: [
          "#9B8FFF",
          "#7489FF",
          "#CE8FFF",
          "#AE3CFC",
          "#B28FFF",
        ],
        borderColor: ["#9B8FFF", "#7489FF", "#CE8FFF", "#AE3CFC", "#B28FFF"],
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: line.map((data) => data.totalRevenueImpacted),
        backgroundColor: "#8884d8",
        borderColor: "#8884d8",
      },
    ],
  };

  return (
    <>
      <Box sx={{ display: "flex", background: "#F9F9FC" }}>
        <SideNav />
        <Header props={"Dashboard"} />
        <Box
          component="main"
          sx={{ flexGrow: 0.2, mt: 8 }}
          className="container"
        >
          <Grid style={{ width: "99%" }}>
            <Grid container spacing={2} style={{ marginTop: "0rem" }}>
              <Grid item xs={4}>
                <SideCards
                  name="Assigned Controls"
                  value={ttlControl.toLocaleString()}
                />
              </Grid>
              <Grid item xs={4}>
                <SideCards
                  name="Performed Percentage"
                  value={per === "NaN" ? "0" : per}
                />
              </Grid>
              <Grid item xs={4}>
                <SideCards
                  name="Total Revenue Loss"
                  value={Revenue.toLocaleString()}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "0rem" }}>
              <Grid item xs={3.2}>
                <div>
                  <Card
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                      background: "#ffff",
                      height: "fit-content",
                    }}
                  >
                    <FormControl
                      fullWidth
                      style={{ margin: "0.6rem", background: "#ffff" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Client Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={client}
                        label="Client Name"
                        onChange={handleclient}
                      >
                        <MenuItem value={"All"}>All</MenuItem>
                        {menu.map((val) => (
                          <MenuItem value={val["_id"]}>{val["_id"]}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Card>
                </div>
                <div style={{ marginTop: "0.6rem" }}>
                  <Card
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                      background: "#ffff",
                    }}
                  >
                    <FormControl
                      fullWidth
                      style={{ margin: "0.6rem", background: "#ffff" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Frequency
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={freq}
                        label="Frequency"
                        onChange={handleFreq}
                      >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Monthly"}>Monthly</MenuItem>
                        <MenuItem value={"Weekly"}>Weekly</MenuItem>
                        <MenuItem value={"Daily"}>Daily</MenuItem>
                      </Select>
                    </FormControl>
                  </Card>
                </div>
                <div
                  style={{
                    marginTop: "0.6rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Card
                    sx={{
                      width: "48%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      borderRadius: "12px",
                      background: " #ffff",
                    }}
                  >
                    <h3
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        // fontFamily: "Public Sans",
                        width: "100%",
                        margin: "0.5em 0em 0.5em 0em",
                        fontWeight: "700",
                        // marginLeft: "1rem",
                      }}
                    >
                      {software}
                    </h3>
                    <div
                      style={{
                        backgroundColor: "rgba(149, 114, 250, 0.33)",
                        width: "100%",
                      }}
                    >
                      <h3
                        style={{
                          color: "#1D1F2C",
                          textAlign: "center",
                          // marginLeft: "1rem",
                          margin: "1em 0 1em 0em",
                          width: "100%",
                          zIndex: "1",
                          fontSize: "1em",
                          fontWeight: "600",
                        }}
                      >
                        Open Software Level Fix
                      </h3>
                    </div>
                  </Card>
                  <Card
                    sx={{
                      width: "48%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      borderRadius: "12px",
                      background: " #ffff",
                    }}
                  >
                    <h3
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        // fontFamily: "Public Sans",
                        margin: "0.5em 0em 0.5em 0em",
                        width: "100%",
                        fontWeight: "700",
                        // marginLeft: "1rem",
                      }}
                    >
                      {issue}
                    </h3>
                    <div
                      style={{
                        backgroundColor: "rgba(149, 114, 250, 0.33)",
                        width: "100%",
                      }}
                    >
                      <h3
                        style={{
                          color: "#1D1F2C",
                          opacity: "2",
                          textAlign: "center",
                          // marginLeft: "1rem",
                          width: "100%",
                          margin: "1em 0em 1em 0em",
                          zIndex: "1",
                          fontSize: "1em",
                          fontWeight: "600",
                        }}
                      >
                        Open Incident Level Fix
                      </h3>
                    </div>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={3.9}>
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderRadius: "12px",
                    background: " #ffff",
                  }}
                >
                  <h3
                    style={{
                      color: "#1D1F2C",
                      textAlign: "center",
                      width: "100%",
                      textAlign: "left",
                      marginLeft: "1rem",
                      marginTop: "0.65rem",
                      zIndex: "1",
                      fontSize: "1.3em",
                      fontWeight: "700",
                    }}
                  >
                    Overall Controls Status
                  </h3>
                  <div
                    style={{
                      background: "#ffff",
                      height: "14.2em",
                      width: "100%",
                      zIndex: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "-3rem",
                    }}
                  >
                    <Doughnut
                      data={data1}
                      options={{
                        plugins: {
                          legend: {
                            display: false,
                          },
                          tooltip: {
                            enabled: false,
                          },
                          datalabels: {
                            display: true, // Enable data labels
                            anchor: "end",
                            align: "top",
                            formatter: (value) => value, // Display the raw value as the label
                          },
                        },
                        rotation: -90,
                        circumference: 180,
                        cutout: "60%",
                        maintainAspectRatio: true,
                        responsive: true,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "-2rem",
                      zIndex: "1",
                      width: "100%",
                      marginLeft: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "90%",
                        margin: "0.7rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "left",
                          width: "23vw",
                        }}
                      >
                        <div
                          style={{
                            height: "0.7em",
                            width: "0.7em",
                            borderRadius: "200px",
                            backgroundColor: "#22CAAD",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // margin: "1rem",
                            // marginTop: "-8.5rem",
                            marginRight: "0.5rem",
                          }}
                        ></div>
                        <h6 style={{ margin: "0", fontSize: "0.9em" }}>
                          Total Controls to be Performed
                        </h6>
                      </div>
                      <h6 style={{ margin: "0", fontSize: "0.9em" }}>
                        {tot.toLocaleString()}
                      </h6>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "90%",
                        margin: "0.7rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "left",
                          width: "23vw",
                        }}
                      >
                        <div
                          style={{
                            height: "0.7em",
                            width: "0.7em",
                            borderRadius: "200px",
                            backgroundColor: "#b894ff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // margin: "1rem",
                            // marginTop: "-8.5rem",
                            marginRight: "0.5rem",
                          }}
                        ></div>
                        <h6 style={{ margin: "0", fontSize: "0.9em" }}>
                          Controls Performed
                        </h6>
                      </div>
                      <h6 style={{ margin: "0", fontSize: "0.9em" }}>
                        {perfo.toLocaleString()}
                      </h6>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "90%",
                        margin: "0.7rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "left",
                          width: "23vw",
                        }}
                      >
                        <div
                          style={{
                            height: "0.7em",
                            width: "0.7em",
                            borderRadius: "200px",
                            backgroundColor: "#613df1",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // margin: "1rem",
                            // marginTop: "-8.5rem",
                            marginRight: "0.5rem",
                          }}
                        ></div>
                        <h6 style={{ margin: "0", fontSize: "0.9em" }}>
                          Controls Not Performed
                        </h6>
                      </div>
                      <h6 style={{ margin: "0", fontSize: "0.9em" }}>
                        {nperfo.toLocaleString()}
                      </h6>
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={4.9}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    width: "100%",
                  }}
                >
                  <h3
                    style={{
                      color: "#1D1F2C",
                      textAlign: "center",
                      width: "100%",
                      textAlign: "left",
                      marginLeft: "1.5rem",
                      marginTop: "0.65rem",
                      zIndex: "1",
                      fontSize: "1.3em",
                      fontWeight: "700",
                    }}
                  >
                    Today's Task
                  </h3>
                  <TableContainer
                    style={{
                      // margin: "0.5rem",
                      overflow: "scroll",
                      height: "15.7em",
                    }}
                    className="container"
                  >
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ position: "sticky", top: "0" }}
                          >
                            Control Name
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ position: "sticky", top: "0" }}
                          >
                            Client Name
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {task.map((t) => (
                          <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                              {t["Control Name"]}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {t["Client"]}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "0rem" }}>
              <Grid item xs={6}>
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "12px",
                  }}
                >
                  <h3
                    style={{
                      color: "#1D1F2C",
                      textAlign: "center",
                      width: "100%",
                      textAlign: "left",
                      marginLeft: "1.5rem",
                      zIndex: "1",
                      fontSize: "1.3em",
                      fontWeight: "700",
                      marginTop: "0.2em",
                    }}
                  >
                    Controls per Clients
                  </h3>
                  <div
                    style={{
                      borderRadius: "12px",
                      background: "#ffff",
                      height: "16em",
                      width: "100%",
                      // margin: "1.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Bar
                      data={data}
                      options={options}
                      height="3000%"
                      width="5300%"
                    />
                  </div>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: "12px",
                    background: "#ffff",
                  }}
                >
                  <h3
                    style={{
                      color: "#1D1F2C",
                      textAlign: "center",
                      width: "100%",
                      textAlign: "left",
                      marginLeft: "1.5rem",
                      marginTop: "0.65rem",
                      zIndex: "1",
                      fontSize: "1.3em",
                      fontWeight: "700",
                    }}
                  >
                    Revenue Quantification Trend
                  </h3>
                  <div
                    style={{
                      borderRadius: "12px",
                      background: "#ffff",
                      height: "12.5em",
                      width: "100%",
                      margin: "1.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Line
                      options={options1}
                      data={data3}
                      height="3000%"
                      width="7200%"
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{ marginTop: "0rem", marginBottom: "1em" }}
            >
              {data4.labels.length > 0 ? (
                <Grid item xs={3.25}>
                  <Card
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      borderRadius: "12px",
                      background: " #ffff",
                    }}
                  >
                    <h3
                      style={{
                        color: "#1D1F2C",
                        textAlign: "left",
                        width: "100%",
                        marginLeft: "1rem",
                        marginTop: "0.65rem",
                        zIndex: "1",
                        fontSize: "1.2em",
                        fontWeight: "700",
                      }}
                    >
                      Issues Priority
                    </h3>
                    <div
                      style={{
                        background: "#ffff",
                        height: "13em",
                        width: "100%",
                        zIndex: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      {/* <Doughnut
                        data={data4}
                        width="200%"
                        height="50%"
                        options={{
                          plugins: {
                            legend: {
                              // align: 'start',
                              labels: {
                                color: "#000000",
                                font: {
                                  size: 10,
                                },
                                usePointStyle: true,
                                boxWidth: 20, // Increase the value to adjust the legend width
                                // padding: 20
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                              },
                            },
                          },
                        }}
                      /> */}
                      <MyChart />
                    </div>
                  </Card>
                </Grid>
              ) : (
                <div />
              )}
              {data5.labels.length > 0 ? (
                <Grid item xs={5.5}>
                  <Card
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      borderRadius: "12px",
                      background: " #ffff",
                    }}
                  >
                    <h3
                      style={{
                        color: "#1D1F2C",
                        textAlign: "left",
                        width: "100%",
                        marginLeft: "1rem",
                        marginTop: "0.65rem",
                        zIndex: "1",
                        fontSize: "1.2em",
                        fontWeight: "700",
                      }}
                    >
                      Team Wise Open Issues
                    </h3>
                    <div
                      style={{
                        background: "#ffff",
                        height: "13em",
                        width: "100%",
                        zIndex: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      {/* <Doughnut
                        data={data5}
                        width="1000%"
                        height="100%"
                        options={{
                          plugins: {
                            legend: {
                              display: true,
                              // align: 'start',
                              // position: 'right',
                              labels: {
                                color: "#000000",
                                font: {
                                  size: 10,
                                },
                                usePointStyle: true,
                                boxWidth: 20, // Increase the value to adjust the legend width
                                // padding: 20
                              },
                              fullWidth: false,
                            },
                          },
                        }}
                      /> */}
                      <ChartComponent />
                    </div>
                  </Card>
                </Grid>
              ) : (
                <div />
              )}
              {data2.datasets[0].data[0] !== 0 &&
              data2.datasets[0].data[1] !== 0 ? (
                <Grid item xs={3.25}>
                  <Card
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      borderRadius: "12px",
                      background: " #ffff",
                    }}
                  >
                    <h3
                      style={{
                        color: "#1D1F2C",
                        textAlign: "center",
                        width: "100%",
                        textAlign: "left",
                        marginLeft: "1rem",
                        marginTop: "0.65rem",
                        zIndex: "1",
                        fontSize: "1.3em",
                        fontWeight: "700",
                      }}
                    >
                      Issue Status
                    </h3>
                    <div
                      style={{
                        background: "#ffff",
                        height: "13em",
                        width: "100%",
                        zIndex: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      {/* <Doughnut
                        data={data2}
                        width="200%"
                        height="50%"
                        options={{
                          plugins: {
                            legend: {
                              // align: 'start',
                              labels: {
                                color: "#000000",
                                font: {
                                  size: 10,
                                },
                                usePointStyle: true,
                                boxWidth: 20, // Increase the value to adjust the legend width
                                // padding: 20
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                              },
                            },
                          },
                        }}
                      /> */}
                      <MyChart1 />
                    </div>
                  </Card>
                </Grid>
              ) : (
                <div />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Index;
