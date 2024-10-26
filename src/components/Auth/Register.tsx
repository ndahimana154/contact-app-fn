import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../api/apiRequests';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerUser(values.email, values.password);
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/');
        }, 3000)
      } catch (error: any) {
        toast.error(error.message || 'Registration failed');
      }
    },
  });

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${formik.errors.email && formik.touched.email ? 'border-red-500' : ''
              }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            name="password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${formik.errors.password && formik.touched.password ? 'border-red-500' : ''
              }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'border-red-500' : ''
              }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link to="/" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
