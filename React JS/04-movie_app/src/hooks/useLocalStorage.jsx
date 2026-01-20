import { useEffect, useState } from "react";

// A custom React Hook that synchronizes with LocalStorage
export default function useLocalStorage(initialData, key) {
  // Creating the state 
  // // By giving a function to useState, it is made to run only on the first render
  const [value, setValue] = useState(function () {
    // Data is retrieved from LocalStorage based on the given key
    const obj = localStorage.getItem(key);
    // If data exists, it is parsed from JSON
    // // Otherwise, initialData is used
    return obj ? JSON.parse(obj) : initialData;
  });

  // This runs when the value and key change
  useEffect(
    function () {
      // The value in State is saved to LocalStorage
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  // The state and the state update function are returned
  return [value, setValue];
}