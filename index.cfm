<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management</title>
    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Latest jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <style>
        body {
            background-image: url('blurishbg3.jpg'); /* Replace with your image path */
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-color: #f8f9fa; /* Fallback color */
        }
        .modal-header {
            background-color: #007bff;
            color: white;
        }
        .modal-content {
            border-radius: 8px;
        }
        .table thead th {
            background-color: #007bff;
            color: white;
            text-align: center;
            font-weight: bold;
        }
        .table tbody tr:nth-child(odd) {
            background-color: #f2f2f2; /* Zebra striping */
        }
        .table tbody tr:hover {
            background-color: #e6f7ff; /* Hover effect */
            cursor: pointer;
        }
        .table td, .table th {
            padding: 15px;
            text-align: center;
            border: 1px solid #dee2e6;
        }
        .table {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .container {
            background-color: hsl(37, 100%, 70%); /* Light orange-yellow for contrast */
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .btn-primary, .btn-warning, .btn-danger {
            border-radius: 20px;
            padding: 10px 20px;
            font-size: 16px;
            text-transform: uppercase;
            font-weight: bold;
            transition: background-color 0.3s, box-shadow 0.3s;
        }
        .btn-primary {
            background-color: #007bff;
            border: none;
        }
        .btn-primary:hover {
            background-color: #0056b3;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .btn-warning {
            background-color: #ffc107;
            border: none;
        }
        .btn-warning:hover {
            background-color: #e0a800;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .btn-danger {
            background-color: #dc3545;
            border: none;
        }
        .btn-danger:hover {
            background-color: #c82333;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .btn a {
            color: white;
            text-decoration: none;
        }
        .btn a:hover {
            color: #dcdcdc;
        }
    </style>
</head>
<body>
    <cfoutput>
        <cfquery name="Get_Emp">
            SELECT EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, SALARY FROM emp_new;
        </cfquery>

        <div class="container mt-3">
            <h2 class="text-white">Employee Table</h2>
            
            <div class="mb-3">
                <a href="form.cfm?Emp_id=0&del=0" class="btn btn-primary">Add New Employee</a>
            </div>
            <table class="table table-bordered mt-2">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!--- <cfdump var="#Get_Emp#"> <cfabort> --->
                    <cfloop query="Get_Emp">
                        <tr>
                            <td>#FIRST_NAME#</td>
                            <td>#LAST_NAME#</td>
                            <td>#EMAIL#</td>
                            <td>#SALARY#</td>
                            <td>
                                <a href="form.cfm?Emp_id=#EMPLOYEE_ID#&del=0" class="btn btn-warning btn-sm">Update</a>
                                <a href="del.cfm?Emp_id=#EMPLOYEE_ID#&del=1" class="btn btn-danger btn-sm">Delete</a>
                            </td>
                        </tr>
                    </cfloop>
                </tbody>
            </table>
        </div>
    </cfoutput>
</body>
</html>
