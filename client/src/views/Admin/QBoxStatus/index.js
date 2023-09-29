import { React, useState, useEffect } from "react";
import "../../../styles/Admin.css";
import Header from "../../../Layout/Header";
import SideNavAdmin from "../../../Layout/SideNavAdmin";
import axios from "axios";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  tableCellClasses,
  styled,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem 1rem 0rem 0rem",
};

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

const Index = () => {
  const [data, setData] = useState([]);
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  const [openReminderModal, setOpenReminderModal] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const handleOpenReminderModal = () => setOpenReminderModal(true);
  const handleCloseReminderModal = () => setOpenReminderModal(false);
  const handleOpenFolder = () => setOpenFolder(true);
  const handleCloseFolder = () => setOpenFolder(false);

  useEffect(() => {
    const url = "http://localhost:8000/projectdetails";
    const fetchData = async () => {
      await axios.get(url).then((res) => {
        console.log("res", res);
        setData(res.data);
      });
    };
    fetchData();
  }, []);

  function createData(name, calories) {
    return { name, calories };
  }

  const rows = [
    createData("A01", 0),
    createData("A02", 0),
    createData("A03", 0),
    createData("A04", 0),
    createData("A05", 0),
    createData("A06", 0),
    createData("A07", 0),
    createData("A08", 0),
    createData("A09", 0),
    createData("A010", 0),
    createData("A011", 0),
    createData("A012", 0),
    createData("A013", 0),
    createData("A014", 0),
    createData("A015", 0),
    createData("A015", 0),
    createData("A016", 0),
    createData("A017", 0),
    createData("A18", 0),
    createData("A19", 0),
    createData("A20", 0),
    createData("A21", 0),
    createData("A22", 0),
  ];

  const columns = [
    {
      name: "SNo.",
      label: "SNo.",
      options: {
        download: false,
        filter: false,
        customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log("values", tableMeta);
          return <>{tableMeta["rowIndex"] + 1}</>;
        },
      },
    },
    {
      name: "ProjectNo",
      label: "Project No",
      options: {
        // filterOptions: { fullWidth: true },
        customHeadLabelRender: (columnMeta) => (
          <b>
            <p style={{ width: "100px" }}>{columnMeta.label}</p>
          </b>
        ),
      },
    },
    {
      name: "ProjectName",
      label: "Project Name",
      options: {
        filterOptions: { fullWidth: false },
        customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
      },
    },
    {
      name: "RekonnectStatus",
      label: "Status",
      options: {
        filterOptions: { fullWidth: false },
        customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
      },
    },
    {
      name: "ProjectStartDate",
      label: "Start Date",
      options: {
        filterOptions: { fullWidth: false },
        customHeadLabelRender: (columnMeta) => (
          <b>
            <p style={{ width: "120px" }}>{columnMeta.label}</p>
          </b>
        ),
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log("values", value);
          return value.split("T")[0];
        },
      },
    },
    {
      name: "A",
      label: "A",
      options: {
        download: false,
        filter: false,
        filterOptions: { fullWidth: false },
        customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log("values", tableMeta["rowData"][2]);
          return (
            <Button
              variant="text"
              component="label"
              style={{ fontSize: "0.8em" }}
              onClick={handleOpenFolder}
            >
              View
            </Button>
          );
        },
      },
    },
    {
      name: "B",
      label: "B",
      options: {
        download: false,
        filter: false,
        filterOptions: { fullWidth: false },
        customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log("values", tableMeta["rowData"][2]);
          return (
            <Button
              variant="text"
              component="label"
              style={{ fontSize: "0.8em" }}
              onClick={handleOpenFolder}
            >
              View
            </Button>
          );
        },
      },
    },
    {
      name: "C",
      label: "C",
      options: {
        download: false,
        filter: false,
        filterOptions: { fullWidth: false },
        customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log("values", tableMeta["rowData"][2]);
          return (
            <Button
              variant="text"
              component="label"
              style={{ fontSize: "0.8em" }}
              onClick={handleOpenFolder}
            >
              View
            </Button>
          );
        },
      },
    },
    {
      name: "D",
      label: "D",
      options: {
        download: false,
        filter: false,
        filterOptions: { fullWidth: false },
        customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log("values", tableMeta["rowData"][2]);
          return (
            <Button
              variant="text"
              component="label"
              style={{ fontSize: "0.8em" }}
              onClick={handleOpenFolder}
            >
              View
            </Button>
          );
        },
      },
    },
    {
      name: "Action",
      label: "Action",
      options: {
        download: false,
        filter: false,
        filterOptions: { fullWidth: false },
        customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log("values", tableMeta["rowData"][2]);
          return (
            <IconButton
              aria-label="delete"
              style={{ fontSize: "0.8em" }}
              onClick={() => {
                window.open(
                  "http://localhost:8080/uploads/docs/" +
                    tableMeta["rowData"][2],
                  "_blank"
                );
              }}
            >
              <SendIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    selectableRows: false,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    pagination: true,
    rowsPerPageOptions: [5, 10, 15],
    textLabels: {
      body: {
        noMatch: "No Data",
      },
    },
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    customToolbar: () => {
      return (
        <>
          <IconButton aria-label="delete" onClick={handleOpenReminderModal}>
            <SendIcon />
          </IconButton>
        </>
      );
    },
  };

  const myTheme = createTheme({
    overrides: {
      MUIDataTable: {
        responsiveScroll: {
          maxHeight: "900px",
        },
      },
    },
  });

  return (
    <Box sx={{ display: "flex" }}>
      <SideNavAdmin />
      <Header props={"QBox Status"} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, m: 1, overflowX: "hidden" }}
      >
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={myTheme}>
            <div style={{ marginTop: "4rem" }}>
              <MUIDataTable data={data} columns={columns} options={options} />
            </div>
          </ThemeProvider>
        </CacheProvider>

        {/* Reminder Modal */}
        <Modal
          open={openReminderModal}
          onClose={handleCloseReminderModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <header className="modal-header">
              <span className="modal-header-heading">Send Reminder</span>
              <CloseIcon
                className="modal-header-close-icon"
                onClick={handleCloseReminderModal}
                style={{ color: "#ffff" }}
              />
            </header>
            <div className="reminder-modal-container">
              <TextField
                id="outlined-basic"
                label="User"
                variant="outlined"
                fullWidth
                style={{ margin: "1rem" }}
              />
              <Button
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
                style={{ margin: "1rem" }}
              >
                Send
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openFolder}
          onClose={handleCloseFolder}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <header className="modal-header">
              <span className="modal-header-heading">Folder Content</span>
              <CloseIcon
                className="modal-header-close-icon"
                onClick={handleCloseFolder} 
                style={{ color: "#ffff" }}
              />
            </header>
            <div className="reminder-modal-container">
              <TableContainer component={Paper} style={{height:"20rem"}}>
                <Table aria-label="customized table" className="scroll">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Folder No.</StyledTableCell>
                      <StyledTableCell align="right">No. of Files</StyledTableCell>
                     
                 
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.calories}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Index;
