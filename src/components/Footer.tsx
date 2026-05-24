"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, MessageCircle, MapPin, Mail, Phone, Share2 } from "lucide-react";
import gsap from "../lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    // Only keeping hover or subtle constant animations if any, removing entrance animations that hide the footer
  }, { scope: containerRef });

  if (pathname === '/cart' || pathname === '/checkout' || pathname === '/admin') {
    return null;
  }

  return (
    <footer ref={containerRef} className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="footer-col">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold text-blue-600 tracking-tight">Abon</span>
              <span className="text-3xl font-bold text-white tracking-tight">LL</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              Cita Rasa Nusantara, Lezat di Setiap Suapan. Kami menyajikan abon premium yang dibuat dengan cinta menggunakan bahan-bahan pilihan terbaik.
            </p>
          </div>

          {/* Produk */}
          <div className="footer-col">
            <h3 className="text-white text-lg font-semibold mb-6">Produk Kami</h3>
            <ul className="space-y-4">
              <li><Link href="/products" className="hover:text-blue-600 transition-colors">Abon Sapi Original</Link></li>
              <li><Link href="/products" className="hover:text-blue-600 transition-colors">Abon Sapi Pedas</Link></li>
              <li><Link href="/products" className="hover:text-blue-600 transition-colors">Abon Ayam Spesial</Link></li>
              <li><Link href="/products" className="hover:text-blue-600 transition-colors">Abon Ikan Tuna</Link></li>
            </ul>
          </div>

          {/* Layanan */}
          <div className="footer-col">
            <h3 className="text-white text-lg font-semibold mb-6">Layanan</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/#cara-pemesanan" className="hover:text-blue-600 transition-colors">Cara Pemesanan</Link></li>
              <li><Link href="/#pengiriman" className="hover:text-blue-600 transition-colors">Pengiriman</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Kontak & Sosial Media */}
          <div className="footer-col">
            <h3 className="text-white text-lg font-semibold mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <span>Jl. Artisan No. 88, Bandung, Jawa Barat, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                <span>halo@abonnusantara.com</span>
              </li>
            </ul>
            
            <h3 className="text-white text-lg font-semibold mb-4">Sosial Media</h3>
            <div className="flex space-x-4">
              <a href="https://wa.me/6285806912873" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-green-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AbonLL. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center">
            Dibuat dengan <span className="text-red-500 mx-1">❤️</span> di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
