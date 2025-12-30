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
    const checkAuth = () => {
      // If we're on a public route, allow access
      if (publicRoutes.includes(pathname)) {
        setIsChecking(false);
        return;
      }

      // For protected routes, check if user is authenticated
      if (!isAuthenticated()) {
        router.push('/login');
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
