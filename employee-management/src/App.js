import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';  // Import Modal from Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    FIRST_NAME: '',
    LAST_NAME: '',
    EMAIL: '',
    SALARY: ''
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  // References for the Bootstrap modals
  const createModalRef = useRef(null);
  const updateModalRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:9090/api/v1/emp/getAll')
      .then((response) => {
        if (response.data.success) {
          setEmployees(response.data.data || []);
        } else {
          console.error("Error fetching employees:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching employees: ", error);
      });
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:9090/api/v1/emp/get/${empId}`)
      .then((response) => {
        setEmployee(response.data.EmpData);
      })
      .catch((error) => {
        console.error("Error fetching employee by ID: ", error);
      });
  };

  const handleCreate = () => {
    axios.post('http://localhost:9090/api/v1/emp/create', newEmployee)
      .then((response) => {
        alert(response.data.message);
        setEmployees([...employees, response.data.data]);
        setNewEmployee({ FIRST_NAME: '', LAST_NAME: '', EMAIL: '', SALARY: '' });
        if (createModalRef.current) {
          const modal = new Modal(createModalRef.current);
          modal.hide();
        }
      })
      .catch((error) => {
        console.error("Error creating employee: ", error);
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:9090/api/v1/emp/update/${editingEmployee.EMPLOYEE_ID}`, editingEmployee)
      .then((response) => {
        alert(response.data.message);
        setEmployees(employees.map(emp =>
          emp.EMPLOYEE_ID === editingEmployee.EMPLOYEE_ID ? editingEmployee : emp
        ));
        setEditingEmployee(null);
        if (updateModalRef.current) {
          const modal = new Modal(updateModalRef.current);
          modal.hide();
        }
      })
      .catch((error) => {
        console.error("Error updating employee: ", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:9090/api/v1/emp/delete/${id}`)
      .then(() => {
        alert('Employee deleted successfully');
        setEmployees(employees.filter((emp) => emp.EMPLOYEE_ID !== id));
      })
      .catch((error) => {
        console.error("Error deleting employee: ", error);
      });
  };

  const openCreateModal = () => {
    if (createModalRef.current) {
      const modal = new Modal(createModalRef.current);
      modal.show();
    }
  };

  const openUpdateModal = (employee) => {
    setEditingEmployee(employee);
    if (updateModalRef.current) {
      const modal = new Modal(updateModalRef.current);
      modal.show();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Employee Management</h1>

      {/* Create Employee Section - Modal Trigger */}
      <div className="text-center mb-5">
        <button
          className="btn btn-primary"
          onClick={openCreateModal}
        >
          Create New Employee
        </button>
      </div>

      {/* Modal for Creating New Employee */}
      <div
        className="modal fade"
        id="createEmployeeModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createEmployeeModalLabel"
        aria-hidden="true"
        ref={createModalRef}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createEmployeeModalLabel">Create New Employee</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="First Name"
                  value={newEmployee.FIRST_NAME}
                  onChange={(e) => setNewEmployee({ ...newEmployee, FIRST_NAME: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Last Name"
                  value={newEmployee.LAST_NAME}
                  onChange={(e) => setNewEmployee({ ...newEmployee, LAST_NAME: e.target.value })}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={newEmployee.EMAIL}
                  onChange={(e) => setNewEmployee({ ...newEmployee, EMAIL: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Salary"
                  value={newEmployee.SALARY}
                  onChange={(e) => setNewEmployee({ ...newEmployee, SALARY: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreate}
              >
                Create Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Updating Employee */}
      <div
        className="modal fade"
        id="updateEmployeeModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="updateEmployeeModalLabel"
        aria-hidden="true"
        ref={updateModalRef}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateEmployeeModalLabel">Update Employee</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="First Name"
                  value={editingEmployee?.FIRST_NAME || ''}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, FIRST_NAME: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Last Name"
                  value={editingEmployee?.LAST_NAME || ''}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, LAST_NAME: e.target.value })}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={editingEmployee?.EMAIL || ''}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, EMAIL: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Salary"
                  value={editingEmployee?.SALARY || ''}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, SALARY: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Employee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Employee Section */}
      <div className="card p-4 mb-5">
        <h2>Search Employee by ID</h2>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary mb-3" onClick={handleSearch}>Search</button>

        {employee && (
          <div>
            <h3>Employee Details</h3>
            <p><strong>Name:</strong> {employee.FIRST_NAME} {employee.LAST_NAME}</p>
            <p><strong>Email:</strong> {employee.EMAIL}</p>
            <p><strong>Salary:</strong> ${employee.SALARY}</p>
            <button className="btn btn-primary" onClick={() => openUpdateModal(employee)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(employee.EMPLOYEE_ID)}>Delete</button>
          </div>
        )}
      </div>

      {/* Employees List */}
      <div className="card p-4">
        <h2>Employees List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.EMPLOYEE_ID}>
                <td>{emp.EMPLOYEE_ID}</td>
                <td>{emp.FIRST_NAME}</td>
                <td>{emp.LAST_NAME}</td>
                <td>{emp.EMAIL}</td>
                <td>${emp.SALARY}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => openUpdateModal(emp)}
                  >
                    
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(emp.EMPLOYEE_ID)}
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
