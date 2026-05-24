"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import gsap from "../lib/gsap";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Default to the first variant or 100g
    const defaultVariant = product.variants?.[0] || { weight: product.weight, price: product.price };
    
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${defaultVariant.weight}`,
        productId: product.id,
        name: product.name,
        price: defaultVariant.price,
        weight: defaultVariant.weight,
        image: product.images[0],
        quantity: 1,
      }
    });

    // Small pop animation on the button
    const btn = e.currentTarget;
    gsap.fromTo(btn, 
      { scale: 0.9 }, 
      { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
    );
  };

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1.08, duration: 0.4, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
    }
  };

  // Format price
  const formattedPrice = new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(product.price);

  return (
    <div 
      ref={cardRef}
      className="product-card group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          ref={imageRef}
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover product-img"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className={`badge absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white z-10 
            ${product.badge === 'Best Seller' ? 'bg-blue-600' : 
              product.badge === 'New' ? 'bg-green-500' : 'bg-red-500'}`}>
            {product.badge}
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center space-x-1 text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            ⭐ {product.rating}
          </div>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <div className="text-xl font-bold text-blue-600 mb-4">
            {formattedPrice}
            <span className="text-xs text-slate-400 font-normal ml-1">/ {product.weight}</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center py-2.5 px-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
