import { React, useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import KPMG from "../views/assests/KPMG.png";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ErrorIcon from "@mui/icons-material/Error";
import Reach from "../views/assests/reach.png";

const drawerWidth = 240;

const SideNav = () => {
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
        backgroundColor: "#0000ff",
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
          marginBottom:'1em',
          marginTop:'1em',
          marginRight:'1.2em'
        }}
      >
        <img src={KPMG} alt="logo" style={{ height: "4em", width: "6em" }} />
        <div style={{ background: "white", borderRadius: "50%" ,height: "2.3em", width: "4em" , display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img
            src={Reach}
            alt="reach logo"
            style={{ height: "1em", width: "2.5em" }}
          />
        </div>
      </div>

      <Divider style={{ height: "0.5vh", background: "white", opacity: "1" }} />
      <div style={{ height: "90%" }}>
        <List>
          <Link
            to="/analystdash"
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
            to="/analystview"
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <ListItem key="Partners" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HandshakeIcon style={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Partners" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to="/statusview"
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <ListItem key="control performance status" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AutorenewIcon style={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Control Performance Status" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to="/library"
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <ListItem key="Library" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuBookIcon style={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Library" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to="/defecttracker"
            style={{ textDecoration: "none", color: "#ffff" }}
          >
            <ListItem key="Defect Tracker" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ErrorIcon style={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Defect Tracker" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* </List> */}
        </List>
      </div>
      <div style={{ height: "10%" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            style={{
              // marginTop: "22rem",
              // position: "relative",
              // top: "12em",
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

export default SideNav;
