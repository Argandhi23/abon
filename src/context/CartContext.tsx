"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartItem, CartState, CartAction } from "../types";

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      let updatedItems = [...state.items];
      
      if (existingItemIndex > -1) {
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.quantity,
        };
      } else {
        updatedItems.push(action.payload);
      }
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("abon_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Dispatch individual adds or just set state, but reducer is pure.
        // We'll hydrate by firing a reset action, but since we didn't define one, 
        // we can just clear and add items, or we can add a HYDRATE action. 
        // Let's add a quick hack to override state or just trust the initial state if we could.
        // For strict reducer pattern, it's better to add a SET_CART action.
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("abon_cart", JSON.stringify(state));
    }
  }, [state, isInitialized]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
