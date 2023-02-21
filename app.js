/* important links:
'https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=79' - athlete stats
`https://www.balldontlie.io/api/v1/players?search=butler` - search by lastname
`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/mia/roster` - miami heat roster */

import { renderRoster } from "./view-roster.js";
import { renderPlayerDetails } from "./view-player.js";

if (window.location.search.includes("?athlete=")) {
    renderPlayerDetails();
} else {
    document.querySelector(".filters").classList.remove("hide");
    renderRoster();
}

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