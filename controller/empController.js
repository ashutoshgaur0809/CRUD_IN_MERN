const db = require("../config/db");

const getEmp = async (req,res) => {

    try{
         const data = await db.query("select * from employees_new_one")
         console.log(data)
         if(!data){
            return res.status(404).send({
                success:false,
                message:"No Record found",

            })
         }
         res.status(200).send({
            success:true,
            message:"all Data Getted",
            data
         })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Getting data",
            error
        })
    }

}

const getEmpId = async (req, res) => {
    try {
        const empId = req.params.id;
        
        if (!empId) {
            return res.status(404).send({  // Use 400 for bad request
                success: false,
                message: "Invalid User ID",
            });
        }

        // Execute the query to fetch data based on employee ID
        const [rows] = await db.query('SELECT * FROM employees_new_one WHERE EMPLOYEE_ID = ?', [empId]);

        if (rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No record found",
            });
        }

        res.status(200).send({
            success: true,
            EmpData: rows[0],  // Send the first record if found
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in retrieval through ID",
            error,
        });
    }
};


const createNewEmp = async(req,res) => {
    try{
        const {FIRST_NAME, LAST_NAME, EMAIL, SALARY} = req.body
        if(!FIRST_NAME || !LAST_NAME || !EMAIL || !SALARY){
            return res.status(500).send({
                success:false,
                message:"Error in creation Provide all fields"
            })
        } 

        const data = await db.query(`insert into emp_new (FIRST_NAME,LAST_NAME,EMAIL,SALARY) values (?,?,?,?)`,[FIRST_NAME,LAST_NAME,EMAIL,SALARY])
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Error in creation During Insret Query"
               })
        }

        res.status(201).send({
             success:true,
             message:"New Data inseted! Done"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in creation"
        })
    }
};  

const updateEmp = async(req,res) => {
    try{
        const empId = req.params.id
        if(!empId){
            return res.status(404).send({
                success:false,
                message:"Error in finding Employye id!"
            });
        }

        const {FIRST_NAME, LAST_NAME, EMAIL, SALARY} = req.body
        const data = db.query(`update emp_new set FIRST_NAME = ?, LAST_NAME = ?, EMAIL = ?, SALARY = ? where EMPLOYEE_ID = ?`,[FIRST_NAME,LAST_NAME,EMAIL,SALARY,empId])
        if(!data){
            return res.status(500).send({
                success:false,
                message:"Error in updation in Query!"
            });
        }
        res.status(200).send({
            success:true,
            message:"Updated Succesfully!"
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update!",
            error
        });
    }
};

const delEmp = async(req,res) => {
    try{
        const empId = req.params.id
        if(!empId){
            return res.status(404).send({
                success:false,
                message:"Error in id enter an valid id!"
            })
        }

        await db.query(`delete from emp_new where EMPLOYEE_ID=?`,[empId])
        res.status(200).send({
            success:true,
            message:"Data delted succesfully!"
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in deletion"
        })

    }
}

module.exports = { getEmp, getEmpId, createNewEmp,updateEmp, delEmp}; 