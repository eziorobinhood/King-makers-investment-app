'use client';

import { useState } from 'react';

export default function InvestmentPage() {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUpiId, setSelectedUpiId] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');

    const upiIds = [
        'kingmakers0-0@axl',
        'kingmakers0-0@ibl',
        'kingmakers0-0@ybl',
        'kingmakers1-0@axl',
        'kingmakers1-0@ibl',
        'kingmakers1-0@ybl',
        'kingmakers1-2@axl',
        'kingmakers1-2@ibl',
        'kingmakers1-2@ybl',
    ];

    const getRandomUpiId = () => {
        const randomIndex = Math.floor(Math.random() * upiIds.length);
        return upiIds[randomIndex];
    };

    const generateUpiQrUrl = (upiId: string, amount: string) => {
        const amountNum = amount.replace(/,/g, '');
        const upiLink = `upi://pay?pa=${upiId}&am=${amountNum}&cu=INR`;
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
    };
    const investments = [
        {
            multiplier: '2X',
            amount: '10,000',
            time: 'Within 100 days',
            buttonText: 'PAY',
            buttonAction: 'pay',
            gradient: 'from-blue-500 to-cyan-500',
            icon: '💎',
            bgGradient: 'from-blue-50 to-cyan-50',
        },
        {
            multiplier: '3X',
            amount: '20,000',
            time: 'Within 100 days',
            buttonText: 'LOCK',
            buttonAction: 'lock',
            gradient: 'from-purple-500 to-pink-500',
            icon: '⭐',
            bgGradient: 'from-purple-50 to-pink-50',
        },
        {
            multiplier: '4X',
            amount: '60,000',
            time: 'Within 100 days',
            buttonText: 'LOCK',
            buttonAction: 'lock',
            gradient: 'from-orange-500 to-red-500',
            icon: '👑',
            bgGradient: 'from-orange-50 to-red-50',
        },
    ];

    const handleAction = (action: string, multiplier: string, amount: string) => {
        if (action === 'pay') {
            const randomUpi = getRandomUpiId();
            setSelectedUpiId(randomUpi);
            setSelectedAmount(amount);
            setShowDialog(true);
        } else {
            console.log(`${action} clicked for ${multiplier} investment`);
        }
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
                <div className="text-center mb-16">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 uppercase mb-4 tracking-tight">
                        INVEST
                    </h1>
                </div>

                {/* Investment Cards */}
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto mb-12">
                    {investments.map((investment, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl shadow-xl border border-gray-200/50 w-full max-w-sm mx-auto lg:mx-0 flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Gradient accent bar */}
                            <div className={`h-2 bg-gradient-to-r ${investment.gradient}`}></div>

                            {/* Card Content */}
                            <div className={`p-8 flex flex-col flex-grow text-center bg-gradient-to-br ${investment.bgGradient}`}>
                                {/* Icon and Multiplier */}
                                <div className="mb-6">
                                    <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                        {investment.icon}
                                    </div>
                                    <h2 className={`text-6xl font-black bg-gradient-to-r ${investment.gradient} bg-clip-text text-transparent`}>
                                        {investment.multiplier}
                                    </h2>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-300/50 my-6"></div>

                                {/* Investment Details */}
                                <div className="space-y-4 mb-8">
                                    <div className="bg-white/60 rounded-lg p-4 border border-gray-200/50">
                                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Invest</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ₹{investment.amount} only
                                        </p>
                                    </div>
                                    <div className="bg-white/60 rounded-lg p-4 border border-gray-200/50">
                                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Time</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {investment.time}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleAction(investment.buttonAction, investment.multiplier, investment.amount)}
                                    className={`mt-auto w-full bg-gradient-to-r ${investment.gradient} hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl uppercase transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95`}
                                >
                                    {investment.buttonText}
                                </button>
                            </div>

                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comments Section */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                        {/* Comments Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800 text-center flex items-center justify-center gap-3">
                                <span>💬</span>
                                Comments
                            </h2>
                        </div>

                        {/* Comments Content */}
                        <div className="p-8">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        U
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        A
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-4/5 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        R
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Add Comment Input */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        +
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center px-4 text-gray-400">
                                            Write a comment...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* UPI Payment Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
                        {/* Dialog Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
                            <h3 className="text-xl font-bold text-white text-center">
                                Pay with UPI
                            </h3>
                        </div>

                        {/* Dialog Content */}
                        <div className="p-6 text-center">
                            {/* QR Code */}
                            <div className="mb-6">
                                <div className="inline-block p-3 bg-white rounded-xl shadow-lg border border-gray-200">
                                    <img
                                        src={generateUpiQrUrl(selectedUpiId, selectedAmount)}
                                        alt="UPI QR Code"
                                        className="w-48 h-48"
                                    />
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Amount to Pay</p>
                                <p className="text-3xl font-bold text-gray-800">₹{selectedAmount}</p>
                            </div>

                            {/* UPI ID */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 mb-1">UPI ID</p>
                                <div className="bg-gray-100 rounded-lg px-4 py-2 inline-block">
                                    <p className="text-lg font-semibold text-gray-800">{selectedUpiId}</p>
                                </div>
                            </div>

                            {/* Instructions */}
                            <p className="text-sm text-gray-500 mb-6">
                                Scan the QR code with any UPI app to complete payment
                            </p>

                            {/* Close Button */}
                            <button
                                onClick={() => setShowDialog(false)}
                                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

