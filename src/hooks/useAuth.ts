"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This check only runs in the browser
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      // If no token is found, redirect to the login page
      router.replace('/auth/login');
    } else {
      // If token exists, we can stop loading
      setIsLoading(false);
    }
  }, [router]);

  return { isLoading };
}