const express = require('express');
const router = express.Router();
const company = require("../controller/company")

router.get("/getAll",company.getAll)
router.post("/addNew",company.addNew)
router.get("/getOne/:id",company.getOne)
router.post("/update/:id",company.update)

module.exports = router