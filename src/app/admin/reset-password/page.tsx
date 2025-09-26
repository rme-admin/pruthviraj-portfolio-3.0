'use client'; // This MUST be the very first line

import React, { useState, FormEvent } from 'react';
import { apiClient } from '@/lib/api'; // Make sure to import your API client
import { useAuth } from '@/hooks/useAuth'; // Protect the page
export const dynamic = 'force-dynamic';


const ResetPasswordPage = () => {
    useAuth(); // Ensure the user is logged in to access this page

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Added for confirmation
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Note: We don't need an email field, as the logged-in user's email
    // will be determined securely from their auth token on the backend.

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Basic client-side validation
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }

        setIsLoading(true);
        
        try {
            // The API doesn't need the email since it's derived from the token,
            // but your current API requires it, so we'll send a placeholder.
            // A better API would not require the email in the body.
            const res = await apiClient('/api/admin/passreset', 'POST', {
                email: 'placeholder@example.com', // This should be ignored by a secure backend
                oldPassword,
                newPassword,
            });
            
            setSuccess(res.message);
            // Clear fields on success
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (err: any) {
            setError(err.message || 'Failed to reset password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Old Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">New Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Confirm New Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
                {error && <div className="mt-2 text-center text-sm text-red-600">{error}</div>}
                {success && <div className="mt-2 text-center text-sm text-green-600">{success}</div>}
            </form>
        </div>
    );
};

export default ResetPasswordPage;  