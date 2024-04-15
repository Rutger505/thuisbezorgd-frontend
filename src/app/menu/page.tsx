"use client";

import MenuCategory from "@/components/MenuCatagory";
import Basket from "@/components/Basket";
import { useEffect, useState } from "react";

export interface CategoryData {
  id: number;
  name: string;
  dishes: DishData[];
}

export interface DishData {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface BasketMenuItemData {
  item: DishData;
  quantity: number;
}

export default function Menu() {
  // Get Menu JSON from API
  const [menuCategories, setMenuCategories] = useState<CategoryData[]>([]);
  const [cartItems, setCartItems] = useState<BasketMenuItemData[]>([]);

  useEffect(() => {
    const apiUri = `${process.env.NEXT_PUBLIC_API_URL}/menu`;

    console.log("Fetching menu from:", apiUri);
    fetch(apiUri)
      .then((response) => response.json())
      .then((data: any[]) => {
        console.log("Fetched menu:", data)

        // sort the categories by position_index
        data = data.sort(
          (a: any, b: any) => a.position_index - b.position_index,
        );

        // sort the dishes by position_index
        data.forEach((category: any) => {
          category.dishes = category.dishes.sort(
            (a: any, b: any) => a.position_index - b.position_index,
          );
        });

        setMenuCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  function addToCart(item: DishData) {
    console.log("Added to cart:", JSON.stringify(item));

    // Check if item is already in cart
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.item.id === item.id,
    );
    if (existingCartItem) {
      changeBasketItemQuantity(existingCartItem, 1);
      return;
    }

    setCartItems([...cartItems, { item, quantity: 1 }]);
  }

  function removeFromCart(item: BasketMenuItemData) {
    console.log("Removed from cart:", JSON.stringify(item));
    setCartItems(cartItems.filter((cartItem) => cartItem !== item));
  }

  function changeBasketItemQuantity(
    item: BasketMenuItemData,
    quantityChange: number,
  ) {
    setCartItems(
      cartItems.map((cartItem) => {
        if (cartItem.item === item.item) {
          return { ...cartItem, quantity: cartItem.quantity + quantityChange };
        }
        return cartItem;
      }),
    );
  }

  function onDecrementItem(item: BasketMenuItemData) {
    console.log("Decremented item:", JSON.stringify(item));
    changeBasketItemQuantity(item, -1);
  }

  function onIncrementItem(item: BasketMenuItemData) {
    console.log("Incremented item:", JSON.stringify(item));
    changeBasketItemQuantity(item, 1);
  }

  function onCheckout() {
    setCartItems([]);
    alert("Checkout complete");
  }

  return (
    <main className={"flex"}>
      <div className="flex flex-1 justify-center px-5 py-12 md:px-24">
        <div className={"flex max-w-5xl flex-1 flex-col justify-between "}>
          <h1 className={"mb-5 text-center text-xl"}>Menu</h1>
          <ul className={"flex flex-col gap-14"}>
            {menuCategories.map((category) => (
              <MenuCategory
                key={category.id}
                category={category}
                onAddToCart={addToCart}
              />
            ))}
          </ul>
        </div>
      </div>
      <Basket
        items={cartItems}
        onRemoveFromCart={removeFromCart}
        onDecrementItem={onDecrementItem}
        onIncrementItem={onIncrementItem}
        onCheckout={onCheckout}
      />
    </main>
  );
}
