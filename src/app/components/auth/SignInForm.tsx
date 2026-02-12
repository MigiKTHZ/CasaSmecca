// components/auth/SignInForm.tsx - ANGEPASST AN SITE DESIGN
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { signIn } from "next-auth/react"


export default function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        // Frontend Validation Only
        if (!formData.email || !formData.password) {
            setError('Bitte füllen Sie alle Felder aus');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Passwort muss mindestens 8 Zeichen lang sein');
            setIsLoading(false);
            return;
        }


        signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: true,
            callbackUrl: "/"
        });
        // Simulate API call (frontend only)
        // setTimeout(() => {
        //     console.log('Signing in with:', formData);
        //     setSuccess("Anmeldung erfolgreich!");
        //     setIsLoading(false);

        //     // Optional: Redirect after success
        //     // setTimeout(() => {
        //     //     router.push('/');
        //     // }, 1500);
        // }, 1500);
    };

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
                    <Check size={20} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{success}</span>
                </div>
            )}

            {/* Email */}
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                        placeholder="ihre.email@beispiel.ch"
                        required
                    />
                </div>
            </div>

            {/* Password */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Passwort *
                    </label>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-lime-600 hover:text-lime-700 transition-colors font-medium"
                    >
                        Passwort vergessen?
                    </Link>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                        placeholder="••••••••"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showPassword ? (
                            <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                        ) : (
                            <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                        )}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Mindestens 8 Zeichen
                </p>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-lime-600 rounded border-gray-300 focus:ring-lime-500"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                        Angemeldet bleiben
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lime-600 hover:bg-lime-700 disabled:bg-lime-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
                {isLoading ? 'Wird angemeldet...' : 'Jetzt anmelden'}
            </button>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500">Oder mit</span>
                </div>
            </div>

            {/* Social Login Buttons - Optional */}
            <div className="grid grid-cols-1 gap-3">
                <button
                    type="button"
                    onClick={() => console.log('Google login')}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span className="text-gray-700 font-medium">Mit Google fortfahren</span>
                </button>
                
                {/* Optional: Apple Login
                <button
                    type="button"
                    onClick={() => console.log('Apple login')}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white"
                >
                    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.76 3.28-.76 2 .76 3.3.73 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.04z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">Mit Apple fortfahren</span>
                </button>
                */}
            </div>
        </form>
    );
}