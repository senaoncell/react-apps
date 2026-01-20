import { createContext, useState } from "react";

export const UIContext = createContext();

export function UIContextProvider({ children }) {
  // State that keeps track of which screen is open in the UI
  const [uiProgress, setUIProgress] = useState("");

  // Opens the shopping cart screen
  function showCart() {
    setUIProgress("cart");
  }

  // Closes the shopping cart screen
  function hideCart() {
    setUIProgress("");
  }

  // Opens the checkout screen
  function showCheckout() {
    setUIProgress("checkout");
  }

  // Closes the checkout screen
  function hideCheckout() {
    setUIProgress("");
  }

  // Values ​​to be shared via context
  const uiProgressContext = {
    uiProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    // We send values ​​to all sub-components using the Context Provider
    <UIContext.Provider value={uiProgressContext}>
      {children}
    </UIContext.Provider>
  );
}