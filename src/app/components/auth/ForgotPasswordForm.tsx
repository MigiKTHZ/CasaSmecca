// components/auth/ForgotPasswordForm.tsx - ANGEPASST AN SITE DESIGN
'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Key, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        // Frontend Validation Only
        if (!email) {
            setError('Bitte geben Sie Ihre E-Mail Adresse ein');
            setIsLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Bitte geben Sie eine gültige E-Mail Adresse ein');
            setIsLoading(false);
            return;
        }

        // Simulate API call (frontend only)
        // setTimeout(() => {
        //     console.log('Sending reset email to:', email);
        //     setSuccess('Passwort-Reset Link wurde gesendet!');
        //     setIsLoading(false);
        //     setIsSubmitted(true);
        // }, 1500);

        fetch("/api/forgotpassword", {
            method: "POST",
            body: email,
            headers: {
                'Content-Type': 'text/plain', // Send it as plain text
            },
        });

        setIsLoading(false);
        setIsSubmitted(true);
    };

    const handleResetForm = () => {
        setIsSubmitted(false);
        setEmail('');
        setError('');
        setSuccess('');
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mb-6 shadow-sm">
                    <CheckCircle size={36} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">E-Mail wurde gesendet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Wir haben einen Passwort-Reset Link an{' '}
                    <span className="font-semibold text-gray-800">{email}</span> gesendet.
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        <strong>Tipp:</strong> Überprüfen Sie auch Ihren Spam-Ordner, falls die E-Mail nicht im Posteingang erscheint.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleResetForm}
                        className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <RefreshCw size={18} className="mr-2" />
                        Erneut versuchen
                    </button>

                    <Link
                        href="/signin"
                        className="inline-flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                        Zurück zur Anmeldung
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error and Success Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <AlertCircle size={20} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                    <CheckCircle size={20} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{success}</span>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-gradient-to-r from-lime-50 to-emerald-50 border border-lime-200 rounded-xl p-5">
                <div className="flex items-start">
                    <Key className="text-lime-600 mt-1 mr-3 flex-shrink-0" size={22} />
                    <div>
                        <h4 className="font-semibold text-lime-900 mb-1">Passwort vergessen?</h4>
                        <p className="text-sm text-gray-700">
                            Geben Sie Ihre E-Mail Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
                        </p>
                    </div>
                </div>
            </div>

            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail Adresse *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={20} className="text-gray-400" />
                    </div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                        placeholder="ihre.email@beispiel.ch"
                        required
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Die E-Mail muss mit Ihrem Konto verknüpft sein.
                </p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 disabled:from-lime-400 disabled:to-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Wird gesendet...
                    </>
                ) : (
                    <>
                        <Mail size={18} className="mr-2" />
                        Passwort-Reset Link senden
                    </>
                )}
            </button>

            {/* Security Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
                <p className="text-xs text-gray-600 text-center">
                    <strong>Sicherheitshinweis:</strong> Der Link ist nur für 24 Stunden gültig und kann nur einmal verwendet werden.
                </p>
            </div>
        </form>
    );
}