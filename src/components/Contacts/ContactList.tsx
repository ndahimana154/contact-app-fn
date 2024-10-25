// src/components/Contacts/ContactList.js
import React from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = () => {
    const dummyContacts = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
    ];

    return (
        <div className="my-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Contacts</h2>
                <Link to="/contacts/new" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add New Contact</Link>
            </div>
            <div>
                {dummyContacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
        </div>
    );
};

export default ContactList;
