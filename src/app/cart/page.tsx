"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import gsap from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (state.items.length > 0) {
      const tl = gsap.timeline();
      
      tl.from(".cart-item", {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      })
      .from(".order-summary", {
        x: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");
    }
  }, { scope: containerRef, dependencies: [state.items.length === 0] });

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    // Animate price pulse
    const priceEl = document.getElementById(`price-${id}`);
    if (priceEl) {
      gsap.fromTo(priceEl, 
        { scale: 1.2, color: "#2563EB" },
        { scale: 1, color: "#1C1917", duration: 0.4, ease: "power2.out" }
      );
    }
    
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } });
  };

  const removeItem = (e: React.MouseEvent, id: string) => {
    const el = (e.currentTarget as HTMLElement).closest('.cart-item');
    if (el) {
      gsap.to(el, {
        x: 60,
        opacity: 0,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => dispatch({ type: "REMOVE_ITEM", payload: id }),
      });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(price);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Keranjang Anda Kosong</h2>
        <p className="text-slate-500 mb-8">Belum ada abon nikmat yang Anda pilih.</p>
        <Link 
          href="/products" 
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[#FAFAF9] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Keranjang Belanja</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 text-sm font-semibold text-slate-500 uppercase">
                <div className="col-span-6">Produk</div>
                <div className="col-span-3 text-center">Jumlah</div>
                <div className="col-span-3 text-right">Subtotal</div>
              </div>

              <div className="p-4 sm:p-0">
                {state.items.map((item) => (
                  <div key={item.id} className="cart-item sm:grid grid-cols-12 gap-4 items-center p-4 border-b border-slate-50 last:border-0 relative">
                    
                    {/* Mobile delete button */}
                    <button 
                      onClick={(e) => removeItem(e, item.id)}
                      className="sm:hidden absolute top-4 right-4 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="col-span-6 flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/products/${item.productId}`} className="font-bold text-slate-900 hover:text-blue-700 transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <div className="text-sm text-slate-500 mt-1">{item.weight}</div>
                        <div className="text-blue-600 font-medium sm:hidden mt-2">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-3 flex justify-start sm:justify-center mt-4 sm:mt-0">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-10 w-28">
                        <button 
                          className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >-</button>
                        <div className="flex-1 text-center font-semibold text-slate-900 text-sm">{item.quantity}</div>
                        <button 
                          className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >+</button>
                      </div>
                    </div>

                    <div className="col-span-3 flex justify-between sm:justify-end items-center mt-4 sm:mt-0">
                      <span className="sm:hidden text-slate-500 text-sm font-medium">Subtotal:</span>
                      <div className="flex items-center space-x-4">
                        <span id={`price-${item.id}`} className="font-bold text-slate-900 inline-block">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button 
                          onClick={(e) => removeItem(e, item.id)}
                          className="hidden sm:block text-slate-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <Link href="/products" className="text-blue-700 font-medium hover:text-blue-700 flex items-center">
                &larr; Lanjut Belanja
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 order-summary">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Ringkasan Pesanan</h2>
              
              <div className="space-y-4 mb-6 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({state.itemCount} barang)</span>
                  <span className="font-medium text-slate-900">{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Diskon</span>
                  <span className="text-green-500 font-medium">-Rp 0</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-4 mt-4">
                  <span className="font-bold text-slate-900">Total Tagihan</span>
                  <span className="font-black text-blue-600 text-xl">{formatPrice(state.total)}</span>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="w-full flex justify-center items-center py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                Lanjut ke Pembayaran
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <p className="text-xs text-slate-400 text-center mt-4">
                Pajak dan ongkos kirim dihitung pada saat checkout.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
