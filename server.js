const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Token
const { confirmToken } = require("./routes/verifyToken");

// Import Routes
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/studentlist");

// Middleware
app.use(express.json());
// Route Middlewares
app.use("/api/user", authRoute); // prefixing all routes in authRout with '/api/user/
app.use("/api/students", studentRoute);

const PORT_NUM = process.env.PORT_NUM || 3000;
const DB_URL = process.env.CONNECTION_URL;
const mongo_options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(DB_URL, mongo_options)
  .then(() =>
    app.listen(PORT_NUM, () =>
      console.log(`Server up and running on port ${PORT_NUM}`)
    )
  )
  .catch((err) => console.log(err));
