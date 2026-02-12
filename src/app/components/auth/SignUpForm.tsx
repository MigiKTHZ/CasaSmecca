// components/auth/SignUpForm.tsx - NUR FRONTEND
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, Check, Mail, Lock, User, Phone, MapPin, Home, Building } from 'lucide-react';
import Link from 'next/link';

export default function SignUpForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNr: '',
        address: '',
        addressNr: '',
        city: '',
        plz: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
        const password = e.target.value;
        setFormData({ ...formData, password });
        checkPasswordStrength(password);
    };

    // In der handleSubmit Funktion - KORRIGIERTE VERSION
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.firstname || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Bitte füllen Sie alle erforderlichen Felder aus');
        setIsLoading(false);
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setError('Passwörter stimmen nicht überein');
        setIsLoading(false);
        return;
    }

    if (passwordStrength < 3) {
        setError('Bitte wählen Sie ein stärkeres Passwort');
        setIsLoading(false);
        return;
    }

    if (!agreedToTerms) {
        setError('Sie müssen den Nutzungsbedingungen zustimmen');
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                firstname: formData.firstname,
                email: formData.email,
                password: formData.password,
                address: formData.address,
                addressNr: formData.addressNr,
                phoneNr: formData.phoneNr,
                plz: formData.plz,
                city: formData.city,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Registrierung fehlgeschlagen");
        }

        const data = await response.json();
        
        setSuccess("Registrierung erfolgreich!");
        
        // Reset form
        setFormData({
            name: '',
            firstname: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNr: '',
            address: '',
            addressNr: '',
            city: '',
            plz: ''
        });

        // Redirect to sign in page after 2 seconds
        setTimeout(() => {
            router.push('/signin?registered=true');
        }, 2000);

    } catch (error: unknown) {
        console.error('Registration error:', error);
        if (error instanceof Error) {
            setError("Registrierung fehlgeschlagen: " + error.message);
        } else {
            setError("Registrierung fehlgeschlagen: Ein unbekannter Fehler ist aufgetreten.");
        }
    } finally {
        setIsLoading(false);
    }
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

            <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Persönliche Daten</h3>
                
                {/* Name and Firstname Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nachname *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                placeholder="Muster"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                            Vorname *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="firstname"
                                value={formData.firstname}
                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                placeholder="Hans"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="mt-4">
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
                            placeholder="hans.muster@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Password Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Passwort *
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={20} className="text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={formData.password}
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
                    </div>

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
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
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
                        
                        <div className="mt-3 space-y-1">
                            <div className="flex items-center text-xs">
                                <Check size={12} className={`mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                                <span className={formData.password.length >= 8 ? 'text-gray-700' : 'text-gray-400'}>
                                    Mindestens 8 Zeichen
                                </span>
                            </div>
                            <div className="flex items-center text-xs">
                                <Check size={12} className={`mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                                <span className={/[A-Z]/.test(formData.password) ? 'text-gray-700' : 'text-gray-400'}>
                                    Mindestens ein Großbuchstabe
                                </span>
                            </div>
                            <div className="flex items-center text-xs">
                                <Check size={12} className={`mr-1 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                                <span className={/[0-9]/.test(formData.password) ? 'text-gray-700' : 'text-gray-400'}>
                                    Mindestens eine Zahl
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Lieferadresse</h3>
                
                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="phoneNr" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefonnummer
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={20} className="text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            id="phoneNr"
                            value={formData.phoneNr}
                            onChange={(e) => setFormData({ ...formData, phoneNr: e.target.value })}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                            placeholder="079-123-00-00"
                        />
                    </div>
                </div>

                {/* Address and Address Number Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                            Strasse
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                placeholder="Musterstrasse"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="addressNr" className="block text-sm font-medium text-gray-700 mb-2">
                            Hausnummer
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Home size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="addressNr"
                                value={formData.addressNr}
                                onChange={(e) => setFormData({ ...formData, addressNr: e.target.value })}
                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                placeholder="12a"
                            />
                        </div>
                    </div>
                </div>

                {/* City and PLZ Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                            Stadt
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="city"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                placeholder="Zürich"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="plz" className="block text-sm font-medium text-gray-700 mb-2">
                            PLZ
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPin size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="plz"
                                value={formData.plz}
                                onChange={(e) => setFormData({ ...formData, plz: e.target.value })}
                                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                placeholder="8000"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="h-4 w-4 text-lime-600 rounded border-gray-300 focus:ring-lime-500"
                        required
                    />
                </div>
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    Ich stimme den{' '}
                    <Link href="/terms" className="text-lime-600 hover:text-lime-700">
                        Allgemeinen Geschäftsbedingungen
                    </Link>{' '}
                    und der{' '}
                    <Link href="/privacy" className="text-lime-600 hover:text-lime-700">
                        Datenschutzerklärung
                    </Link>{' '}
                    zu
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-lime-600 hover:bg-lime-700 disabled:bg-lime-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
            >
                {isLoading ? 'Wird registriert...' : 'Jetzt registrieren'}
            </button>
        </form>
    );
}