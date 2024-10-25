import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Email</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold">Password</label>
                    <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Login</button>
            </form>
            <p className="text-center mt-4">
                Don’t have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
