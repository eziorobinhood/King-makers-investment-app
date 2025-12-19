'use client';

export default function LoanOffersPage() {
    const loanOffers = [
        {
            amount: '10,000',
            monthlyInterest: '250',
            buttonText: 'AVAIL',
            buttonAction: 'avail',
            gradient: 'from-blue-500 to-cyan-500',
            icon: '💳',
            bgGradient: 'from-blue-50 to-cyan-50',
        },
        {
            amount: '25,000',
            monthlyInterest: '650',
            buttonText: 'LOCK',
            buttonAction: 'lock',
            gradient: 'from-purple-500 to-pink-500',
            icon: '💰',
            bgGradient: 'from-purple-50 to-pink-50',
        },
        {
            amount: '50,000',
            monthlyInterest: '1,250',
            buttonText: 'LOCK',
            buttonAction: 'lock',
            gradient: 'from-orange-500 to-red-500',
            icon: '🏦',
            bgGradient: 'from-orange-50 to-red-50',
        },
    ];

    const handleAction = (action: string, amount: string) => {
        // Handle loan action logic here
        console.log(`${action} clicked for ₹${amount} loan`);
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
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 uppercase mb-4 tracking-tight">
                        INSTANT LOAN
                    </h1>
                </div>

                {/* Loan Offer Cards */}
                <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
                    {loanOffers.map((offer, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl shadow-xl border border-gray-200/50 w-full max-w-sm mx-auto lg:mx-0 flex flex-col overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Gradient accent bar */}
                            <div className={`h-2 bg-gradient-to-r ${offer.gradient}`}></div>

                            {/* Card Content */}
                            <div className={`p-8 flex flex-col flex-grow text-center bg-gradient-to-br ${offer.bgGradient}`}>
                                {/* Icon */}
                                <div className="mb-6">
                                    <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                                        {offer.icon}
                                    </div>
                                </div>

                                {/* Loan Amount */}
                                <div className="mb-6">
                                    <h2 className={`text-5xl font-black bg-gradient-to-r ${offer.gradient} bg-clip-text text-transparent`}>
                                        ₹{offer.amount}
                                    </h2>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-300/50 my-6"></div>

                                {/* Monthly Interest */}
                                <div className="mb-8">
                                    <div className="bg-white/60 rounded-lg p-4 border border-gray-200/50">
                                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Monthly Interest</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ₹{offer.monthlyInterest}/- only
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleAction(offer.buttonAction, offer.amount)}
                                    className={`mt-auto w-full bg-gradient-to-r ${offer.gradient} hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl uppercase transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95`}
                                >
                                    {offer.buttonText}
                                </button>
                            </div>

                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

