"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Package, 
  Search, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Trash2, 
  Database,
  ArrowRight,
  Eye,
  X,
  AlertCircle
} from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsLoggedIn(true);
      loadOrders();
    }
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("abon_orders") || "[]");
    setOrders(savedOrders);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_auth", "true");
      setError("");
      loadOrders();
    } else {
      setError("Username atau password salah!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_auth");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Status handlers
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    localStorage.setItem("abon_orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const clearAllOrders = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua pesanan?")) {
      localStorage.removeItem("abon_orders");
      setOrders([]);
    }
  };

  const populateMockOrders = () => {
    const mockOrders = [
      {
        id: "or-a8b2c",
        date: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        customer: {
          firstName: "Rizky",
          lastName: "Ramadhan",
          email: "rizky.ramadhan@example.com",
          phone: "081234567890",
          address: "Jl. Diponegoro No. 45, Dago",
          city: "Bandung",
          postalCode: "40115",
        },
        paymentMethod: "Transfer Bank (BCA, Mandiri, BNI)",
        items: [
          { id: "1", name: "Abon Sapi Original Premium", weight: "250g", price: 65000, quantity: 2, image: "/image/abon_sapi_original.png" },
          { id: "3", name: "Abon Ayam Spesial", weight: "250g", price: 55000, quantity: 1, image: "/image/abon_ayam_original.png" }
        ],
        subtotal: 185000,
        shipping: 15000,
        total: 200000,
        status: "pending"
      },
      {
        id: "or-x9y1z",
        date: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
        customer: {
          firstName: "Siti",
          lastName: "Aminah",
          email: "siti.aminah@example.com",
          phone: "085799887766",
          address: "Apartemen Gateway Tower B Lt. 12 No. 5, Cibeunying",
          city: "Bandung",
          postalCode: "40191",
        },
        paymentMethod: "Gopay / OVO / Dana",
        items: [
          { id: "2", name: "Abon Sapi Pedas Gurih", weight: "250g", price: 68000, quantity: 1, image: "/image/abon_sapi_pedas.png" }
        ],
        subtotal: 68000,
        shipping: 15000,
        total: 83000,
        status: "processed"
      },
      {
        id: "or-m4n5o",
        date: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
        customer: {
          firstName: "Budi",
          lastName: "Hartono",
          email: "budi.hartono@example.com",
          phone: "082122334455",
          address: "Jl. Sukajadi No. 102, Sukajadi",
          city: "Bandung",
          postalCode: "40162",
        },
        paymentMethod: "Kartu Kredit",
        items: [
          { id: "4", name: "Abon Ikan Tuna Premium", weight: "200g", price: 60000, quantity: 3, image: "/image/abon_ikan_tuna.png" },
          { id: "1", name: "Abon Sapi Original Premium", weight: "250g", price: 65000, quantity: 1, image: "/image/abon_sapi_original.png" }
        ],
        subtotal: 245000,
        shipping: 15000,
        total: 260000,
        status: "completed"
      }
    ];
    localStorage.setItem("abon_orders", JSON.stringify(mockOrders));
    setOrders(mockOrders);
  };

  // Filter & Search Logic
  const filteredOrders = orders.filter(order => {
    const fullName = `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.toLowerCase();
    const phone = (order.customer?.phone || '').toLowerCase();
    const id = (order.id || '').toLowerCase();
    
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || 
                          phone.includes(searchQuery.toLowerCase()) || 
                          id.includes(searchQuery.toLowerCase());
                          
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate Dashboard Metrics
  const totalSales = orders
    .filter(order => order.status === "completed")
    .reduce((sum, order) => sum + (order.total || 0), 0);

  const pendingCount = orders.filter(order => order.status === "pending").length;
  const processedCount = orders.filter(order => order.status === "processed").length;
  const completedCount = orders.filter(order => order.status === "completed").length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 -mt-16 pt-16 relative z-50">
        {/* Background Decorative Blur */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-500 opacity-20 blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/50 p-8 md:p-10 relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Package className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Portal</h1>
            <p className="text-slate-500 mt-2 text-sm">Masuk untuk mengelola pesanan AbonLL</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-blue-600/20 text-sm tracking-wide"
            >
              Masuk ke Dashboard
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center">
              &larr; Kembali ke Website Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] -mt-16 pt-16 relative z-40 pb-20">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
                A
              </div>
              <span className="font-black text-xl text-slate-950 tracking-tight">Panel Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-slate-700 hidden sm:block bg-slate-100 px-3 py-1.5 rounded-full">
                admin
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Omset Selesai</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">{formatPrice(totalSales)}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Transaksi</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">{orders.length} Pesanan</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pesanan Baru (Pending)</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">{pendingCount} Baru</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sedang Diproses</p>
              <h3 className="text-xl font-black text-slate-900 mt-1">{processedCount} Proses</h3>
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Cari ID, nama pelanggan, atau telepon..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all text-sm"
              />
            </div>
            {/* Status Select Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all text-sm font-medium text-slate-700"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending (Baru)</option>
              <option value="processed">Diproses</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearAllOrders}
              className="flex items-center justify-center px-4 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl text-sm hover:bg-red-100 transition-colors"
              title="Menghapus semua pesanan"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Reset Data
            </button>
          </div>
        </div>

        {/* Orders Table Section */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-16 text-center">
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak Ada Pesanan Ditemukan</h3>
            <p className="text-slate-500 max-w-sm mx-auto text-sm">
              Belum ada pesanan masuk, atau coba sesuaikan kata kunci pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">ID & Tanggal</th>
                    <th className="px-6 py-4">Pelanggan</th>
                    <th className="px-6 py-4">Produk</th>
                    <th className="px-6 py-4">Metode & Total</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/40 transition-colors">
                      {/* ID Tanggal */}
                      <td className="px-6 py-5 align-top">
                        <span className="font-bold text-blue-600 block mb-1 uppercase text-xs tracking-wider">
                          #{order.id}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(order.date)}
                        </span>
                      </td>

                      {/* Pelanggan */}
                      <td className="px-6 py-5 align-top">
                        <div className="font-bold text-slate-900">{order.customer?.firstName} {order.customer?.lastName}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{order.customer?.phone}</div>
                        <div className="text-xs text-slate-400 max-w-[220px] truncate mt-1" title={order.customer?.address}>
                          {order.customer?.address}, {order.customer?.city}
                        </div>
                      </td>

                      {/* Produk */}
                      <td className="px-6 py-5 align-top">
                        <div className="space-y-1.5">
                          {order.items?.map((item: any, i: number) => (
                            <div key={i} className="flex items-start text-xs">
                              <span className="font-semibold text-slate-800 bg-slate-100 rounded-md px-1.5 py-0.5 mr-2 shrink-0">
                                {item.quantity}x
                              </span>
                              <span className="text-slate-600 line-clamp-1">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-5 align-top">
                        <div className="font-bold text-slate-900">{formatPrice(order.total)}</div>
                        <div className="text-[11px] text-slate-400 mt-1 uppercase font-medium tracking-wide">
                          {order.paymentMethod ? order.paymentMethod.split(" (")[0] : "-"}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 align-top text-center">
                        {order.status === "pending" && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                            Pending
                          </span>
                        )}
                        {order.status === "processed" && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                            Diproses
                          </span>
                        )}
                        {order.status === "completed" && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                            Selesai
                          </span>
                        )}
                        {order.status === "cancelled" && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
                            Batal
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 align-top text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all inline-flex items-center justify-center"
                          title="Detail Pesanan"
                        >
                          <Eye className="w-4.5 h-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200/50 flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-3xl z-10">
              <div>
                <h3 className="font-bold text-slate-900 text-lg flex items-center">
                  Detail Pesanan
                  <span className="ml-2 font-bold text-blue-600 text-sm bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    #{selectedOrder.id}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">{formatDate(selectedOrder.date)}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-grow">
              
              {/* Customer Details */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Informasi Pelanggan</h4>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5 text-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-500">Nama Penerima</span>
                    <span className="col-span-2 font-bold text-slate-800">{selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-500">No. Telepon</span>
                    <span className="col-span-2 font-bold text-slate-800">{selectedOrder.customer?.phone}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-500">Email</span>
                    <span className="col-span-2 font-bold text-slate-800">{selectedOrder.customer?.email}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate-500">Alamat Lengkap</span>
                    <span className="col-span-2 font-medium text-slate-800 leading-relaxed">
                      {selectedOrder.customer?.address}, {selectedOrder.customer?.city}, Kode Pos {selectedOrder.customer?.postalCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Status Action Panel */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Manajemen Status</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "pending")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedOrder.status === "pending"
                        ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/10"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Set Pending
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "processed")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedOrder.status === "processed"
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Set Diproses
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "completed")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedOrder.status === "completed"
                        ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-600/10"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Set Selesai
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedOrder.status === "cancelled"
                        ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/10"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Set Batalkan
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Produk Yang Dipesan</h4>
                <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  {selectedOrder.items?.map((item: any, i: number) => (
                    <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs">
                          {item.weight || "250g"}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm leading-tight">{item.name}</h5>
                          <span className="text-xs text-slate-400 mt-1 block">Harga: {formatPrice(item.price)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-800 text-xs font-bold block">Qty: {item.quantity}</span>
                        <span className="font-bold text-blue-600 text-sm block mt-1">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Pricing */}
              <div className="border-t border-slate-100 pt-5 space-y-2.5 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-slate-900">{formatPrice(selectedOrder.shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3 mt-3">
                  <span className="font-bold text-slate-900 text-base">Total Bayar</span>
                  <span className="font-black text-blue-600 text-lg">{formatPrice(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Metode Pembayaran</span>
                  <span className="font-bold text-slate-800">{selectedOrder.paymentMethod}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
