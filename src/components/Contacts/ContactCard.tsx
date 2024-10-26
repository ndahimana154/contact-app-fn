import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ContactCard = ({ contact, onEdit, onDelete }: any) => {
    return (
        <div className="p-4 bg-white rounded-md shadow-md mb-4 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold text-gray-700">{contact.names}</h3>
                <p className="text-gray-500">{contact.email}</p>
                <p className="text-gray-500">{contact.phone}</p>
            </div>
            <div>
                <button onClick={onEdit} className="text-blue-500 hover:underline mr-2">
                    <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button onClick={onDelete} className="text-red-500 hover:underline">
                    <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
            </div>
        </div>
    );
};

export default ContactCard;
