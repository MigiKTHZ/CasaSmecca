// components/user/UserProfilePage.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import {
    ArrowLeft,
    User,
    Package,
    Edit,
    Save,
    X,
    LogOut,
    MapPin,
    Phone,
    Mail,
    Calendar,
    ShoppingBag,
    CreditCard,
    Truck,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react';

export default function UserProfilePage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [editForm, setEditForm] = useState({
        name: '',
        firstname: '',
        email: '',
        phoneNr: '',
        address: '',
        addressNr: '',
        city: '',
        plz: ''
    });

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            fetchUserData();
            fetchOrders();
        }
    }, [status, session]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`/api/user/profile`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setEditForm({
                    name: data.name || '',
                    firstname: data.firstname || '',
                    email: data.email || '',
                    phoneNr: data.phoneNr || '',
                    address: data.address || '',
                    addressNr: data.addressNr || '',
                    city: data.city || '',
                    plz: data.plz || ''
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`/api/user/orders`);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUserData(updatedData);
                setIsEditing(false);
                alert('Profil erfolgreich aktualisiert!');
            } else {
                alert('Fehler beim Speichern der Änderungen');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Fehler beim Speichern der Änderungen');
        }
    };

    const handleCancelEdit = () => {
        setEditForm({
            name: userData?.name || '',
            firstname: userData?.firstname || '',
            email: userData?.email || '',
            phoneNr: userData?.phoneNr || '',
            address: userData?.address || '',
            addressNr: userData?.addressNr || '',
            city: userData?.city || '',
            plz: userData?.plz || ''
        });
        setIsEditing(false);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-emerald-100 text-emerald-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-amber-100 text-amber-800';
            case 'pending':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <CheckCircle size={16} />;
            case 'shipped':
                return <Truck size={16} />;
            case 'processing':
                return <Clock size={16} />;
            case 'pending':
                return <Clock size={16} />;
            default:
                return <AlertCircle size={16} />;
        }
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lime-50 to-amber-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-600 mx-auto"></div>
                    <p className="mt-4 text-lime-700">Lädt...</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-lime-50 to-amber-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="text-red-600" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-lime-900 mb-4">Nicht angemeldet</h2>
                        <p className="text-gray-600 mb-6">
                            Bitte melden Sie sich an, um Ihr Profil zu sehen.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Zum Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gradient-to-b from-lime-50 to-amber-50 py-8 md:py-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb Navigation */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Zurück zum Shop
                        </Link>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-6xl mx-auto">
                        {/* Main Title */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-100 rounded-full mb-4">
                                <User className="text-lime-700" size={32} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-lime-900 mb-3">
                                Mein Profil
                            </h1>
                            <p className="text-lg text-lime-700">
                                Willkommen zurück, {userData?.firstname || 'Benutzer'}!
                            </p>
                        </div>

                        {/* Content Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                            {/* Decorative Border */}
                            <div className="h-2 bg-gradient-to-r from-lime-600 via-emerald-600 to-amber-600"></div>

                            <div className="p-6">
                                {/* Tab Navigation */}
                                <div className="flex border-b border-gray-200 mb-8">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`flex items-center px-6 py-3 font-semibold border-b-2 transition-colors ${activeTab === 'profile'
                                                ? 'border-lime-600 text-lime-700'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <User size={20} className="mr-2" />
                                        Profil
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('orders')}
                                        className={`flex items-center px-6 py-3 font-semibold border-b-2 transition-colors ${activeTab === 'orders'
                                                ? 'border-lime-600 text-lime-700'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <Package size={20} className="mr-2" />
                                        Meine Bestellungen
                                        {orders.length > 0 && (
                                            <span className="ml-2 bg-lime-100 text-lime-800 text-xs font-semibold px-2 py-1 rounded-full">
                                                {orders.length}
                                            </span>
                                        )}
                                    </button>
                                </div>

                                {/* Tab Content */}
                                {activeTab === 'profile' ? (
                                    <div className="p-4 md:p-6">
                                        {/* Profile Header */}
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <h2 className="text-2xl font-bold text-lime-900">
                                                    Persönliche Informationen
                                                </h2>
                                                <p className="text-gray-600">
                                                    Verwalten Sie Ihre Kontaktdaten und Adresse
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                {!isEditing ? (
                                                    <button
                                                        onClick={() => setIsEditing(true)}
                                                        className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                                    >
                                                        <Edit size={16} className="mr-2" />
                                                        Bearbeiten
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={handleSaveProfile}
                                                            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                                        >
                                                            <Save size={16} className="mr-2" />
                                                            Speichern
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                                                        >
                                                            <X size={16} className="mr-2" />
                                                            Abbrechen
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Profile Form/Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Personal Info */}
                                            <div className="bg-gray-50 rounded-xl p-6">
                                                <h3 className="text-lg font-semibold text-lime-900 mb-4 flex items-center">
                                                    <User className="text-lime-600 mr-2" size={20} />
                                                    Persönliche Daten
                                                </h3>

                                                {isEditing ? (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Vorname
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={editForm.firstname}
                                                                onChange={(e) => setEditForm({ ...editForm, firstname: e.target.value })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Nachname
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={editForm.name}
                                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                E-Mail
                                                            </label>
                                                            <input
                                                                type="email"
                                                                value={editForm.email}
                                                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Telefon
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                value={editForm.phoneNr}
                                                                onChange={(e) => setEditForm({ ...editForm, phoneNr: e.target.value })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Vorname</p>
                                                            <p className="font-medium text-gray-900">{userData?.firstname}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Nachname</p>
                                                            <p className="font-medium text-gray-900">{userData?.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">E-Mail</p>
                                                            <p className="font-medium text-gray-900 flex items-center">
                                                                <Mail size={16} className="mr-2 text-lime-600" />
                                                                {userData?.email}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Telefon</p>
                                                            <p className="font-medium text-gray-900 flex items-center">
                                                                <Phone size={16} className="mr-2 text-lime-600" />
                                                                {userData?.phoneNr || 'Nicht angegeben'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Address Info */}
                                            <div className="bg-gray-50 rounded-xl p-6">
                                                <h3 className="text-lg font-semibold text-lime-900 mb-4 flex items-center">
                                                    <MapPin className="text-lime-600 mr-2" size={20} />
                                                    Lieferadresse
                                                </h3>

                                                {isEditing ? (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Straße
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={editForm.address}
                                                                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Hausnummer
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={editForm.addressNr}
                                                                onChange={(e) => setEditForm({ ...editForm, addressNr: e.target.value })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    PLZ
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={editForm.plz}
                                                                    onChange={(e) => setEditForm({ ...editForm, plz: e.target.value })}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Stadt
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={editForm.city}
                                                                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Adresse</p>
                                                            <p className="font-medium text-gray-900">
                                                                {userData?.address} {userData?.addressNr}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">PLZ & Stadt</p>
                                                            <p className="font-medium text-gray-900">
                                                                {userData?.plz} {userData?.city}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Mitglied seit</p>
                                                            <p className="font-medium text-gray-900 flex items-center">
                                                                <Calendar size={16} className="mr-2 text-lime-600" />
                                                                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('de-CH') : 'N/A'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Account Actions */}
                                        <div className="mt-8 pt-8 border-t border-gray-200">
                                            <h3 className="text-lg font-semibold text-lime-900 mb-4">
                                                Kontoeinstellungen
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                <button
                                                    onClick={() => signOut({ callbackUrl: '/' })}
                                                    className="inline-flex items-center bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg border border-red-200 transition-colors"
                                                >
                                                    <LogOut size={16} className="mr-2" />
                                                    Abmelden
                                                </button>
                                                <Link
                                                    href="/change-password"
                                                    className="inline-flex items-center bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-colors"
                                                >
                                                    Passwort ändern
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 md:p-6">
                                        <h2 className="text-2xl font-bold text-lime-900 mb-6">
                                            Meine Bestellungen
                                        </h2>

                                        {orders.length === 0 ? (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <ShoppingBag className="text-gray-400" size={32} />
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                                    Noch keine Bestellungen
                                                </h3>
                                                <p className="text-gray-500 mb-6">
                                                    Sie haben bisher noch keine Bestellungen getätigt.
                                                </p>
                                                <Link
                                                    href="/shop"
                                                    className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                                >
                                                    <ShoppingBag size={16} className="mr-2" />
                                                    Jetzt einkaufen
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {orders.map((order) => (
                                                    <div key={order.orderID} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                                        {/* Order Header */}
                                                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900">
                                                                        Bestellung #{order.orderID}
                                                                    </h4>
                                                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                                                        <Calendar size={14} className="mr-1" />
                                                                        {new Date(order.createdAt).toLocaleDateString('de-CH', {
                                                                            day: '2-digit',
                                                                            month: '2-digit',
                                                                            year: 'numeric',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-4 mt-2 md:mt-0">
                                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                                        {getStatusIcon(order.status)}
                                                                        <span className="ml-2 capitalize">{order.status}</span>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-lg font-bold text-lime-700">
                                                                            CHF {parseFloat(order.totalAmount).toFixed(2)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Order Items */}
                                                        <div className="p-6">
                                                            <div className="mb-4">
                                                                <h5 className="font-semibold text-gray-700 mb-2">Produkte:</h5>
                                                                <div className="space-y-3">
                                                                    {order.productOrders?.map((productOrder: any) => (
                                                                        <div key={productOrder.productOrderID} className="flex items-center justify-between py-2">
                                                                            <div className="flex items-center">
                                                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                                                                    <ShoppingBag size={16} className="text-gray-500" />
                                                                                </div>
                                                                                <div>
                                                                                    <p className="font-medium text-gray-900">
                                                                                        {productOrder.product?.name || 'Produkt'}
                                                                                    </p>
                                                                                    <p className="text-sm text-gray-500">
                                                                                        Menge: {productOrder.quantity}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <p className="font-semibold text-gray-900">
                                                                                    CHF {(parseFloat(productOrder.priceAtPurchase) * productOrder.quantity).toFixed(2)}
                                                                                </p>
                                                                                <p className="text-sm text-gray-500">
                                                                                    CHF {parseFloat(productOrder.priceAtPurchase).toFixed(2)}/Stk
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Order Details */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                                                <div>
                                                                    <h6 className="font-semibold text-gray-700 mb-2 flex items-center">
                                                                        <MapPin size={16} className="mr-2 text-lime-600" />
                                                                        Lieferadresse
                                                                    </h6>
                                                                    <p className="text-sm text-gray-600">
                                                                        {order.firstname} {order.name}<br />
                                                                        {order.adress} {order.adressNr}<br />
                                                                        {order.plz} {order.city}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <h6 className="font-semibold text-gray-700 mb-2 flex items-center">
                                                                        <CreditCard size={16} className="mr-2 text-lime-600" />
                                                                        Kontakt
                                                                    </h6>
                                                                    <p className="text-sm text-gray-600">
                                                                        {order.email}<br />
                                                                        {order.phoneNr}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-8 text-center">
                            <Link
                                href="/shop"
                                className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors mr-4"
                            >
                                <ShoppingBag size={20} className="mr-2" />
                                Weiter einkaufen
                            </Link>
                            <Link
                                href="/support"
                                className="inline-flex items-center bg-white hover:bg-gray-50 text-lime-700 font-semibold py-3 px-8 rounded-lg border border-lime-300 transition-colors"
                            >
                                Hilfe & Support
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}