const express = require('express');
const router = express.Router();
const address = require("../controller/address")

router.get("/getAll",address.getAll)
router.post("/addNew",address.addNew)
router.get("/getOne/:id",address.getOne)
router.post("/update/:id",address.update)

module.exports = router