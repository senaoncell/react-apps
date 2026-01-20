import { useReducer } from "react";
import { createContext} from "react";
import { themeReducer } from "../reducers/themeReducer";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) { //Provider component: Provides context to child components
    // Initialize the state and dispatch functions with useReducer
    const [state, dispatch] = useReducer(themeReducer, {
    color: "primary",
    mode: "light",
  });

  // Function that changes the theme color (sends reducer action via dispatch)
  function changeColor(value) {
    dispatch({ type: "CHANGE_COLOR", payload: value });
  }

  // Function that changes the theme mode (sends reducer action via dispatch)
  function changeMode(value) {
    dispatch({ type: "CHANGE_MODE", payload: value });
  }

  return (
    // Context Provider: Provides state and functions to child components
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children} {/* Child components are rendered here */}
    </ThemeContext.Provider>
  );
}