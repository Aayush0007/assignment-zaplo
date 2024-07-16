import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Modal from './Modal';

function App() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.log(error));
  }, []);

  const addEmployee = (newEmployee) => {
    axios.post('http://localhost:5000/employees', newEmployee)
      .then(response => setEmployees([...employees, response.data]))
      .catch(error => console.log(error));
    setShowModal(false);
  };

  const removeEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(() => setEmployees(employees.filter(employee => employee._id !== id)))
      .catch(error => console.log(error));
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPriority === '' || employee.priority === filterPriority)
    );
  });

  return (
    <div className="app">
      <h1>Zapillo Demo</h1>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by Firstname or Lastname"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">Filter by priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="employee-list">
        {filteredEmployees.map(employee => (
          <div key={employee._id} className="employee-card">
            <h2>{employee.name}</h2>
            <p>Designation: {employee.designation}</p>
            <p>Email: {employee.email}</p>
            <p>Phone: {employee.phone}</p>
            <p>Priority: {employee.priority}</p>
            <button onClick={() => removeEmployee(employee._id)}>Remove</button>
          </div>
        ))}
      </div>
      <button className="add-button" onClick={() => setShowModal(true)}>Add Employee</button>
      {showModal && <Modal onClose={() => setShowModal(false)} onSave={addEmployee} />}
    </div>
  );
}

export default App;
