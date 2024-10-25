// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ContactList from './components/Contacts/ContactList';
import NewContactForm from './components/Contacts/NewContactForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contacts/new" element={<NewContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
 