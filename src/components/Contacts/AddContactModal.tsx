import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { createNewContact } from '../../api/apiRequests';
import { toast, ToastContainer } from 'react-toastify';

const AddContactModal = ({ onClose, onAdd }: any) => {
    // Validation schema with Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be at least 10 digits'),
    });

    // Form submission with Formik
    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            const response = await createNewContact({
                names: values.name,
                email: values.email,
                phone: values.phone
            });
            console.log(response);
            toast.success(response.message)

            onAdd((prevContacts: any) => [...prevContacts, response.data.contact]);
            // onClose();
            resetForm();
        } catch (error) {
            console.error('Failed to add contact:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-700">Add New Contact</h2>
                        <button onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-gray-700" />
                        </button>
                    </div>
                    <Formik
                        initialValues={{ name: '', email: '', phone: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Phone</label>
                                    <Field
                                        type="tel"
                                        name="phone"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                    ) : (
                                        'Add Contact'
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default AddContactModal;
