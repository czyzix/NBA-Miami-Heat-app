import { renderRoster } from "./view-roster.js";
import { renderPlayerDetails } from "./view-player.js";

const currentViewIsPlayer = window.location.search.includes("?athlete=");

if (currentViewIsPlayer) {
    renderPlayerDetails();
} else {
    // Show filters elements 
    document.querySelector(".filters").classList.remove("hide"); 
    renderRoster();
};

/* ---- DARK/LIGHT MODE ---- */

const switchButton = document.querySelector("#theme-btn");
let theme = localStorage.getItem("theme");

switchButton.addEventListener("click", () => {
    if (theme === "light") {
        document.querySelector("body").classList.remove("light");
        document.querySelector("body").classList.add("dark");
        theme = "dark";
    } else {
        document.querySelector("body").classList.remove("dark");
        document.querySelector("body").classList.add("light");
        theme = "light";
    }

    localStorage.setItem("theme", theme);
});

if (theme === "dark") {
    document.querySelector("body").classList.add("dark");
};

if (theme === "light") {
    document.querySelector("body").classList.add("light");
};