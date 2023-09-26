require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const loginRoutes = require("./routes/login");

// database connection
connection();

// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// routes
app.use("/uploads", express.static("uploads"));
app.use("/login", loginRoutes);
app.use("/projectdetails",require("./routes/project"));

const port = process.env.PORT || 8000;
app.listen(port, console.log(`Listening on port ${port}...`));
