const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const Db = require("./config/db");
//dot env config
dotenv.config();

//Data base connections
Db();

// rest Object
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
//URL => http://localhost :8080
app.use("/api/V1/test", require("./routes/testRoutes"));
app.use("/api/V1/auth", require("./routes/authRoutes"));
app.use("/api/V1/user", require("./routes/userRoutes"));
app.use("/api/V1/resturant", require("./routes/resturantRoutes"));
app.use("/api/V1/category", require("./routes/categoryRoute"));
app.use("/api/V1/food", require("./routes/FoodRoutes"));

//home api
app.get("/", (req, res) => {
  // return res.status(200).json({ msg: "Wecome to food Server" });
  return res.status(200).send("<h1>Wecome to food Server</h1>");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, (res, req) => {
  console.log(`server is running on ${PORT}`.bgRed.red);
});
