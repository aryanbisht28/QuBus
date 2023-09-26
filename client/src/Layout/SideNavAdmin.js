import { React, useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KPMG from "../views/assests/KPMG.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const SideNavAdmin = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#00338d",
          color: "#ffffff",
        },
        color: "#ffffff",
        backgroundImage:"url(../)"
      }}
      variant="permanent"
      anchor="left"
      style={{ backgroundColor: "#0000ff" }}
    >
      <div
        style={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img src={KPMG} alt="logo" style={{ height: "6em", width: "9em" }} />
      </div>
      <Divider style={{ height: "0.5vh", background: "white", opacity: "1" }} />
      <div style={{ height: "90%" }}>
        <List>
          <Link
            to="/admin"
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <ListItem key="Dashboard" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon style={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to="/admin/QBox-status"
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <ListItem key="qboxstatus" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AutorenewIcon style={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="QBox Status" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to="/managerlibrary"
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <ListItem key="assignreviewer" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookIcon style={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Assign Reviewer" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to="/admin/create-user"
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <ListItem key="assignreviewer" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonAddAltRoundedIcon style={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Create User" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* </List> */}
        </List>
      </div>
      <div style={{ height: "10%" }}>
        <Button
          style={{
            // marginTop: "22rem",
            // position: "relative",
            // top: "40vh",
            width: "80%",
            marginLeft: "1.4rem",
            backgroundColor: "#8f8fff",
            display: "flex",
          }}
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
      <div style={{ height: "10%" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              // marginTop: "22rem",
              // position: "relative",
              // top: "40vh",
              width: "80%",
              marginLeft: "1.4rem",
              backgroundColor: "#8098c3",
              display: "flex",
            }}
            onClick={() => {
              localStorage.clear();
            }}
          >
            <svg
              style={{ marginRight: "0.3rem" }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.44 15.3699C17.25 15.3699 17.06 15.2999 16.91 15.1499C16.62 14.8599 16.62 14.3799 16.91 14.0899L18.94 12.0599L16.91 10.0299C16.62 9.73994 16.62 9.25994 16.91 8.96994C17.2 8.67994 17.68 8.67994 17.97 8.96994L20.53 11.5299C20.82 11.8199 20.82 12.2999 20.53 12.5899L17.97 15.1499C17.82 15.2999 17.63 15.3699 17.44 15.3699Z"
                fill="white"
              />
              <path
                d="M19.93 12.8101H9.76C9.35 12.8101 9.01 12.4701 9.01 12.0601C9.01 11.6501 9.35 11.3101 9.76 11.3101H19.93C20.34 11.3101 20.68 11.6501 20.68 12.0601C20.68 12.4701 20.34 12.8101 19.93 12.8101Z"
                fill="white"
              />
              <path
                d="M11.76 20.75C6.61 20.75 3.01 17.15 3.01 12C3.01 6.85 6.61 3.25 11.76 3.25C12.17 3.25 12.51 3.59 12.51 4C12.51 4.41 12.17 4.75 11.76 4.75C7.49 4.75 4.51 7.73 4.51 12C4.51 16.27 7.49 19.25 11.76 19.25C12.17 19.25 12.51 19.59 12.51 20C12.51 20.41 12.17 20.75 11.76 20.75Z"
                fill="white"
              />
            </svg>
            Log Out
          </Button>
        </Link>
      </div>
    </Drawer>
  );
};

export default SideNavAdmin;
