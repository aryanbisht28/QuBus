import React, { useState } from "react";
import Card from "@mui/material/Card";
import AddTaskIcon from "@mui/icons-material/AddTask";
import FunctionsIcon from "@mui/icons-material/Functions";

const SideCards = (props) => {
  const [name, setName] = useState(false);
  function check() {
    if (props.value == "Total Controls") {
      setName(true);
    }
  }
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderRadius: "12px",
        background: " #ffff",
        boxShadow: "0px 4px 30px 0px rgba(46, 45, 116, 0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          alignItems: "left",
          margin: "0.6rem",
          width: "80%"
        }}
      >
        <div
          style={{
            background: "#007bff1a",
            borderRadius: "8px",
            width: "2em",
            height: "2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          {props.name === "Assigned Controls" ? (
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.09375 6.40625H6.09375V2.40625C6.09375 1.87582 6.30446 1.36711 6.67954 0.992036C7.05461 0.616964 7.56332 0.40625 8.09375 0.40625H12.0938C12.6242 0.40625 13.1329 0.616964 13.508 0.992036C13.883 1.36711 14.0938 1.87582 14.0938 2.40625V6.40625H18.0938C18.6242 6.40625 19.1329 6.61696 19.508 6.99204C19.883 7.36711 20.0938 7.87582 20.0938 8.40625V12.4062C20.0938 12.9367 19.883 13.4454 19.508 13.8205C19.1329 14.1955 18.6242 14.4062 18.0938 14.4062H14.0938V18.4062C14.0938 18.9367 13.883 19.4454 13.508 19.8205C13.1329 20.1955 12.6242 20.4062 12.0938 20.4062H8.09375C7.56332 20.4062 7.05461 20.1955 6.67954 19.8205C6.30446 19.4454 6.09375 18.9367 6.09375 18.4062V14.4062H2.09375C1.56332 14.4062 1.05461 14.1955 0.679536 13.8205C0.304464 13.4454 0.09375 12.9367 0.09375 12.4062V8.40625C0.09375 7.87582 0.304464 7.36711 0.679536 6.99204C1.05461 6.61696 1.56332 6.40625 2.09375 6.40625ZM14.0938 8.40625V12.4062H18.0938V8.40625H14.0938Z"
                fill="black"
              />
            </svg>
          ) : props.name === "Performed Percentage" ? (
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.14746 22.6719V8.67188H7.14746V22.6719H3.14746ZM10.1475 22.6719V2.67188H14.1475V22.6719H10.1475ZM17.1475 22.6719V14.6719H21.1475V22.6719H17.1475Z"
                fill="black"
              />
            </svg>
          ) : (<svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.151367 12.4629H2.15137C2.15137 13.5429 3.52137 14.4629 5.15137 14.4629C6.78137 14.4629 8.15137 13.5429 8.15137 12.4629C8.15137 11.3629 7.11137 10.9629 4.91137 10.4329C2.79137 9.90289 0.151367 9.24289 0.151367 6.46289C0.151367 4.67289 1.62137 3.15289 3.65137 2.64289V0.462891H6.65137V2.64289C8.68137 3.15289 10.1514 4.67289 10.1514 6.46289H8.15137C8.15137 5.38289 6.78137 4.46289 5.15137 4.46289C3.52137 4.46289 2.15137 5.38289 2.15137 6.46289C2.15137 7.56289 3.19137 7.96289 5.39137 8.49289C7.51137 9.02289 10.1514 9.68289 10.1514 12.4629C10.1514 14.2529 8.68137 15.7729 6.65137 16.2829V18.4629H3.65137V16.2829C1.62137 15.7729 0.151367 14.2529 0.151367 12.4629Z" fill="black" />
          </svg>
          )}
        </div>
        <h3
          style={{
            color: "black",
            textAlign: "left",
            fontSize: "1.1em",
            // fontFamily: "Sans Serif",
            fontWeight: "400",
            marginLeft: "1rem",
          }}
        >
          {props.name}
        </h3>
        <h3
          style={{
            color: "black",
            textAlign: "left",
            fontSize: "1.5rem",
            // fontFamily: "Public Sans",
            fontWeight: "700",
            marginLeft: "1rem",
          }}
        >
          {props.value}
        </h3>
      </div>
      <div
        style={{
          width: "8em",
          height: "7em",
          borderRadius: "74px 0px 0px 354px",
          // borderStyle:'solid',
          border: "2px solid #D9D9D9",
          display: "flex",
          justifyContent: "center",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            height: "6em",
            width: "6em",
            borderRadius: "74px 0px 0px 354px",
            backgroundColor: props.name === "Assigned Controls" ? "#3250ff" : props.name === "Performed Percentage" ? "#8F8FFF" : "#842DED",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div>

      {/* <div
        style={{
          height: "15.2vh",
          width: "7vw",
          borderRadius: "74px 0px 0px 354px",
          backgroundColor: "",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div> */}
    </Card>
  );
};

export default SideCards;
