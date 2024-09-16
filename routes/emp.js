const express = require("express");
const { getEmp, getEmpId, createNewEmp, updateEmp, delEmp } = require("../controller/empController");

const router = express.Router();

// Get Employees -> Method is GET
router.get("/getAll", getEmp);

// get employee by id
router.get("/get/:id",getEmpId)

// Create New Data
router.post("/create",createNewEmp)

//crete route for update section 
router.put("/update/:id",updateEmp)

// create router with handler for delete
router.delete("/delete/:id",delEmp)

module.exports = router;
