import React, { useState } from 'react';
import { useLocation, useNavigate , Link} from 'react-router-dom';
import axios from 'axios';

const OtpVerification = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [otp, setOtp] = useState();
    const {email} = location.state || {}
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/v1/auth/verify', {
                email,
                otp: otp
            });

            if (res.data.status === 'success') {
                setMessage(res.data.message);
                setError('');
                navigate('/create-profile')
            } else {
                setError(res.data.message);
                setMessage('');
            }
        } catch (err) {
            setError('An error occurred while verifying the OTP.');
            setMessage('');
        }
    }

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
            <h2 className="text-2xl font-semibold mb-4">Verify Email</h2>
            {message && <p className="text-red-600 text-center mb-4">{message}</p>}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>} 
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" value={email}  id="email" readOnly className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">OTP</label>
                <input type="number" value={otp} id="otp" onChange={handleOtpChange} required className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-black">Verify</button>         
            </form>
            <p className="mt-4 text-center">Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign up now</Link></p>
          </div>
         </div>
        </div>
    );
};

export default OtpVerification;
