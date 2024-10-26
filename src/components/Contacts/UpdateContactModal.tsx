import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { updateContact } from '../../api/apiRequests';
import { toast, ToastContainer } from 'react-toastify';

const UpdateContactModal = ({ contact, onClose, onUpdate }: any) => {
    const [updatedContact, setUpdatedContact] = useState(contact);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUpdatedContact(contact);
    }, [contact]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUpdatedContact({ ...updatedContact, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await updateContact(updatedContact)
            onUpdate(response.data.contact)
            toast.success(response.message)
        } catch (error) {
            console.error("Failed to update contact", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-700">Update Contact</h2>
                        <button onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-700" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={updatedContact?.names || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={updatedContact?.email || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={updatedContact?.phone || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <FontAwesomeIcon icon={faSpinner} spin />
                            ) : (
                                'Update Contact'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>

    );
};

export default UpdateContactModal;
