const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const connectDb = require("./connectDB/Db");
const app = express();
const PORT = 4000;
//Database Connection
connectDb();
//Body Parser set Up
app.use(bodyParser.urlencoded({ extended: false }));
// Set up for css and extra file for ejs
app.use(express.static(path.join(process.cwd(), "Public")));
//Set up ejs File
app.set("view engine", "ejs");
//Routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
