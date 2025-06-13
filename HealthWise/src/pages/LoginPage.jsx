import { useState } from 'react';
import { loginUser } from '../api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(credentials);
      console.log(response.data); // ✅ Check backend response in console

      if (response.data.message === "Login successful") {
        alert('Login Successful'); // ✅ Display success message
        localStorage.setItem('user', JSON.stringify(response.data)); // ✅ Store user data in local storage
        window.location.href = '/home'; // ✅ Redirect after login
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full my-5 flex justify-center items-center flex-col">
        <h1 className="text-2xl font-semibold">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center my-6 gap-4 w-[50%]">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="text-white rounded-md px-4 py-2 border-1 w-100" placeholder="Enter your Email" onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="text-white rounded-md px-4 py-2 border-1 w-100" placeholder="Enter your password" onChange={handleChange} />
          </div>
          <button type="submit" className="mt-4 flex justify-center text-white bg-[#789CBA] px-3 py-2 rounded-4xl cursor-pointer w-[50%]">
            Login
          </button>
          <p className="opacity-40">Don't have an account? <Link to="/register">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;