'use client';

import { useState } from 'react';
import { X, Calendar, Check } from 'lucide-react';

interface AgeVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (method: string, data?: any) => void;
    minimumAge: number;
}

export default function AgeVerificationModal({
    isOpen,
    onClose,
    onVerify,
    minimumAge = 18
}: AgeVerificationModalProps) {
    const [selectedMethod, setSelectedMethod] = useState<'dob' | 'confirmation' | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [confirmationChecked, setConfirmationChecked] = useState(false);
    const [error, setError] = useState('');

    const handleDateOfBirthSubmit = () => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            // If birthday hasn't occurred this year
            age--;
        }

        if (age < minimumAge) {
            setError(`You must be at least ${minimumAge} years old to purchase alcohol.`);
            return;
        }

        onVerify('date_of_birth', { dateOfBirth, age });
    };

    const handleConfirmationSubmit = () => {
        if (!confirmationChecked) {
            setError('Please confirm that you are over the legal age.');
            return;
        }
        onVerify('confirmation');
    };

    const handleVerify = () => {
        setError('');

        if (selectedMethod === 'dob') {
            handleDateOfBirthSubmit();
        } else if (selectedMethod === 'confirmation') {
            handleConfirmationSubmit();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Age Verification Required</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-orange-600 text-2xl font-bold">{minimumAge}+</span>
                        </div>
                        <p className="text-gray-600 text-center mb-4">
                            Your cart contains alcohol. Please verify that you are at least {minimumAge} years old.
                        </p>
                    </div>

                    {/* Verification Methods */}
                    <div className="space-y-4 mb-6">
                        <div
                            onClick={() => setSelectedMethod('dob')}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedMethod === 'dob'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                        >
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <Calendar size={20} className="text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">Enter Date of Birth</div>
                                    <div className="text-sm text-gray-500">More secure verification</div>
                                </div>
                                {selectedMethod === 'dob' && (
                                    <Check size={20} className="text-green-600" />
                                )}
                            </div>

                            {selectedMethod === 'dob' && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            )}
                        </div>

                        <div
                            onClick={() => setSelectedMethod('confirmation')}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedMethod === 'confirmation'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                        >
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <Check size={20} className="text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">Confirm Age</div>
                                    <div className="text-sm text-gray-500">Simple checkbox confirmation</div>
                                </div>
                                {selectedMethod === 'confirmation' && (
                                    <Check size={20} className="text-green-600" />
                                )}
                            </div>

                            {selectedMethod === 'confirmation' && (
                                <div className="mt-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={confirmationChecked}
                                            onChange={(e) => setConfirmationChecked(e.target.checked)}
                                            className="mr-3 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">
                                            I confirm that I am at least {minimumAge} years old and of legal age to purchase alcohol.
                                        </span>
                                    </label>
                                    <p className="text-sm text-gray-500 mt-2 ml-8">
                                        By checking this box, you acknowledge that providing false information is illegal.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleVerify}
                            disabled={!selectedMethod || (selectedMethod === 'dob' && !dateOfBirth)}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-lime-600 to-emerald-600 text-white font-medium rounded-lg hover:from-lime-700 hover:to-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Verify Age
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                        Your age verification status will be securely stored for this purchase only.
                    </p>
                </div>
            </div>
        </div>
    );
}