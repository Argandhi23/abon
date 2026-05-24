"use client";

import React, { useRef } from "react";
import { ArrowRight, ShoppingBag, Truck } from "lucide-react";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

export default function InfoSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".info-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 bg-[#FAFAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Cara Pemesanan */}
          <div 
            id="cara-pemesanan" 
            className="info-card bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-10 -translate-y-10 -z-0 opacity-60"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Cara Pemesanan</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span className="text-slate-600 text-sm">Pilih varian abon premium favorit Anda di halaman Produk, lalu masukkan ke keranjang.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span className="text-slate-600 text-sm">Buka keranjang belanja Anda, periksa kembali pesanan, lalu klik tombol Checkout.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span className="text-slate-600 text-sm">Lengkapi formulir informasi pengiriman seperti nama, nomor telepon, dan alamat tujuan.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">4</span>
                  <span className="text-slate-600 text-sm">Pilih metode pembayaran (Transfer/E-Wallet), selesaikan proses pembayaran, dan tunggu konfirmasi.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pengiriman */}
          <div 
            id="pengiriman" 
            className="info-card bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full translate-x-10 -translate-y-10 -z-0 opacity-60"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Prosedur Pengiriman</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-50 text-sky-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span className="text-slate-600 text-sm">Pengiriman dilakukan setiap hari Senin s.d Sabtu (kecuali hari libur nasional).</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-50 text-sky-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span className="text-slate-600 text-sm">Pesanan yang terkonfirmasi pembayaran sebelum pukul 15.00 WIB akan dikirim pada hari yang sama.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-50 text-sky-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span className="text-slate-600 text-sm">Kami menggunakan bubble wrap dan kotak kardus khusus secara gratis demi menjaga keamanan abon Anda.</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-50 text-sky-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">4</span>
                  <span className="text-slate-600 text-sm">Nomor resi otomatis di-update dan dikirim via email/WhatsApp paling lambat H+1 pengiriman.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
