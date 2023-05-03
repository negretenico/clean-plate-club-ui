
import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import type Meal from '../types/MenuItem';
import ShoppingCart from '../components/shared/ShoppingCart';
import { useNavigate } from 'react-router-dom';
interface ShoppingCartContextType {
  getItemQuantity: (id: string) => number
  increaseCartQuantity: (meal: Meal) => void
  removeFromCart: (id: string) => void
  openCart: () => void
  closeCart: () => void
  cartItems: Meal[]
  cartQuantity: number
}

const ShoppingCartContext = createContext<ShoppingCartContextType>({
  getItemQuantity: function (id: string): number {
    throw new Error('Function not implemented.');
  },
  increaseCartQuantity: function (meal: Meal): void {
    throw new Error('Function not implemented.');
  },
  removeFromCart: function (id: string): void {
    throw new Error('Function not implemented.');
  },
  openCart: function (): void {
    throw new Error('Function not implemented.');
  },
  closeCart: function (): void {
    throw new Error('Function not implemented.');
  },
  cartItems: [],
  cartQuantity: 0
});

export function useShoppingCart (): ShoppingCartContextType {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<Meal[]>(
    'shopping-cart',
    []
  );

  const cartQuantity = cartItems.length;

  const openCart = (): void => { setIsOpen(true); };
  const closeCart = (): void => { setIsOpen(false); };
  const getItemQuantity = (id: string): number => {
    return cartItems.filter(item => item.meal_id === id).length;
  };
  const increaseCartQuantity = (meal: Meal): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setCartItems((prevCartItems: Meal[]) => {
      const copyCartItems = [...prevCartItems];
      copyCartItems.push(meal);
      return copyCartItems;
    });
  };
  const removeFromCart = (id: string): void => {
    const indexToRemove = cartItems.findIndex(item => item.meal_id === id); // Find the index of the first item with id 0
    const copyOfCartItems = [...cartItems];
    if (indexToRemove !== -1) {
      copyOfCartItems.splice(indexToRemove, 1); // Remove the item at the found index
    }
    setCartItems(copyOfCartItems);
  };
  const navigate = useNavigate();

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity
      }}
    >
      {children}
      <ShoppingCart navigate={navigate} isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
