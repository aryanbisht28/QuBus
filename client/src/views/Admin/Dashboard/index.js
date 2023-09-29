import { React, useState, useEffect } from "react";
import "../../../styles/Admin.css";
import SideNavAdmin from "../../../Layout/SideNavAdmin";
import Header from "../../../Layout/Header";
import DataCards from "./DataCards";
import {
  Grid,
  Box,
  Card,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

const Index = () => {
  const [freq, setFreq] = useState("All");
  
  const options = {
    responsive: true,
    barThickness: 18,
    maxBarThickness: 40,
    borderWidth: 1,
    borderRadius: 20,
    plugins: {
      legend: {
        display: true,
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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 30, 40, 50, 60, 70],
        backgroundColor: "#9B8FFF",
      },
    ],
  };

  const data1 = {
    labels: ["Empty Folder", "Filled Folder"],
    datasets: [
      {
        label: "Stauts",
        data: [12, 8],
        backgroundColor: ["#7489FF", "#CE8FFF"],
        borderColor: ["#7489FF", "#CE8FFF"],
        borderWidth: 1,
      },
    ],
  };

  const setSelectedFreq = async (event) => {
    setFreq(event.target.value);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <SideNavAdmin />
      <Header props={"QBox Status"} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, m: 1, overflowX: "hidden" }}
      >
        <Grid container spacing={2} style={{ marginTop: "4rem" }}>
          <Grid item xs={4}>
            <DataCards name="Total Projects" value="20" />
          </Grid>
          <Grid item xs={4}>
            <DataCards name="Active Projects" value="15" />
          </Grid>
          <Grid item xs={4}>
            <DataCards name="Closed Projects" value="5" />
          </Grid>
          <Grid item xs={8}>
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
                QBox Folder Status
              </h3>
              <div
                style={{
                  borderRadius: "12px",
                  background: "#ffff",
                  height: "29em",
                  width: "100%",
                  // margin: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Bar
                  data={data}
                  options={options}
                  height="5000%"
                  width="8000%"
                /> */}
              </div>
            </Card>
          </Grid>
          <Grid item xs={4}>
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
                style={{ margin: "1rem", background: "#ffff" }}
                size="small"
              >
                <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={freq}
                  label="Frequency"
                  onChange={setSelectedFreq}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                </Select>
              </FormControl>
            </Card>
            <Card
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                borderRadius: "12px",
                marginTop: "1rem",
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
                Folder's Status
              </h3>
              <div
                style={{
                  borderRadius: "12px",
                  background: "#ffff",
                  height: "23.5em",
                  width: "100%",
                  // margin: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Pie data={data1} /> */}
              </div>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Index;
