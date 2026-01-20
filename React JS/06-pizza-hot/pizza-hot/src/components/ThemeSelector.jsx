const themeColors = ["warning", "danger", "secondary", "primary", "success"];

import { useContext } from "react";
import "./ThemeSelector.css";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeSelector() {
  // We get the necessary functions and states from the ThemeContext
  const { changeColor, mode, changeMode } = useContext(ThemeContext);

  function toogleMode() {
    // Change the current mode from "dark" to "light", otherwise change it to "dark"
    changeMode(mode === "dark" ? "light" : "dark");
  }

  return (
    <div className="container theme-selector">
      <div className="mode-toggle">
        <i
          // Shows full or empty moon icon depending on mode
          className={`bi bi-moon-stars${mode === "dark" ? "-fill" : ""}`}
          onClick={toogleMode} // Change mode when clicked
        />
      </div>
      <div className="theme-links">
        {themeColors.map((color) => (
          <span
            key={color}
            className={`bg-${color}`} // Bootstrap background color
            onClick={() => changeColor(color)} // Change theme on click
          ></span>
        ))}
      </div>
    </div>
  );
}