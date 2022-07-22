const express = require('express');
const router = express.Router();
const employee = require("../controller/employee")

router.get("/getAll",employee.getAll)
router.post("/addNew",employee.addNew)
router.get("/getOne/:id",employee.getOne)
router.put("/update/:id",employee.update)
router.put("/updateStatusOnly/:id",employee.updateStatus)
// router.post("/inactive-employees",employee.inactiveWarehouses)

module.exports = router