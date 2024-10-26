import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../../api/apiRequests';

const Login = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await loginUser(values.email, values.password);
                localStorage.setItem('token', response.data.data.token);
                toast.success('Login successful');
                setTimeout(() => {
                    navigate('/contacts');
                }, 3000)
            } catch (error: any) {
                console.error("Login error:", error);
                toast.error(error.message || 'Login failed');
            }
        },
    });

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-md shadow-md">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
                >
                    Login
                </button>
            </form>
            <p className="text-center mt-4">
                Don’t have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default Login;
