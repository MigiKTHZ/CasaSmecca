// components/admin/AdminPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import {
    ArrowLeft,
    Package,
    Tag,
    Plus,
    Edit,
    Trash2,
    Save,
    X,
    Upload,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Filter,
    Search,
    BarChart3,
    Users,
    ShoppingBag,
    Settings
} from 'lucide-react';

interface Product {
    productID: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryID: number;
    weight?: string;
    volume?: string;
    packaging?: string;
    fullWidth: boolean;
    specialType?: string | null;
    slug: string;
    category?: ProductCategory;
}

interface ProductCategory {
    categoryID: number;
    name: string;
    image: string;
    slug: string;
    products: Product[];
}

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState<'categories' | 'products'>('products');
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Form states
    const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [newCategory, setNewCategory] = useState({
        name: '',
        image: '',
        slug: ''
    });
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 100,
        image: '',
        categoryID: 0,
        weight: '',
        volume: '',
        packaging: '',
        fullWidth: false,
        specialType: '',
        slug: ''
    });
    const [isUploading, setIsUploading] = useState(false);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchData();
        }
    }, [status]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [categoriesRes, productsRes] = await Promise.all([
                fetch('/api/admin/categories'),
                fetch('/api/admin/products')
            ]);

            if (!categoriesRes.ok || !productsRes.ok) {
                throw new Error('Fehler beim Laden der Daten');
            }

            const categoriesData = await categoriesRes.json();
            const productsData = await productsRes.json();

            setCategories(categoriesData);
            setProducts(productsData);
        } catch (err) {
            setError('Fehler beim Laden der Daten');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Überprüfe Admin-Rechte
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            checkAdminStatus();
        }
    }, [status, session]);

    const checkAdminStatus = async () => {
        try {
            const response = await fetch('/api/admin/check');
            const data = await response.json();

            if (!data.isAdmin) {
                window.location.href = '/';
            }
        } catch (err) {
            console.error('Error checking admin status:', err);
            window.location.href = '/';
        }
    };

    const handleSaveCategory = async () => {
        if (!editingCategory) return;

        try {
            const response = await fetch(`/api/admin/categories/${editingCategory.categoryID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingCategory)
            });

            if (response.ok) {
                await fetchData();
                setEditingCategory(null);
            }
        } catch (err) {
            console.error('Error updating category:', err);
        }
    };

    const handleSaveProduct = async () => {
        if (!editingProduct) return;

        try {
            const response = await fetch(`/api/admin/products/${editingProduct.productID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProduct)
            });

            if (response.ok) {
                await fetchData();
                setEditingProduct(null);
            }
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    const handleCreateCategory = async () => {
        try {
            const response = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory)
            });

            if (response.ok) {
                await fetchData();
                setNewCategory({ name: '', image: '', slug: '' });
            }
        } catch (err) {
            console.error('Error creating category:', err);
        }
    };

    const handleCreateProduct = async () => {
        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });

            if (response.ok) {
                await fetchData();
                setNewProduct({
                    name: '',
                    description: '',
                    price: 0,
                    stock: 100,
                    image: '',
                    categoryID: categories[0]?.categoryID || 0,
                    weight: '',
                    volume: '',
                    packaging: '',
                    fullWidth: false,
                    specialType: '',
                    slug: ''
                });
            }
        } catch (err) {
            console.error('Error creating product:', err);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm('Kategorie wirklich löschen? Alle enthaltenen Produkte werden ebenfalls gelöscht!')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/categories/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await fetchData();
            }
        } catch (err) {
            console.error('Error deleting category:', err);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        if (!confirm('Produkt wirklich löschen?')) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await fetchData();
            }
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    const handleImageUpload = async (file: File, type: 'category' | 'product') => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.url;

                if (type === 'category' && editingCategory) {
                    setEditingCategory({ ...editingCategory, image: imageUrl });
                } else if (type === 'product' && editingProduct) {
                    setEditingProduct({ ...editingProduct, image: imageUrl });
                }
            }
        } catch (err) {
            console.error('Error uploading image:', err);
        } finally {
            setIsUploading(false);
        }
    };

    // Filtered data
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.categoryID === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleCategoryExpansion = (categoryID: number) => {
        setExpandedCategory(expandedCategory === categoryID ? null : categoryID);
    };

    if (status === 'loading' || loading) {
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
                        <h2 className="text-2xl font-bold text-lime-900 mb-4">Zugriff verweigert</h2>
                        <p className="text-gray-600 mb-6">
                            Sie müssen als Administrator angemeldet sein, um diese Seite zu sehen.
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
            <main className="flex-grow bg-gradient-to-b from-lime-50 to-amber-50 py-8">
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
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mr-4">
                                            <Settings className="text-lime-700" size={24} />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold text-lime-900">Admin Dashboard</h1>
                                            <p className="text-gray-600">Verwalten Sie Produkte und Kategorien</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">{session?.user?.name || 'Admin'}</p>
                                        <p className="text-sm text-gray-500">Administrator</p>
                                    </div>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="inline-flex items-center bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg border border-red-200 transition-colors"
                                    >
                                        Abmelden
                                    </button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                                <div className="bg-lime-50 rounded-xl p-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center mr-3">
                                            <Package className="text-lime-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-lime-900">{products.length}</p>
                                            <p className="text-sm text-gray-600">Produkte</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-emerald-50 rounded-xl p-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                                            <Tag className="text-emerald-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-emerald-900">{categories.length}</p>
                                            <p className="text-sm text-gray-600">Kategorien</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-amber-50 rounded-xl p-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                                            <ShoppingBag className="text-amber-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-amber-900">0</p>
                                            <p className="text-sm text-gray-600">Bestellungen</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                            <Users className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-blue-900">0</p>
                                            <p className="text-sm text-gray-600">Kunden</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Tabs */}
                            <div className="border-b border-gray-200">
                                <div className="flex">
                                    <button
                                        onClick={() => setActiveTab('products')}
                                        className={`flex items-center px-6 py-4 font-semibold border-b-2 transition-colors ${activeTab === 'products'
                                                ? 'border-lime-600 text-lime-700'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <Package size={20} className="mr-2" />
                                        Produkte
                                        <span className="ml-2 bg-lime-100 text-lime-800 text-xs font-semibold px-2 py-1 rounded-full">
                                            {products.length}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('categories')}
                                        className={`flex items-center px-6 py-4 font-semibold border-b-2 transition-colors ${activeTab === 'categories'
                                                ? 'border-lime-600 text-lime-700'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        <Tag size={20} className="mr-2" />
                                        Kategorien
                                        <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full">
                                            {categories.length}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {activeTab === 'products' ? (
                                    <div>
                                        {/* Products Header */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                            <div>
                                                <h2 className="text-2xl font-bold text-lime-900">Produktverwaltung</h2>
                                                <p className="text-gray-600">Verwalten Sie alle Produkte im Shop</p>
                                            </div>
                                            <button
                                                onClick={() => setEditingProduct({
                                                    productID: 0,
                                                    name: '',
                                                    description: '',
                                                    price: 0,
                                                    stock: 100,
                                                    image: '',
                                                    categoryID: categories[0]?.categoryID || 0,
                                                    weight: '',
                                                    volume: '',
                                                    packaging: '',
                                                    fullWidth: false,
                                                    specialType: '',
                                                    slug: ''
                                                })}
                                                className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-4 md:mt-0"
                                            >
                                                <Plus size={16} className="mr-2" />
                                                Neues Produkt
                                            </button>
                                        </div>

                                        {/* Filters */}
                                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                        <Search size={16} className="mr-2" />
                                                        Suche
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        placeholder="Produktname oder Beschreibung..."
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                        <Filter size={16} className="mr-2" />
                                                        Kategorie
                                                    </label>
                                                    <select
                                                        value={selectedCategory}
                                                        onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                                    >
                                                        <option value="all">Alle Kategorien</option>
                                                        {categories.map(category => (
                                                            <option key={category.categoryID} value={category.categoryID}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Angezeigt: {filteredProducts.length} von {products.length}
                                                    </label>
                                                    <button
                                                        onClick={fetchData}
                                                        className="w-full inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-colors"
                                                    >
                                                        Aktualisieren
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Products List */}
                                        <div className="space-y-4">
                                            {filteredProducts.map(product => (
                                                <div key={product.productID} className="border border-gray-200 rounded-xl overflow-hidden">
                                                    <div className="bg-gray-50 px-6 py-4">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg overflow-hidden mr-4">
                                                                    {product.image ? (
                                                                        <img
                                                                            src={product.image}
                                                                            alt={product.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                                            <Package className="text-gray-400" size={24} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                                                    <p className="text-sm text-gray-500">
                                                                        {categories.find(c => c.categoryID === product.categoryID)?.name || 'Unkategorisiert'}
                                                                    </p>
                                                                    <div className="flex items-center mt-1">
                                                                        <span className="text-lg font-bold text-lime-700 mr-4">
                                                                            CHF {parseFloat(product.price.toString()).toFixed(2)}
                                                                        </span>
                                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 20 ? 'bg-emerald-100 text-emerald-800' :
                                                                                product.stock > 0 ? 'bg-amber-100 text-amber-800' :
                                                                                    'bg-red-100 text-red-800'
                                                                            }`}>
                                                                            Lager: {product.stock}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex space-x-2 mt-4 md:mt-0">
                                                                <button
                                                                    onClick={() => setEditingProduct(product)}
                                                                    className="inline-flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-lg transition-colors"
                                                                >
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteProduct(product.productID)}
                                                                    className="inline-flex items-center bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-2 px-3 rounded-lg transition-colors"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {/* Categories Header */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                            <div>
                                                <h2 className="text-2xl font-bold text-lime-900">Kategorienverwaltung</h2>
                                                <p className="text-gray-600">Verwalten Sie Produktkategorien</p>
                                            </div>
                                            <button
                                                onClick={() => setEditingCategory({
                                                    categoryID: 0,
                                                    name: '',
                                                    image: '',
                                                    slug: '',
                                                    products: []
                                                })}
                                                className="inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-4 md:mt-0"
                                            >
                                                <Plus size={16} className="mr-2" />
                                                Neue Kategorie
                                            </button>
                                        </div>

                                        {/* Categories List */}
                                        <div className="space-y-4">
                                            {categories.map(category => (
                                                <div key={category.categoryID} className="border border-gray-200 rounded-xl overflow-hidden">
                                                    <div className="bg-gray-50 px-6 py-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={() => toggleCategoryExpansion(category.categoryID)}
                                                                    className="mr-4 text-gray-500 hover:text-gray-700"
                                                                >
                                                                    {expandedCategory === category.categoryID ?
                                                                        <ChevronUp size={20} /> : <ChevronDown size={20} />
                                                                    }
                                                                </button>
                                                                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg overflow-hidden mr-4">
                                                                    {category.image ? (
                                                                        <img
                                                                            src={category.image}
                                                                            alt={category.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                                            <Tag className="text-gray-400" size={20} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                                                    <p className="text-sm text-gray-500">
                                                                        {category.products?.length || 0} Produkte • Slug: {category.slug}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => setEditingCategory(category)}
                                                                    className="inline-flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-3 rounded-lg transition-colors"
                                                                >
                                                                    <Edit size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteCategory(category.categoryID)}
                                                                    className="inline-flex items-center bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-2 px-3 rounded-lg transition-colors"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Expanded Products */}
                                                    {expandedCategory === category.categoryID && category.products && category.products.length > 0 && (
                                                        <div className="bg-white border-t border-gray-200 p-4">
                                                            <h4 className="font-semibold text-gray-700 mb-3">Produkte in dieser Kategorie:</h4>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                {category.products.map(product => (
                                                                    <div key={product.productID} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                                        <div>
                                                                            <p className="font-medium text-gray-900">{product.name}</p>
                                                                            <p className="text-sm text-gray-500">CHF {parseFloat(product.price.toString()).toFixed(2)}</p>
                                                                        </div>
                                                                        <div className="flex space-x-2">
                                                                            <button
                                                                                onClick={() => setEditingProduct(product)}
                                                                                className="text-blue-600 hover:text-blue-800"
                                                                            >
                                                                                <Edit size={16} />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteProduct(product.productID)}
                                                                                className="text-red-600 hover:text-red-800"
                                                                            >
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Edit Category Modal */}
            {editingCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-lime-900">
                                    {editingCategory.categoryID === 0 ? 'Neue Kategorie' : 'Kategorie bearbeiten'}
                                </h3>
                                <button
                                    onClick={() => setEditingCategory(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingCategory.name}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Slug (URL) *
                                    </label>
                                    <input
                                        type="text"
                                        value={editingCategory.slug}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                        placeholder="z.B. pasta, olivenoel"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bild URL
                                    </label>
                                    <input
                                        type="text"
                                        value={editingCategory.image}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 mb-2"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        handleImageUpload(e.target.files[0], 'category');
                                                    }
                                                }}
                                            />
                                            <div className="flex flex-col items-center">
                                                <Upload className="text-gray-400 mb-2" size={24} />
                                                <span className="text-sm text-gray-600">
                                                    {isUploading ? 'Upload läuft...' : 'Bild hochladen'}
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    {editingCategory.image && (
                                        <div className="mt-2">
                                            <img src={editingCategory.image} alt="Vorschau" className="w-32 h-32 object-cover rounded-lg" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => setEditingCategory(null)}
                                        className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        onClick={handleSaveCategory}
                                        className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-lg transition-colors"
                                    >
                                        Speichern
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-lime-900">
                                    {editingProduct.productID === 0 ? 'Neues Produkt' : 'Produkt bearbeiten'}
                                </h3>
                                <button
                                    onClick={() => setEditingProduct(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={editingProduct.name}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Slug (URL) *
                                        </label>
                                        <input
                                            type="text"
                                            value={editingProduct.slug}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kategorie *
                                        </label>
                                        <select
                                            value={editingProduct.categoryID}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, categoryID: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                        >
                                            {categories.map(category => (
                                                <option key={category.categoryID} value={category.categoryID}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preis (CHF) *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={editingProduct.price}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Lagerbestand *
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={editingProduct.stock}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Spezialtyp
                                        </label>
                                        <select
                                            value={editingProduct.specialType || ''}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, specialType: e.target.value || null })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                        >
                                            <option value="">Kein Spezialtyp</option>
                                            <option value="alkohol">Alkohol</option>
                                            <option value="kaffee">Kaffee</option>
                                            <option value="panettoni">Panettoni</option>
                                            <option value="pate">Pate</option>
                                        </select>
                                    </div>

                                    {editingProduct.specialType === 'panettoni' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Gewicht
                                            </label>
                                            <input
                                                type="text"
                                                value={editingProduct.weight || ''}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, weight: e.target.value })}
                                                placeholder="z.B. 1kg"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                            />
                                        </div>
                                    )}

                                    {editingProduct.specialType === 'alkohol' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Volumen
                                            </label>
                                            <input
                                                type="text"
                                                value={editingProduct.volume || ''}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, volume: e.target.value })}
                                                placeholder="z.B. 0.7l"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                            />
                                        </div>
                                    )}

                                    {editingProduct.specialType === 'pate' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Verpackung
                                            </label>
                                            <input
                                                type="text"
                                                value={editingProduct.packaging || ''}
                                                onChange={(e) => setEditingProduct({ ...editingProduct, packaging: e.target.value })}
                                                placeholder="z.B. im Glas"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="fullWidth"
                                            checked={editingProduct.fullWidth}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, fullWidth: e.target.checked })}
                                            className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="fullWidth" className="ml-2 block text-sm text-gray-700">
                                            Volle Breite (für Kaffee)
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bild URL
                                        </label>
                                        <input
                                            type="text"
                                            value={editingProduct.image}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 mb-2"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <label className="cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) {
                                                            handleImageUpload(e.target.files[0], 'product');
                                                        }
                                                    }}
                                                />
                                                <div className="flex flex-col items-center">
                                                    <Upload className="text-gray-400 mb-2" size={24} />
                                                    <span className="text-sm text-gray-600">
                                                        {isUploading ? 'Upload läuft...' : 'Bild hochladen'}
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                        {editingProduct.image && (
                                            <div className="mt-2">
                                                <img src={editingProduct.image} alt="Vorschau" className="w-32 h-32 object-cover rounded-lg" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Beschreibung
                                    </label>
                                    <textarea
                                        value={editingProduct.description || ''}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                                        placeholder="Produktbeschreibung..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
                                <button
                                    onClick={() => setEditingProduct(null)}
                                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                                >
                                    Abbrechen
                                </button>
                                <button
                                    onClick={handleSaveProduct}
                                    className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-lg transition-colors"
                                >
                                    Speichern
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}