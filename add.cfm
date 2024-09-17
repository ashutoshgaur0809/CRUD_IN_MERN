<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Form</title>
    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Latest jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>


</head>
<body>
    <cfoutput>
        <div class="container mt-5">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Insert in Table</h5>
            </div>
            <div class="modal-body">
                <div class="container mt-3">
                    <cfform name="insertEmp" action="add.cfm">
                        <cfinput type="hidden" name="Emp_ID" class="form-control" value="#Emp_ID#"> 
                        
                        <div class="form-group">
                            <label for="fname">First Name:</label>
                            <cfinput type="text" name="fname" id="fname" class="form-control" value="#fname#">
                        </div>
                        
                        <div class="form-group">
                            <label for="lname">Last Name:</label>
                            <cfinput type="text" name="lname" id="lname" class="form-control" value="#lname#">
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <cfinput type="text" name="email" id="email" class="form-control" value="#email#">
                        </div>
                        
                        <div class="form-group">
                            <label for="salary">Salary:</label>
                            <cfinput type="text" name="salary" id="salary" class="form-control" value="#salary#">
                        </div>
                        
                        <cfinput type="submit" name="btnSubmit" value="Submit" class="btn btn-primary">
                    </cfform>
                </div>
            </div>
        </div>
    </cfoutput>
</body>
</html>
