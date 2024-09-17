const db = require("../config/db");

const getEmp = async (req, res) => {
    try {
        const [data] = await db.query("SELECT * FROM emp_new");
        if (!data || data.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No records found",
            });
        }
        res.status(200).send({
            success: true,
            message: "All data retrieved",
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving data",
            error
        });
    }
};

const getEmpId = async (req, res) => {
    try {
        const empId = req.params.id;

        if (!empId) {
            return res.status(400).send({
                success: false,
                message: "Invalid employee ID",
            });
        }

        const [rows] = await db.query('SELECT * FROM emp_new WHERE EMPLOYEE_ID = ?', [empId]);

        if (rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No record found",
            });
        }

        res.status(200).send({
            success: true,
            EmpData: rows[0], // Send the first record if found
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving data by ID",
            error,
        });
    }
};

const createNewEmp = async (req, res) => {
    try {
        const { FIRST_NAME, LAST_NAME, EMAIL, SALARY } = req.body;
        
        // Check for required fields
        if (!FIRST_NAME || !LAST_NAME || !EMAIL || !SALARY) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields",
            });
        }

        // Insert new employee into the database
        const [result] = await db.query(
            `INSERT INTO emp_new (FIRST_NAME, LAST_NAME, EMAIL, SALARY) VALUES (?, ?, ?, ?)`, 
            [FIRST_NAME, LAST_NAME, EMAIL, SALARY]
        );

        if (!result || !result.insertId) {
            return res.status(500).send({
                success: false,
                message: "Error inserting data",
            });
        }

        // Fetch the newly inserted employee by its insertId
        const [newEmployee] = await db.query(`SELECT * FROM emp_new WHERE EMPLOYEE_ID = ?`, [result.insertId]);

        // Ensure the employee was found and return the full data
        if (newEmployee && newEmployee.length > 0) {
            res.status(201).send({
                success: true,
                message: "New data inserted successfully",
                data: newEmployee[0], // Sending the inserted employee data back to the client
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Employee not found after insertion",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error creating employee",
        });
    }
};


const updateEmp = async (req, res) => {
    try {
        const empId = req.params.id;
        if (!empId) {
            return res.status(400).send({
                success: false,
                message: "Employee ID is required",
            });
        }

        const { FIRST_NAME, LAST_NAME, EMAIL, SALARY } = req.body;
        const [result] = await db.query(`UPDATE emp_new SET FIRST_NAME = ?, LAST_NAME = ?, EMAIL = ?, SALARY = ? WHERE EMPLOYEE_ID = ?`, [FIRST_NAME, LAST_NAME, EMAIL, SALARY, empId]);

        if (!result.affectedRows) {
            return res.status(404).send({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Employee updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating employee",
            error
        });
    }
};

const delEmp = async (req, res) => {
    try {
        const empId = req.params.id;
        if (!empId) {
            return res.status(400).send({
                success: false,
                message: "Employee ID is required",
            });
        }

        const [result] = await db.query(`DELETE FROM emp_new WHERE EMPLOYEE_ID = ?`, [empId]);

        if (!result.affectedRows) {
            return res.status(404).send({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error deleting employee",
        });
    }
};

module.exports = { getEmp, getEmpId, createNewEmp, updateEmp, delEmp };
