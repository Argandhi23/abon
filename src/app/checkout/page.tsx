"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShoppingBag, Copy, CopyCheck, MessageSquare, AlertCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    if (!isSuccess) {
      // Stagger form fields
      gsap.from(".form-field", {
        y: 30,
        opacity: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1
      });
      
      gsap.from(".summary-block", {
        x: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4
      });
    }
  }, { scope: containerRef, dependencies: [isSuccess] });

  // Success animation
  useGSAP(() => {
    if (isSuccess && successRef.current && checkPathRef.current) {
      // SVG Checkmark draw animation
      const length = checkPathRef.current.getTotalLength();
      gsap.set(checkPathRef.current, { 
        strokeDasharray: length, 
        strokeDashoffset: length 
      });
      
      const tl = gsap.timeline();
      
      tl.to(checkPathRef.current, {
        strokeDashoffset: 0, 
        duration: 0.8, 
        ease: "power2.out",
        delay: 0.3
      })
      .from(".success-message", {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
      }, "-=0.2")
      .from(".success-btn", {
        y: 20,
        opacity: 0,
        duration: 0.4,
      }, "-=0.2");
    }
  }, { scope: successRef, dependencies: [isSuccess] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const orderData = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      customer: {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
      },
      paymentMethod: formData.get('payment'),
      items: state.items,
      subtotal: state.total,
      shipping: 15000,
      total: state.total + 15000,
      status: 'pending'
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('abon_orders') || '[]');
    localStorage.setItem('abon_orders', JSON.stringify([orderData, ...existingOrders]));
    setPlacedOrder(orderData);

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      dispatch({ type: "CLEAR_CART" });
    }, 600);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(price);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("085806912873");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSuccess) {
    const isDana = placedOrder?.paymentMethod === 'Transfer DANA';
    const isGopay = placedOrder?.paymentMethod === 'Transfer GoPay';
    const showTransferDetails = isDana || isGopay;

    return (
      <div ref={successRef} className="min-h-[80vh] flex items-center justify-center bg-[#FAFAF9] px-4 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-xl border border-slate-100">
          
          {showTransferDetails ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {isDana ? (
                  <svg viewBox="0 0 120 40" className="h-10 select-none shadow-sm rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="40" rx="8" fill="#108EE9"/>
                    <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">DANA</text>
                  </svg>
                ) : (
                  <svg viewBox="0 0 120 40" className="h-10 select-none shadow-sm rounded-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="120" height="40" rx="8" fill="#00AED6"/>
                    <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">gopay</text>
                  </svg>
                )}
              </div>

              <div className="success-message">
                <h1 className="text-2xl font-black text-slate-900 mb-2">Satu Langkah Lagi!</h1>
                <p className="text-slate-500 mb-6 text-sm">
                  Silakan lakukan transfer sesuai dengan nominal ke rekening/e-wallet berikut:
                </p>

                {/* Transfer Info Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left mb-6 space-y-4">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">E-Wallet</span>
                    <span className="font-bold text-slate-800 text-base">{isDana ? "DANA" : "GoPay"}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Nomor HP / Akun</span>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-mono text-lg font-bold text-blue-600">085806912873</span>
                      <button 
                        onClick={handleCopy}
                        className="flex items-center text-xs font-bold text-blue-600 hover:bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition-all"
                      >
                        {copied ? (
                          <>
                            <CopyCheck className="w-3.5 h-3.5 mr-1" />
                            Tersalin
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1" />
                            Salin
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-slate-200/60 pt-3 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Total Pembayaran</span>
                      <span className="font-black text-slate-800 text-lg">{formatPrice(placedOrder?.total)}</span>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Menunggu Transfer
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-2xl p-4 text-xs leading-relaxed text-left mb-8 flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>PENTING:</strong> Setelah melakukan transfer, silakan klik tombol di bawah untuk mengirimkan bukti transfer via WhatsApp ke admin agar pesanan Anda dapat langsung diproses.
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a 
                  href={`https://wa.me/6285806912873?text=Halo%20Admin%20AbonLL%2C%20saya%20ingin%20konfirmasi%20pembayaran%20untuk%20pesanan%20ID%20%23${placedOrder?.id?.toUpperCase()}%20sebesar%20${formatPrice(placedOrder?.total)}%20via%20${placedOrder?.paymentMethod}.%20Berikut%20bukti%20transfernya%3A`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-lg shadow-green-500/10 flex items-center justify-center text-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Konfirmasi via WhatsApp
                </a>
                <Link 
                  href="/products"
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition-all text-sm"
                >
                  Belanja Lagi
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path ref={checkPathRef} d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              
              <div className="success-message">
                <h1 className="text-3xl font-black text-slate-900 mb-4">Pesanan Berhasil!</h1>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Terima kasih telah berbelanja di Abon Nusantara. Kami telah menerima pesanan Anda dan akan segera memproses pengirimannya.
                </p>
              </div>
              
              <div className="success-btn">
                <Link 
                  href="/products"
                  className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                >
                  Belanja Lagi
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Keranjang Anda Kosong</h2>
        <Link 
          href="/products" 
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors mt-6"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[#FAFAF9] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center">
          <Link href="/cart" className="text-slate-500 hover:text-blue-700 transition-colors mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Informasi Pengiriman</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Depan</label>
                  <input required name="firstName" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="Budi" />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Belakang</label>
                  <input required name="lastName" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="Santoso" />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="budi@example.com" />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Telepon</label>
                  <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="081234567890" />
                </div>
                <div className="form-field col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Lengkap</label>
                  <textarea required name="address" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="Jl. Sudirman No. 123, RT 01/RW 02..." />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Kota/Kabupaten</label>
                  <input required name="city" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="Jakarta Pusat" />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Kode Pos</label>
                  <input required name="postalCode" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="10220" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Metode Pembayaran</h2>
              
              <div className="space-y-4 mb-8">
                {['Bayar Langsung (COD)', 'Transfer DANA', 'Transfer GoPay'].map((method, i) => (
                  <div key={i} className="form-field flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <input required type="radio" id={`payment-${i}`} value={method} name="payment" className="w-5 h-5 text-blue-600 focus:ring-blue-600 border-slate-300" defaultChecked={i === 0} />
                    <label htmlFor={`payment-${i}`} className="ml-3 block text-sm font-bold text-slate-700 cursor-pointer w-full">
                      {method}
                    </label>
                  </div>
                ))}
              </div>

              <div className="form-field">
                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Selesaikan Pesanan
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 summary-block">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Detail Pesanan</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {state.items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden relative flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <div className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-slate-500">{item.weight}</p>
                      <p className="text-sm font-bold text-blue-600 mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 text-sm text-slate-600 border-t border-slate-100 pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim (Flat)</span>
                  <span className="font-medium text-slate-900">{formatPrice(15000)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3 mt-3">
                  <span className="font-bold text-slate-900 text-base">Total Bayar</span>
                  <span className="font-black text-blue-600 text-xl">{formatPrice(state.total + 15000)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
