import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {

    const emailRegex = /^\d{8,10}@swave\.smu\.ac\.za$/;

    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter your smu provided email address.');
      return;
    }

    try {

      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/signup', {
        email,
        password,
        confirmPassword
      });

      if (response.data.status === 'success') {
        navigate('/verify-otp', { state: { email } });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <div className="relative h-screen">
    <div className="absolute inset-0 bg-landing"></div>
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 flex flex-col justify-center items-center h-full">
      <div className="flex flex-col items-center mb-8 ">
        <img src="logo.png" alt="" className="w-36 h-36 " />
        <h1 className="font-edu-hand text-white text-5xl font-bold ">Unimate</h1>
      </div>        
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>} 
      <div>
        <div className="mb-4">
          <label type="email"  className="block text-gray-700 mb-2">Email</label>
          <input type="email" value={email} onChange={(e) =>{setEmail(e.target.value)}} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input type="password" value={password} onChange={(e) =>{setPassword(e.target.value)}} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) =>{setConfirmPassword(e.target.value)}} className="w-full px-3 py-2 border rounded-lg" />
        </div>
      <button type="submit" onClick={handleSignUp} className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-black">Sign Up</button>       
      </div>
      <p className="mt-4 text-center">Already have an account? <Link to="/sign-in" className="text-blue-500">Sign in now</Link></p>
    </div>
  </div>
</div>

  );
};

export default SignUpPage;
