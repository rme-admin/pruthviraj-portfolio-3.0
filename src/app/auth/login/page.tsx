"use client"; // This page requires client-side interactivity

// --- 1. Import necessary hooks and utilities ---
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api'; // Import our reusable API client
import Cookies from 'js-cookie'; 

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  // --- 2. Set up state management and routing ---
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- 3. Create the function to handle form submission ---
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevent the default browser form submission
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiClient('/api/admin/login', 'POST', { email, password });

      if (data.token) {
        // --- 2. SET THE TOKEN IN BOTH PLACES ---
        
        // a) For client-side API calls (like delete buttons)
        localStorage.setItem('authToken', data.token);

        // b) For server-side rendering (like loading this page)
        // This cookie will be sent with every subsequent request to the server.
        Cookies.set('authToken', data.token, { 
          expires: 1/3, // Expires in 8 hours (1/3 of a day)
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        });
        
        // --- 3. REDIRECT ---
        router.push('/admin/projects'); // Redirect to the projects page
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2">
          <Rocket className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold">Portfolio Pilot</span>
        </Link>
      </div>
      <Card className="w-full max-w-sm">
        {/* --- 4. Wrap the content in a form and attach the handler --- */}
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* --- 5. Display the error message if it exists --- */}
            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              {/* --- 6. Make inputs "controlled" by linking them to state --- */}
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            {/* --- 7. Change the Button to a submit button and manage its state --- */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}