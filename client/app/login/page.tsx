'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import Logo from '@/components/svg';
import { setUser, isAuthenticated } from '@/utils/auth';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone number
    if (formData.phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (!formData.password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phnumber: formData.phone,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }

      const data = await response.json();
      // Store user data using auth utility
      setUser(data.user);
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md px-6 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Login Heading */}
        <h1 className="text-xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
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

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-gray-800 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
