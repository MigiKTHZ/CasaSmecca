// components/auth/ResetPasswordComponent.tsx - OHNE DUPLIZIERTES LAYOUT
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Check, AlertCircle, Eye, EyeOff, Key } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        if (!token) {
            setError("Token fehlt. Bitte verwenden Sie den Link aus der E-Mail.");
            return;
        }

        if (!password || !confirmPassword) {
            setError("Bitte füllen Sie beide Passwort-Felder aus");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwörter stimmen nicht überein");
            return;
        }

        if (passwordStrength < 3) {
            setError("Bitte wählen Sie ein stärkeres Passwort");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/resetpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token, newPassword: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Passwort-Reset fehlgeschlagen");
            }

            const data = await response.json();
            setSuccess("Passwort erfolgreich zurückgesetzt!");
            
            // Redirect to sign in page after 3 seconds
            setTimeout(() => {
                router.push('/signin?reset=success');
            }, 3000);

        } catch (error: unknown) {
            console.error("Reset password error:", error);
            if (error instanceof Error) {
                setError("Fehler: " + error.message);
            } else {
                setError("Ein unbekannter Fehler ist aufgetreten");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={32} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Ungültiger Link
                </h3>
                <p className="text-gray-600 mb-6">
                    Der Passwort-Reset Link ist ungültig oder abgelaufen.
                </p>
                <Link
                    href="/forgot-password"
                    className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    Neuen Link anfordern
                </Link>
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
                    <Check size={20} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{success}</span>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                    <Key className="text-blue-600 mr-3" size={20} />
                    <p className="text-sm text-blue-800">
                        <strong>Token erkannt:</strong> Sie können jetzt ein neues Passwort für Ihr Konto festlegen.
                    </p>
                </div>
            </div>

            {/* New Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Neues Passwort *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
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

                {/* Password Strength Indicator */}
                {password && (
                    <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Passwort-Stärke:</span>
                            <span className="text-xs font-medium">
                                {passwordStrength === 0 && 'Sehr schwach'}
                                {passwordStrength === 1 && 'Schwach'}
                                {passwordStrength === 2 && 'Mittel'}
                                {passwordStrength === 3 && 'Gut'}
                                {passwordStrength === 4 && 'Stark'}
                            </span>
                        </div>
                        <div className="flex space-x-1">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full ${
                                        i < passwordStrength
                                            ? passwordStrength <= 2
                                                ? 'bg-red-500'
                                                : passwordStrength === 3
                                                ? 'bg-yellow-500'
                                                : 'bg-green-500'
                                            : 'bg-gray-200'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Passwort bestätigen *
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                    </div>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                        placeholder="••••••••"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                        ) : (
                            <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                        )}
                    </button>
                </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2 text-sm">Passwort-Anforderungen:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                        <Check size={12} className={`mr-2 ${password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                        Mindestens 8 Zeichen
                    </li>
                    <li className="flex items-center">
                        <Check size={12} className={`mr-2 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                        Mindestens ein Großbuchstabe
                    </li>
                    <li className="flex items-center">
                        <Check size={12} className={`mr-2 ${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-300'}`} />
                        Mindestens eine Zahl
                    </li>
                </ul>
            </div>

            {/* Submit Button
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 disabled:from-emerald-400 disabled:to-cyan-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Wird verarbeitet...
                    </>
                ) : (
                    <>
                        <Key size={18} className="mr-2" />
                        Passwort zurücksetzen
                    </>
                )}
            </button> */}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-700 hover:to-emerald-700 disabled:from-lime-400 disabled:to-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Wird verarbeitet...
                    </>
                ) : (
                    <>
                        <Key size={18} className="mr-2" />
                        Passwort zurücksetzen
                    </>
                )}
            </button>

            {/* Security Note */}
            <div className="text-center pt-4">
                <p className="text-xs text-gray-500">
                    Der Token ist nur für 24 Stunden gültig und kann nur einmal verwendet werden.
                </p>
            </div>
        </form>
    );
}