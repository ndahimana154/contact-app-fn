import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

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
        console.error("API error:", errorMessage);
        throw new Error(errorMessage);
    }
};