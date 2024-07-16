import React, { useState } from 'react';
import './Modal.css';

function Modal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = () => {
    onSave({ name, designation, email, phone, priority });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Fill up the details given below</h2>
        <input type="text" placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Company" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <div className="modal-buttons">
          <button onClick={onClose}>CLOSE</button>
          <button onClick={handleSubmit}>SAVE CHANGES</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
