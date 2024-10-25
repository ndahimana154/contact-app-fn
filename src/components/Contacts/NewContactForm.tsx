// src/components/Contacts/NewContactForm.js
import React from 'react';

const NewContactForm = () => {
  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Email</label>
          <input type="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Phone</label>
          <input type="tel" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Save Contact</button>
      </form>
    </div>
  );
};

export default NewContactForm;
