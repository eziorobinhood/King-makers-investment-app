'use client';

import { useState } from 'react';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import Logo from '@/components/svg';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    occupation: '',
    upiId: '',
    referral: '',
  });

  const [isGovtEmployee, setIsGovtEmployee] = useState(false);
  // const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone number
    if (formData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Send OTP to phone number
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send OTP');
      }

      // Show OTP dialog on success
      // setShowOtpDialog(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-4">
      <div className="w-full max-w-md px-6 py-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        {/* Signup Heading */}
        <h1 className="text-xl font-bold text-gray-800 text-center mb-4">
          Create Your Account
        </h1>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <InputField
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          {/* Date of Birth */}
          <InputField
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          {/* Gender */}
          <SelectField
            label="Gender"
            name="gender"
            options={genderOptions}
            value={formData.gender}
            onChange={handleChange}
            placeholder="Select your gender"
            required
          />

          <InputField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setFormData({ ...formData, phone: value });
            }}
            placeholder="Enter your phone number"
            required
          />

          <InputField
            label="Occupation Type"
            name="occupation"
            type="text"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Enter your Occupation"
            required
          />

          {/* UPI ID */}

          <InputField
            label="UPI ID"
            type="text"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            placeholder="Enter UPI ID (e.g., name@upi)"
          />


          <InputField
            label="Referral Code"
            type="text"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            placeholder="Enter Your Code"
          />


          {/* Government Employee Toggle */}
          <div className="w-full">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isGovtEmployee}
                onChange={(e) => setIsGovtEmployee(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-400 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700">
                I am a Government Employee
              </span>
            </label>
          </div>

          {/* Error Message */}
          {/* {error && !showOtpDialog && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )} */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending OTP...' : 'Sign Up'}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-gray-800 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>

      {/* OTP Verification Dialog */}
      {(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            {/* Dialog Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white text-center">
                Verify Phone Number
              </h3>
            </div>

            {/* Dialog Content */}
            <div className="p-6">
              <p className="text-center text-gray-600 mb-6">
                Enter the 6-digit OTP sent to<br />
                <span className="font-semibold text-gray-800">+91 {formData.phone}</span>
              </p>

              {/* OTP Input Fields */}
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-gray-800 focus:outline-none transition-colors"
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}

              {/* Verify Button */}
              <button
                // onClick={verifyOtpAndSignup}
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {isLoading ? 'Verifying...' : 'Verify & Sign Up'}
              </button>

              {/* Resend OTP */}
              <button
                onClick={async () => {
                  setOtp(['', '', '', '', '', '']);
                  setError('');
                  setIsLoading(true);
                  try {
                    const response = await fetch('/api/otp/send', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ phone: formData.phone }),
                    });
                    if (!response.ok) {
                      const data = await response.json();
                      throw new Error(data.message || 'Failed to resend OTP');
                    }
                  } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to resend OTP');
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading}
                className="w-full py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors disabled:opacity-50"
              >
                Resend OTP
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => {
                  // setShowOtpDialog(false);
                  setOtp(['', '', '', '', '', '']);
                  setError('');
                }}
                className="w-full py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
