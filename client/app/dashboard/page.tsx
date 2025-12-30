'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, User } from '@/utils/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = getUser();
    if (!userData) {
      router.push('/login');
      return;
    }

    setUser(userData);
    setLoading(false);
  }, [router]);

  const copyReferralCode = () => {
    if (user?.referral_code_generated) {
      navigator.clipboard.writeText(user.referral_code_generated);
      toast.success('Referral code copied to clipboard!', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600">
            Manage your investments and track your referrals
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Investment Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-sm font-medium text-gray-600 mb-2">
              Total Investment
            </h2>
            <p className="text-3xl font-bold text-gray-800">
              ₹{user.investedamount.toLocaleString()}
            </p>
          </div>

          {/* Referral Code Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-sm font-medium text-gray-600 mb-2">
              Your Referral Code
            </h2>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-gray-800">
                {user.referral_code_generated}
              </p>
              <button
                onClick={copyReferralCode}
                className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Account Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-base font-medium text-gray-800">
                {user.phnumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="text-base font-medium text-gray-800">
                {user.dateofbirth}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="text-base font-medium text-gray-800 capitalize">
                {user.gender}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Occupation</p>
              <p className="text-base font-medium text-gray-800">
                {user.occupation}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">UPI ID</p>
              <p className="text-base font-medium text-gray-800">
                {user.upi_id}
              </p>
            </div>
            {user.given_referral_code && user.given_referral_code !== 'None' && (
              <div>
                <p className="text-sm text-gray-600">Referred By</p>
                <p className="text-base font-medium text-gray-800">
                  {user.given_referral_code}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
