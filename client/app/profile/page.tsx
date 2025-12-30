'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser, User } from '@/utils/auth';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userData = getUser();
        if (!userData) {
            router.push('/login');
            return;
        }
        setUser(userData);
    }, [router]);

    const profileData = [
        {
            label: 'Fund Balance',
            value: '₹0.00',
            icon: '💰',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            label: 'Bonus Balance',
            value: '₹0.00',
            icon: '🎁',
            color: 'from-purple-500 to-pink-500',
        },
        {
            label: 'Invested Amount',
            value: `₹${user?.investedamount.toLocaleString('en-IN') || '0.00'}`,
            icon: '💵',
            color: 'from-green-500 to-emerald-500',
        },
        {
            label: 'Profit / Loss',
            value: '₹0.00',
            icon: '📊',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const quickLinks = {
        left: [
            { name: 'Withdrawal', icon: '💸' },
            { name: 'Bank Details', icon: '🏦' },
            { name: 'Reset Password', icon: '🔒' },
            { name: 'Refer', icon: '👥' },
        ],
        right: [
            { name: 'About Us', icon: 'ℹ️' },
            { name: 'Telegram Link', icon: '📱' },
            { name: 'Customer Support', icon: '💬' },
        ],
    };

    const handleLinkClick = (linkName: string) => {
        // Handle quick link navigation
        console.log(`Clicked: ${linkName}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-slate-100 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gray-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 pt-24 pb-12 relative z-10">
                {/* Main Title */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 uppercase mb-4 tracking-tight">
                        PROFILE
                    </h1>
                </div>

                {/* Profile Data Cards */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profileData.map((data, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-xl shadow-lg border border-gray-200/50 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                {/* Gradient accent bar */}
                                <div className={`h-1 bg-gradient-to-r ${data.color} rounded-t-xl absolute top-0 left-0 right-0`}></div>

                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">
                                            {data.label}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {data.value}
                                        </p>
                                    </div>
                                    <div className="text-4xl ml-4">
                                        {data.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase tracking-tight">
                            QUICK LINKS
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {quickLinks.left.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleLinkClick(link.name)}
                                    className="w-full bg-white rounded-xl shadow-lg border border-gray-200/50 p-6 text-left flex items-center justify-between group hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl">{link.icon}</span>
                                        <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                                            {link.name}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                        →
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {quickLinks.right.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleLinkClick(link.name)}
                                    className="w-full bg-white rounded-xl shadow-lg border border-gray-200/50 p-6 text-left flex items-center justify-between group hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl">{link.icon}</span>
                                        <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                                            {link.name}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                        →
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

