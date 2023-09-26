import { React, useEffect, useState, Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PasswordIcon from "@mui/icons-material/Password";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Badge from "@mui/material/Badge";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 240;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 700,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Header = ({ props, rootElementId, downloadFileName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [pass, setPass] = useState("");
  const [oldpass, setOldPass] = useState("");
  const [open2, setOpen2] = useState(false);
  const [opentask, setOpentask] = useState(false);
  const [dispdata, setdispdata] = useState([]);
  const [presentDate, setpresentDate] = useState(moment().format("YYYY-MM-DD"));
  const [count, setCount] = useState(0);

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

  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageAspectRatio = canvas.width / canvas.height;
      const pdfWidth = pageWidth;
      const pdfHeight = pdfWidth / imageAspectRatio;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleChange = (e) => {
    setPass(e.target.value);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen2(false);
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose2}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  const handleChange1 = (e) => {
    setOldPass(e.target.value);
  };
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  let name = localStorage.getItem("name");

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = async () => {
    let data = {};
    data["oldpassword"] = oldpass;
    data["password"] = pass;
    data["email"] = localStorage.getItem("email");
    data["desig"] = localStorage.getItem("desig");
    const url = `http://localhost:8000/login/changepassword`;
    const { data: res } = await axios.patch(url, data);
    console.log(res);
    if (res === "Invalid Password") {
      alert("Invalid Password");
    }

    if (res === "Successful") {
      // alert("Password Changed")
      setOpen2(true);
      // window.location.href="/"
      setOpen1(false);
    }
  };

  useEffect(() => {
    const url = "http://localhost:8000/clientDetails/managerdash";
    axios
      .get(url, {
        params: {
          email: localStorage.getItem("name"),
        },
      })
      .then(async (res) => {
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

  function percentange(rows) {
    // //console.log("Inside percentage", rows,freq);
    let count = 0;
    let upRows = rows;
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
          upRows[i]["dispstatus"] = "Not Completed";
          count++;
        } else if (
          performArray.includes(formatDate(end_date)) &&
          !missingElements.includes(formatDate(end_date)) &&
          missingElements.length > 0
        ) {
          upRows[i]["status"] = "Not Performed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (missingElements.length == 0) {
          upRows[i]["status"] = "Completed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (missingElements.includes(formatDate(end_date))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(end_date);
          upRows[i]["dispstatus"] = "Not Completed";
          count++;
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
            upRows[i]["dispstatus"] = "Not Completed";
            count++;
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
            count++;
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
            upRows[i]["dispstatus"] = "Not Completed";
            count++;
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
            count++;
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
            upRows[i]["dispstatus"] = "Not Completed";
            count++;
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
            count++;
          }
        } else {
          let arry = [];
          let start_date = new Date(upRows[i]["startdate"]);
          const currentYear = start_date.getFullYear();
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
            upRows[i]["dispstatus"] = "Not Completed";
            count++;
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
            count++;
          }
        }
      } else if (upRows[i]["Frequency"] === "Monthly") {
        let arry = [];
        let start_date = new Date(upRows[i]["startdate"]);
        const month = start_date.getMonth();
        const currentYear = start_date.getFullYear();
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
          if (!upRows[i]["performed"].includes(presentDate))
            arry.push(presentDate);
        }
        upRows[i]["notperformed"] = arry;
        if (
          arry.includes(formatDate(new Date(presentDate))) &&
          arry.length > 1
        ) {
          upRows[i]["status"] = "Pending and Not Performed";
          upRows[i]["pending"] = formatDate(new Date(presentDate));
          upRows[i]["dispstatus"] = "Not Completed";
          count++;
        } else if (arry.length > 0) {
          upRows[i]["status"] = "Not Performed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (arry.length == 0) {
          upRows[i]["status"] = "Completed";
          upRows[i]["dispstatus"] = "Completed";
        } else if (arry.includes(formatDate(new Date(presentDate)))) {
          upRows[i]["status"] = "Pending";
          upRows[i]["pending"] = formatDate(new Date(presentDate));
          upRows[i]["dispstatus"] = "Not Completed";
          count++;
        }
      }
    }
    setCount(count);
    setdispdata(upRows);
  }

  return (
    <>
      {/* Reset Password Modal */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <header
            style={{
              marginBottom: "1.5em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              {" "}
              <h4 style={{ margin: "0" }}>Create New Password</h4>
            </div>

            <div>
              <CloseIcon onClick={() => setOpen1(false)} />
            </div>
          </header>
          {/* <h6 style={{ marginBottom: '0.5em' }}>Enter Old Password</h6> */}
          <TextField
            id="outlined-basic"
            type="password"
            label="Enter Old Password"
            variant="outlined"
            onChange={handleChange1}
            required
            fullWidth
            style={{ marginBottom: "1em" }}
          />
          {/* <h6 style={{ marginBottom: '0.5em', marginTop: '1em' }}>Enter New Password</h6> */}
          <TextField
            id="outlined-basic"
            required
            type="password"
            label="Enter New Password"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
          <div style={{ width: "100%", display: "flex" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ marginTop: "1em" }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      {/* Daily task modal */}
      <Modal
        open={opentask}
        onClose={() => setOpentask(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <header
            style={{
              marginBottom: "1.5em",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              {" "}
              <h4 style={{ margin: "0" }}> Today's Task</h4>
            </div>
            <div>
              <CloseIcon onClick={() => setOpentask(false)} />
            </div>
          </header>
          <TableContainer
            style={{
              // margin: "0.5rem",
              overflow: "scroll",
              height: "20.33em",
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
                    Client Name
                  </StyledTableCell>
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
                    Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dispdata.length > 0
                  ? dispdata.map((t) => (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          {t["Client"]}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {t["Control Name"]}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {t["dispstatus"]}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>

      {/* Profile dropdown */}
      <Snackbar
        open={open2}
        autoHideDuration={1000}
        onClose={handleClose2}
        message="Password Has Been Changed"
        action={action}
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        style={{
          backgroundColor: "white",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: "black" }}
          >
            {props}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width:
                props === "Dashboard" &&
                localStorage.getItem("desig") === "Manager"
                  ? "17%"
                  : "10%",
              height: "100%",
              borderRadius: "20px",
              justifyContent: "center",
              marginRight: "-2em",
            }}
          >
            {props === "Dashboard" &&
            localStorage.getItem("desig") === "Manager" ? (
              <>
                <IconButton onClick={() => setOpentask(true)}>
                  {count !== 0 ? (
                    <Badge badgeContent={count} color="secondary">
                      <AssignmentIcon />
                    </Badge>
                  ) : (
                    <AssignmentIcon />
                  )}
                  {/* <Badge badgeContent={count} color="secondary">
                  <NotificationsActiveIcon />
                  </Badge> */}
                </IconButton>
                <IconButton onClick={downloadPdfDocument}>
                  <FileDownloadIcon />
                </IconButton>
              </>
            ) : (
              ""
            )}
            {/* <div >
              <p style={{
                color: "#292D32",
                // fontFamily: "Inter",
                fontSize: "1.1em",
                // fontStyle: "normal",
                margin: '0',
                fontWeight: "700",

              }}
              >
                {localStorage.getItem("name")}
              </p>
            </div> */}
            <IconButton
              onClick={handleClick}
              size="small"
              // sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar {...stringAvatar(name)} />
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <h5
              style={{
                width: "100%",
                marginLeft: "1em",
                fontWeight: "bold",
                color: "#3E3E3E",
              }}
            >
              {localStorage.getItem("name")}
            </h5>
            <h6
              style={{ width: "100%", marginLeft: "1.3em", color: "#2C2C2C" }}
            >
              {localStorage.getItem("desig")}
            </h6>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PasswordIcon fontSize="small" />
              </ListItemIcon>
              <span onClick={() => setOpen1(true)}>Change Password</span>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
