
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- Latest compiled and minified CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <style>
     body {
        background-image: url('blurishbg3.jpg');
            background-color: #f8f9fa; /* Light grey background for the entire page */
            font-family: Arial, sans-serif; /* Clean and modern font */
        }
        .container {
            background-color: rgba(255, 196, 102, 0.509);  /* White background for the form container */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin: 50px auto;
        }
        .modal-header {
            border-bottom: 2px solid #dee2e6;
            padding-bottom: 15px;
        }
        .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            font-weight: 500;
        }
        .form-control {
            border-radius: 8px;
            border: 1px solid hsl(210, 46%, 47%);
            box-shadow: inset 0 1px 2px #e46a0cac;
        }
        .form-control:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25);
        }
        .btn-primary {
            border-radius: 20px;
            padding: 10px 20px;
            font-size: 16px;
            text-transform: uppercase;
            font-weight: 600;
            transition: background-color 0.3s, box-shadow 0.3s;
        }
        .btn-primary {
            background-color: #5f93c9;
            border: none;
        }
        .btn-primary:hover {
            background-color: rgb(0, 65, 135);
            box-shadow: 0 4px 8px #ff000033;
        }
    </style>
 
</head>
<body>
    <cfoutput>
 
    <cfset Emp_ID = 0> 
    <cfset fname=""> 
    <cfset lname=""> 
    <cfset email=""> 
    <cfset salary=""> 
    <!--- <cfdump var="#url#"> --->
    <cfif structKeyExists(url,"Emp_id") and url.Emp_id GT 0 >
        <cfquery name="Get_Emp_By_Id">
            SELECT EMPLOYEE_ID,FIRST_NAME, LAST_NAME, EMAIL, SALARY 
            FROM emp_new
            where EMPLOYEE_ID = #url.Emp_id#;
        </cfquery>
        <!--- <cfdump var="#Get_Emp_By_Id#"><cfabort> --->

        <!--- Query ka output ho tab yani Query kuch return --->
        <cfif Get_Emp_By_Id.recordCount GT 0>
            <cfset fname=#Get_Emp_By_Id.FIRST_NAME#> 
            <cfset lname=#Get_Emp_By_Id.LAST_NAME#> 
            <cfset email=#Get_Emp_By_Id.EMAIL#> 
            <cfset salary=#Get_Emp_By_Id.SALARY#> 
            <cfset Emp_ID = Get_Emp_By_Id.EMPLOYEE_ID> 
        </cfif>
    </cfif>
    
    <div class="container">
    <div class="modal-header">
        <h class="modal-title p-5" id="exampleModalLabel">Insert in Table</h                                                                                                             5>
        
    </div>
    <div class="modal-body">
        <div class="container mt-3">
            <cfform name="insertEmp" action="add.cfm">
                <cfinput type="hidden" name="Emp_ID" class="form-control" value="#Emp_ID#"> 
                First Name : 
                <cfinput type="text" name="fname" class="form-control" value="#fname#"> <br> <br>
                Last Name : 
                <cfinput type="text" name="lname" class="form-control" value="#lname#"> <br> <br>
                Email :
                <cfinput type="text" name="email" class="form-control" value="#email#"> <br> <br>
                Salary :
                <cfinput type="text" name="salary" class="form-control" value="#salary#"> <br> <br> 
            
                
                
            
                <cfinput type="submit" name="btnSubmit" value="Submit" class="btn btn-primary">
            </cfform>
        
        </div>
    </div>

    </div>
    </div>
</cfoutput>

</body>
</html>