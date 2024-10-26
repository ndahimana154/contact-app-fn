import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';
import { useEffect, useState } from 'react';
import { deleteContact, getContacts, updateContact } from '../../api/apiRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import AddContactModal from './AddContactModal';
import UpdateContactModal from './UpdateContactModal';
import { toast, ToastContainer } from 'react-toastify';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);

    const token = localStorage.getItem('token');
    if (!token) {
        return (
            <div className="text-center text-red-500">
                Please log in to view your contacts. <Link to="/">Login</Link>
            </div>
        );
    }

    useEffect(() => {
        const fetchContacts = async () => {
            setIsLoading(true);
            try {
                const response = await getContacts();
                setContacts(response.data.contacts);
            } catch (error) {
                console.error("Failed to fetch contacts", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const handleUpdateContact = async (updatedContact: any) => {
        setContacts((prevContacts: any) =>
            prevContacts.map((contact: any) =>
                contact._id === updatedContact._id ? updatedContact : contact
            )
        );
    };

    const handleOnDelete = async (id: any) => {
        try {
            const response = await deleteContact(id);
            toast.success(response.message)
            setContacts(prevContacts => prevContacts.filter((contact: any) => contact._id !== id));
        } catch (error) {

        }
    }

    return (
        <>
            <ToastContainer />
            <div className="my-10 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-700">Contacts</h2>
                    <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add New Contact
                    </button>
                </div>
                {isLoading ? (
                    <div className="flex justify-center">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500 text-4xl" />
                    </div>
                ) : (
                    <div>
                        {contacts
                            .sort((a: any, b: any) => a.names.localeCompare(b.names))
                            .map((contact: any) => (
                                <ContactCard
                                    key={contact._id}
                                    contact={contact}
                                    onEdit={() => {
                                        setCurrentContact(contact);
                                        setShowUpdateModal(true);
                                    }}
                                    onDelete={() => {
                                        handleOnDelete(contact._id)
                                    }}
                                />
                            ))}
                    </div>
                )}
                {showAddModal && <AddContactModal onClose={() => setShowAddModal(false)} onAdd={setContacts} />}
                {showUpdateModal && currentContact && (
                    <UpdateContactModal
                        contact={currentContact}
                        onClose={() => setShowUpdateModal(false)}
                        onUpdate={handleUpdateContact}
                    />
                )}
            </div>
        </>
    );
};

export default ContactList;
