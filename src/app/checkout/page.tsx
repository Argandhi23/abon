"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);

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

  if (isSuccess) {
    return (
      <div ref={successRef} className="min-h-[80vh] flex items-center justify-center bg-[#FAFAF9] px-4 py-12">
        <div className="bg-white rounded-3xl p-10 md:p-16 max-w-lg w-full text-center shadow-xl border border-slate-100">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path ref={checkPathRef} d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          
          <div className="success-message">
            <h1 className="text-3xl font-black text-slate-900 mb-4">Pesanan Berhasil!</h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Terima kasih telah berbelanja di Abon Nusantara. Kami telah mengirimkan email konfirmasi beserta detail pesanan Anda.
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
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="Budi" />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Belakang</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="Santoso" />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="budi@example.com" />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Telepon</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="081234567890" />
                </div>
                <div className="form-field col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Lengkap</label>
                  <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="Jl. Sudirman No. 123, RT 01/RW 02..." />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Kota/Kabupaten</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="Jakarta Pusat" />
                </div>
                <div className="form-field col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Kode Pos</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow" placeholder="10220" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Metode Pembayaran</h2>
              
              <div className="space-y-4 mb-8">
                {['Transfer Bank (BCA, Mandiri, BNI)', 'Gopay / OVO / Dana', 'Kartu Kredit'].map((method, i) => (
                  <div key={i} className="form-field flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                    <input required type="radio" id={`payment-${i}`} name="payment" className="w-5 h-5 text-blue-600 focus:ring-blue-600 border-slate-300" defaultChecked={i === 0} />
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
