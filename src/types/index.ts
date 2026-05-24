export interface ProductVariant {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  weight: string;
  images: string[];
  category: string;
  spiceLevel: number; // 0 to 5
  stock: number;
  rating: number;
  reviewCount: number;
  badge?: "Best Seller" | "New" | "Hot";
  variants?: ProductVariant[];
}

export interface CartItem {
  id: string; // product id + variant weight if applicable
  productId: string;
  name: string;
  price: number;
  weight: string;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };
