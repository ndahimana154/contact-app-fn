// src/components/Contacts/ContactCard.js
import React from 'react';

const ContactCard = ({ contact }) => {
    return (
        <div className="p-4 bg-white rounded-md shadow-md mb-4 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">{contact.name}</h3>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
            </div>
            <div>
                <button className="text-blue-500 hover:underline mr-2">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
            </div>
        </div>
    );
};

export default ContactCard;
