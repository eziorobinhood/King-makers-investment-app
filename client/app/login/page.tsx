'use client';

import { useState } from 'react';
import InputField from '@/components/InputField';
import Logo from '@/components/svg';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    otp: '',
    referralCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 py-12">
        {/* Logo */}
        <div className="flex justify-center"> <Logo /></div>


        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mail ID/Phone Number */}
          <InputField
            label="Mail ID/Phone Number"
            type="text"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            placeholder="Enter your email or phone number"
            required
          />

          {/* OTP */}
          <InputField
            label="OTP"
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
          />

          {/* Referral Code */}
          <InputField
            label="Referral Code"
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Enter referral code (optional)"
          />

          {/* Login/Signup Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Login/Signup
          </button>
        </form>
      </div>
    </div>
  );
}
