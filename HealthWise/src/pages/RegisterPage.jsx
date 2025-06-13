import { useState } from 'react';
import { registerUser } from '../api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '', age: '', gender: '', country: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // ✅ Updates state correctly
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);
      console.log(response.data); // ✅ Check what backend is sending

      // ✅ Display success message
      alert(response.data.message);

      // ✅ Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Registration failed');
    }
  };



  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full my-5 flex justify-center items-center flex-col">
        <h1 className="text-2xl font-semibold">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center my-6 gap-4 w-[50%]">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname">Full name</label>
            <input type="text" name="fullname" className="text-white rounded-md px-4 py-2 border-1 w-100" placeholder="Enter your full name" onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="text-white rounded-md px-4 py-2 border-1 w-100" placeholder="Enter your email" onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="text-white rounded-md px-4 py-2 border-1 w-100" placeholder="Enter your password" onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="age">Age</label>
            <input type="number" name="age" className="text-white rounded-md px-4 py-2 border-1 w-100" placeholder="Enter your age" onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender">Gender</label>
            <select name="gender" className="text-white rounded-md px-4 py-2 border-1 w-100" onChange={handleChange} required>
              <option value="" className="text-black">Select Gender</option>
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country">Country</label>
            <input type="text" name="country" className="text-white rounded-md px-4 py-2 border-1 w-100" placeholder="Enter your country" onChange={handleChange} required />
          </div>
          <button type="submit" className="mt-4 flex justify-center text-white bg-[#789CBA] px-3 py-2 rounded-4xl cursor-pointer w-[50%]">
            Register
          </button>
          <p className="opacity-40">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;