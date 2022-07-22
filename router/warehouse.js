const express = require('express');
const router = express.Router();
const warehouse = require("../controller/warehouse")

router.get("/getAll",warehouse.getAll)
router.post("/addNew",warehouse.addNew)
router.get("/getOne/:id",warehouse.getOne)
router.put("/update/:id",warehouse.update)
router.put("/updateStatusOnly/:id",warehouse.updateStatus)
router.post("/inactive-warehouses",warehouse.inactiveWarehouses)

module.exports = router