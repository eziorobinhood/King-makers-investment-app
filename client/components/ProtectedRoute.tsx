'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/'];

  useEffect(() => {
    const checkAuth = async () => {
      // Normalize pathname by removing trailing slash for comparison
      const normalizedPath = pathname.endsWith('/') && pathname !== '/'
        ? pathname.slice(0, -1)
        : pathname;

      // If we're on a public route, allow access
      if (publicRoutes.includes(normalizedPath)) {
        setIsChecking(false);
        return;
      }

      // For protected routes, check if user is authenticated
      if (!isAuthenticated()) {
        router.push('/login');
        // Don't set isChecking to false here since we're redirecting
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
