const studentRouter = require("express").Router();
const confirmToken = require("./verifyToken");

studentRouter.get("/", confirmToken, (req, res) => {
  res.json({
    students: [
      { firstname: "James", surname: "Naismith", gender: "M", age: 40 },
      { firstname: "Amber", surname: "Johanson", gender: "F", age: 34 },
    ],
  });
});

module.exports = studentRouter;
