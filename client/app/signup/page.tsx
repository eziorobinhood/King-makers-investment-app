'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import Logo from '@/components/svg';
import { setUser, isAuthenticated } from '@/utils/auth';

declare global {
  interface Window {
    phoneEmailListener?: (userObj: any) => void;
  }
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    occupation: '',
    upiId: '',
    referral: '',
    password: '',
    confirmPassword: '',
  });

  const [isGovtEmployee, setIsGovtEmployee] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const handlePhoneVerification = async (userJsonUrl: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://king-makers-mongo-api.vercel.app/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_json_url: userJsonUrl }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to verify phone');
      }

      const data = await response.json();
      setIsPhoneVerified(true);
      setShowOtpDialog(false);
      setError('');

      setFormData(prev => ({
        ...prev,
        phone: data.user.phoneNumber
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify phone');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.phoneEmailListener = function (userObj) {
      if (userObj && userObj.user_json_url) {
        handlePhoneVerification(userObj.user_json_url);
      }
    };

    return () => {
      delete window.phoneEmailListener;
    };
  }, []);

  useEffect(() => {
    if (showOtpDialog) {
      setTimeout(() => {
        const container = document.querySelector('.pe_signin_button');
        if (container && !container.querySelector('script')) {
          const script = document.createElement('script');
          script.src = "https://www.phone.email/sign_in_button_v1.js";
          script.async = true;
          container.appendChild(script);
        }
      }, 100);
    }
  }, [showOtpDialog, formData.phone]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerifyPhone = () => {
    setError('');

    // Validate phone number
    if (formData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // Open Phone.email OTP dialog
    setShowOtpDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPhoneVerified) {
      setError('Please verify your phone number first');
      return;
    }

    // Validate password
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // Submit signup form to backend
      const response = await fetch('https://king-makers-mongo-api.vercel.app/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phnumber: formData.phone,
          name: formData.name,
          password: formData.password,
          dateofbirth: formData.dob,
          gender: formData.gender,
          occupation: formData.occupation,
          upi_id: formData.upiId,
          given_referral_code: formData.referral || 'None',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Signup failed');
      }

      const data = await response.json();
      // Store user data using auth utility
      setUser(data.user);
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
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

          <div className="relative">
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
              disabled={isPhoneVerified}
            />
            <button
              type="button"
              onClick={handleVerifyPhone}
              disabled={isLoading || formData.phone.length !== 10 || isPhoneVerified}
              className={`absolute right-2 top-[34px] px-3 py-1.5 text-sm rounded-md font-medium transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed ${isPhoneVerified
                  ? 'bg-green-600 text-white cursor-default'
                  : 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:opacity-50'
                }`}
            >
              {isLoading ? 'Sending...' : isPhoneVerified ? 'Verified ✓' : 'Verify'}
            </button>
          </div>

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

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password (min 6 characters)"
            required
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
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
          {error && !showOtpDialog && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
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
      {showOtpDialog && (
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
                Verify your phone number to continue<br />
                <span className="font-semibold text-gray-800">+91 {formData.phone}</span>
              </p>

              {/* Phone.email Widget */}
              <div className="mb-6 flex justify-center">
                <div
                  className="pe_signin_button"
                  data-client-id="11364250759952084234"
                  data-phone-number={`+91${formData.phone}`}
                ></div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}

              {/* Cancel Button */}
              <button
                onClick={() => {
                  setShowOtpDialog(false);
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
