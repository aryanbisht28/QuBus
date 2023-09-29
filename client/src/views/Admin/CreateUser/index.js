import React from "react";
import "../../../styles/Admin.css";
import Header from "../../../Layout/Header";
import SideNavAdmin from "../../../Layout/SideNavAdmin";
// import axios from axios;
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
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
import CloseIcon from "@mui/icons-material/Close";

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

const index = () => {
  // const [data, setData] = useState([]);
  // const [responsive, setResponsive] = useState("vertical");
  // const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  // const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  // const [searchBtn, setSearchBtn] = useState(true);
  // const [downloadBtn, setDownloadBtn] = useState(true);
  // const [printBtn, setPrintBtn] = useState(true);
  // const [viewColumnBtn, setViewColumnBtn] = useState(true);
  // const [filterBtn, setFilterBtn] = useState(true);

  // useEffect(() => {
  //   const url = "http://localhost:8000/projectdetails";
  //   const fetchData = async () => {
  //     await axios.get(url).then((res) => {
  //       console.log("res", res);
  //       setData(res.data);
  //     });
  //   };
  //   fetchData();
  // }, []);

  // const columns = [
  //   {
  //     name: "SNo.",
  //     label: "SNo.",
  //     options: {
  //       download: false,
  //       filter: false,
  //       customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
  //       customBodyRender: (value, tableMeta, updateValue) => {
  //         //console.log("values", tableMeta);
  //         return <>{tableMeta["rowIndex"] + 1}</>;
  //       },
  //     },
  //   },
  //   {
  //     name: "ProjectNo",
  //     label: "Project No",
  //     options: {
  //       // filterOptions: { fullWidth: true },
  //       customHeadLabelRender: (columnMeta) => (
  //         <b>
  //           <p style={{ width: "100px" }}>{columnMeta.label}</p>
  //         </b>
  //       ),
  //     },
  //   },
  //   {
  //     name: "ProjectName",
  //     label: "Project Name",
  //     options: {
  //       filterOptions: { fullWidth: false },
  //       customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
  //     },
  //   },
  //   {
  //     name: "RekonnectStatus",
  //     label: "Status",
  //     options: {
  //       filterOptions: { fullWidth: false },
  //       customHeadLabelRender: (columnMeta) => <b>{columnMeta.label}</b>,
  //     },
  //   },
  //   {
  //     name: "ProjectStartDate",
  //     label: "Start Date",
  //     options: {
  //       filterOptions: { fullWidth: false },
  //       customHeadLabelRender: (columnMeta) => (
  //         <b>
  //           <p style={{ width: "120px" }}>{columnMeta.label}</p>
  //         </b>
  //       ),
  //       customBodyRender: (value, tableMeta, updateValue) => {
  //         //console.log("values", value);
  //         return value.split("T")[0];
  //       },
  //     },
  //   } 
  // ];

  // const options = {
  //   search: searchBtn,
  //   download: downloadBtn,
  //   print: printBtn,
  //   selectableRows: false,
  //   viewColumns: viewColumnBtn,
  //   filter: filterBtn,
  //   filterType: "dropdown",
  //   responsive,
  //   tableBodyHeight,
  //   tableBodyMaxHeight,
  //   pagination: true,
  //   rowsPerPageOptions: [5, 10, 15],
  //   textLabels: {
  //     body: {
  //       noMatch: "No Data",
  //     },
  //   },
  //   onTableChange: (action, state) => {
  //     console.log(action);
  //     console.dir(state);
  //   },
  // };

  // const myTheme = createTheme({
  //   overrides: {
  //     MUIDataTable: {
  //       responsiveScroll: {
  //         maxHeight: "900px",
  //       },
  //     },
  //   },
  // });
  return (
    <Box sx={{ display: "flex" }}>
      <SideNavAdmin />
      <Header props={"Create User"} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, m: 1, overflowX: "hidden" }}
      >
        <h1>Hello</h1>
      </Box>
    </Box>
  );
};

export default index;
