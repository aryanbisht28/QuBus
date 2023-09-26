const router = require("express").Router();
const Project = require("../models/projectDetails");
const data = require("../data.json");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    // console.log('pro',projects)
    res.status(200).send(projects);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});


router.get("/enterdetails", async (req, res) => {
  try {
    let count = 0;
    // console.log(
    //   "a01",
    //   parseInt(data[0]["A01"]),
    //   typeof parseInt(data[0]["A01"])
    // );
    // for (let i = 0; i < data.length; i++) {
    //   let ProjectNo = data[i]["ProjectNo"];
    //   let ProjectName = data[i]["ProjectName"];
    //   let CustomerNumber = data[i]["CustomerNumber"];
    //   let CustomerName = data[i]["CustomerName"];
    //   let DepartmentID = data[i]["DepartmentID"];
    //   let QboxStatus = data[i]["QboxStatus"];
    //   let RekonnectStatus = data[i]["RekonnectStatus"];
    //   let ProjectStartDate = new Date(data[i]["ProjectStartDate"]);
    //   let ProjectEndDate = new Date(data[i]["ProjectEndDate"]);
    //   let EM = data[i]["EM"];
    //   let EP = data[i]["EP"];
    //   let SP = data[i]["SP"];
    //   let Error = data[i]["Error"];
    //   let A01 = parseInt(data[i]["A01"]);
    //   let A02 = parseInt(data[i]["A02"]);
    //   let A03 = parseInt(data[i]["A03"]);
    //   let A04 = parseInt(data[i]["A04"]);
    //   let A05 = parseInt(data[i]["A05"]);
    //   let A06 = parseInt(data[i]["A06"]);
    //   let A07 = parseInt(data[i]["A07"]);
    //   let A08 = parseInt(data[i]["A08"]);
    //   let A09 = parseInt(data[i]["A09"]);
    //   let A10 = parseInt(data[i]["A10"]);
    //   let A11 = parseInt(data[i]["A11"]);
    //   let A12 = parseInt(data[i]["A12"]);
    //   let A13 = parseInt(data[i]["A13"]);
    //   let A14 = parseInt(data[i]["A14"]);
    //   let A15 = parseInt(data[i]["A15"]);
    //   let A16 = parseInt(data[i]["A16"]);
    //   let A17 = parseInt(data[i]["A17"]);
    //   let A18 = parseInt(data[i]["A18"]);
    //   let A19 = parseInt(data[i]["A19"]);
    //   let A20 = parseInt(data[i]["A20"]);
    //   let A21 = parseInt(data[i]["A21"]);
    //   let A22 = parseInt(data[i]["A22"]);
    //   let B23 = parseInt(data[i]["B23"]);
    //   let B24 = parseInt(data[i]["B24"]);
    //   let B25 = parseInt(data[i]["B25"]);
    //   let B26 = parseInt(data[i]["B26"]);
    //   let B27 = parseInt(data[i]["B27"]);
    //   let B28 = parseInt(data[i]["B28"]);
    //   let C29 = parseInt(data[i]["C29"]);
    //   let C30 = parseInt(data[i]["C30"]);
    //   let C31 = parseInt(data[i]["C31"]);
    //   let C32 = parseInt(data[i]["C32"]);
    //   let C33 = parseInt(data[i]["C33"]);
    //   let C34 = parseInt(data[i]["C34"]);
    //   let C35 = parseInt(data[i]["C35"]);
    //   let C36 = parseInt(data[i]["C36"]);
    //   let C37 = parseInt(data[i]["C37"]);
    //   let C38 = parseInt(data[i]["C38"]);
    //   let C39 = parseInt(data[i]["C39"]);
    //   let D40 = parseInt(data[i]["D40"]);
    //   let D41 = parseInt(data[i]["D41"]);
    //   let D42 = parseInt(data[i]["D42"]);
    //   let D43 = parseInt(data[i]["D43"]);
    //   let D44 = parseInt(data[i]["A01"]);

    //   const newProjects = await Project.create({
    //     ProjectNo,
    //     ProjectName,
    //     CustomerNumber,
    //     CustomerName,
    //     DepartmentID,
    //     QboxStatus,
    //     RekonnectStatus,
    //     ProjectStartDate,
    //     ProjectEndDate,
    //     EM,
    //     EP,
    //     SP,
    //     Error,
    //     A01,
    //     A02,
    //     A03,
    //     A04,
    //     A05,
    //     A06,
    //     A07,
    //     A08,
    //     A09,
    //     A10,
    //     A11,
    //     A12,
    //     A13,
    //     A14,
    //     A15,
    //     A16,
    //     A17,
    //     A18,
    //     A19,
    //     A20,
    //     A21,
    //     A22,
    //     B23,
    //     B24,
    //     B25,
    //     B26,
    //     B27,
    //     B28,
    //     C29,
    //     C30,
    //     C31,
    //     C32,
    //     C33,
    //     C34,
    //     C35,
    //     C36,
    //     C37,
    //     C38,
    //     C39,
    //     D40,
    //     D41,
    //     D42,
    //     D43,
    //     D44,
    //   });
    //   count++;
    // }

    console.log(count);
    res.status(200).send("some text");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
