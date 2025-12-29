'use client';

export default function ToolPage() {
    const contests = [
        {
            prize: '₹1000/-',
            type: 'Daily Contest',
            ticketPrice: '₹100',
            ticketCount: '10 Tickets',
            lastDate: 'DD/MM/YYYY',
            gradient: 'from-blue-500 to-cyan-500',
            icon: '🎯',
        },
        {
            prize: '₹25000/-',
            type: 'Weekly Contest',
            ticketPrice: '₹250',
            ticketCount: '100 Tickets',
            lastDate: 'DD/MM/YYYY',
            gradient: 'from-purple-500 to-pink-500',
            icon: '⭐',
        },
        {
            prize: '₹50000/-',
            type: 'Monthly Contest',
            ticketPrice: '₹500',
            ticketCount: '100 Tickets',
            lastDate: 'DD/MM/YYYY',
            gradient: 'from-orange-500 to-red-500',
            icon: '🏆',
        },
    ];

    const handleSelect = (contestType: string) => {
        // Handle contest selection logic here
        console.log(`Selected ${contestType}`);
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
                    <div className="inline-block mb-4">
                        <span className="text-6xl mb-2 block">🎲</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 uppercase mb-4 tracking-tight">
                        Lucky Draw Contest
                    </h1>
                    <p className="text-xl text-gray-600 font-light">
                        Choose your contest and win big!
                    </p>
                </div>

                {/* Contest Cards */}
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-7xl mx-auto">
                    {contests.map((contest, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl shadow-xl border border-gray-200/50 w-full max-w-sm mx-auto lg:mx-0 flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Gradient accent bar */}
                            <div className={`h-2 bg-gradient-to-r ${contest.gradient}`}></div>

                            {/* Card Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                {/* Icon and Contest Type */}
                                <div className="text-center mb-6">
                                    <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                        {contest.icon}
                                    </div>
                                    <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full">
                                        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                            {contest.type}
                                        </p>
                                    </div>
                                </div>

                                {/* Prize - Highlighted */}
                                <div className="text-center mb-6">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Prize Pool</p>
                                    <h2 className={`text-4xl font-black bg-gradient-to-r ${contest.gradient} bg-clip-text text-transparent`}>
                                        Win {contest.prize}
                                    </h2>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-200 my-6"></div>

                                {/* Ticket Details */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-600">Ticket Price</span>
                                        <span className="text-lg font-bold text-gray-900">{contest.ticketPrice}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-600">Available</span>
                                        <span className="text-lg font-bold text-gray-900">{contest.ticketCount}</span>
                                    </div>
                                </div>

                                {/* Last Date */}
                                <div className="text-center mb-6 p-3 bg-amber-50 rounded-lg border border-amber-200">
                                    <p className="text-xs text-amber-700 font-medium mb-1">Last Date</p>
                                    <p className="text-sm font-semibold text-amber-900">
                                        {contest.lastDate}
                                    </p>
                                </div>

                                {/* Select Button */}
                                <button
                                    onClick={() => handleSelect(contest.type)}
                                    className={`mt-auto w-full bg-gradient-to-r ${contest.gradient} text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95`}
                                >
                                    Opens Soon
                                </button>
                            </div>

                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Winner Card Section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-2xl shadow-2xl border-2 border-amber-200/50 overflow-hidden">
                        {/* Winner Header */}
                        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 px-8 py-4">
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-3xl">🏆</span>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                                    Recent Winner
                                </h2>
                                <span className="text-3xl">🏆</span>
                            </div>
                        </div>

                        {/* Winner Content */}
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {/* Winner Avatar/Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                        <span className="text-5xl">👤</span>
                                    </div>
                                </div>

                                {/* Winner Details */}
                                <div className="flex-grow text-center md:text-left">
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 uppercase tracking-wider mb-1">Winner Name</p>
                                        <h3 className="text-3xl font-bold text-gray-800">SHIVA</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white/60 rounded-lg p-4 border border-amber-200/50">
                                            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Contest Type</p>
                                            <p className="text-lg font-semibold text-gray-800">Weekly Contest</p>
                                        </div>
                                        <div className="bg-white/60 rounded-lg p-4 border border-amber-200/50">
                                            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Prize Won</p>
                                            <p className="text-lg font-semibold text-green-600">₹25,000/-</p>
                                        </div>
                                        <div className="bg-white/60 rounded-lg p-4 border border-amber-200/50">
                                            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Ticket Number</p>
                                            <p className="text-lg font-semibold text-gray-800">#W-0042</p>
                                        </div>
                                        <div className="bg-white/60 rounded-lg p-4 border border-amber-200/50">
                                            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Won On</p>
                                            <p className="text-lg font-semibold text-gray-800">15/12/2024</p>
                                        </div>
                                    </div>

                                    {/* Congratulations Message */}
                                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border border-green-200">
                                        <p className="text-sm font-medium text-green-800">
                                            🎉 Congratulations! Winner selected through transparent lucky draw process.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

