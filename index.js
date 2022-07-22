const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser')
const morgan = require('morgan')

const company = require("./router/company");
const address = require("./router/address");
const warehouse = require("./router/warehouse");
const employee = require("./router/employee");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/company", company);
app.use("/address", address);
app.use("/warehouse", warehouse);
app.use("/employee", employee);

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log("app running on " + port);
});
