'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Don't show header on login page
  if (pathname === '/login') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling down, hide when scrolling up
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Scrolling down - hide header
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 py-4 px-6 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="flex justify-end items-center gap-8">
        <Link 
          href="/tools" 
          className="text-gray-700 font-sans hover:text-gray-900 transition-colors font-medium"
        >
          Tools
        </Link>
        <Link 
          href="/loan-offers" 
          className="text-gray-700 font-sans hover:text-gray-900 transition-colors font-medium"
        >
          Loan Offers
        </Link>
        <Link 
          href="/investment" 
          className="text-gray-700 font-sans hover:text-gray-900 transition-colors font-medium"
        >
          Investment
        </Link>
        <Link 
          href="/profile" 
          className="text-gray-700 font-sans hover:text-gray-900 transition-colors font-medium"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}

