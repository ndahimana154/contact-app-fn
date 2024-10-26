import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

const token = localStorage.getItem('token');

export const registerUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(API_URL + '/api/auth/register', { email, password });
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
        throw new Error(errorMessage);
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        return response;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
        throw new Error(errorMessage);
    }
};

export const getContacts = async () => {
    try {

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(`${API_URL}/api/contacts/get-user-contacts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
        throw new Error(errorMessage);
    }
};

export const createNewContact = async (contactData: any) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/api/contacts/create-new-contact`,
            contactData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
        throw new Error(errorMessage);
    }
};

export const updateContact = async (data: any) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            `${API_URL}/api/contacts/update-contact/${data._id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
        throw new Error(errorMessage);
    }
}

export const deleteContact = async (contactId: string) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
            `${API_URL}/api/contacts/delete-contact/${contactId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
        throw new Error(errorMessage);
    }
}