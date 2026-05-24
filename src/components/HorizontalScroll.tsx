"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HorizontalScroll() {
  const product = { id: "3", name: "Abon Ikan Tuna", price: "Rp 80.000", image: "https://picsum.photos/seed/abon3/800/800" };

  return (
    <section className="relative bg-slate-50 py-24 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700" 
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-blue-600 font-semibold tracking-wider uppercase mb-2">Produk Spesial</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">{product.name}</h2>
            <p className="text-xl text-slate-600 mb-6">Abon ikan tuna kaya akan Omega 3. Diproses sedemikian rupa sehingga tidak amis, menonjolkan kelezatan daging ikan tuna segar berkualitas tinggi.</p>
            <p className="text-3xl font-bold text-blue-600 mb-8">{product.price}</p>
            <Link href={`/products/${product.id}`} className="inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors self-start shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Beli Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
