/* important links:
'https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=79' - athlete stats
`https://www.balldontlie.io/api/v1/players?search=butler` - search by lastname
`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/mia/roster` - miami heat roster */

import { renderAthletesList } from "./help-functions.js";

let miamiHeatRoster = [];
let query = "";
let position = "";

/* ---- FILTERS ---- */

document.querySelector("#query").addEventListener("input", (e) => {
	query = e.target.value.toLowerCase().trim();
	filterMiamiRoster();
});

document.querySelector("#position").addEventListener("change", (e) => {
	position = e.target.value;
	filterMiamiRoster();
});

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

/* ---- FUNCTIONS ---- */

function getMiamiRoster() {
	fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/mia/roster')
	.then(res => res.json())
	.then((dataRaw) => {

		miamiHeatRoster = dataRaw.athletes.map((athlete) => {
			return {
				id: athlete.id,
				name: athlete.firstName,
				lastName: athlete.lastName,
				jersey: athlete.jersey,
				position: athlete.position.name,
				height: athlete.displayHeight.slice(0,4).replace(" ",""),
				weight: athlete.weight,
				dob: athlete.dateOfBirth.slice(0,10).replaceAll("-","/"),
				country: athlete.birthPlace.country,
				photoUrl: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${athlete.id}.png&w=350&h=254`,
			};
		});

		console.log(miamiHeatRoster);
		renderAthletesList(miamiHeatRoster);
		miamiHeatRoster.forEach(getPlayerId);
	})
	.catch(err => console.error(err));
}

function getPlayerId(athlete) {
	fetch(`https://www.balldontlie.io/api/v1/players?search=${athlete.lastName}`)
	.then(res => res.json())
	.then((dataRaw) => {
		for (let i = 0; i <= dataRaw.data.length; i++) {
			if ((dataRaw.data[i].first_name === athlete.name) && (dataRaw.data[i].team.abbreviation === "MIA")) {
				return athlete.statsId = dataRaw.data[i].id
			};
		};
	});
};

function filterMiamiRoster() {
	const filteredAthletes = miamiHeatRoster.filter((athlete) => {
		return (
			(athlete.name.toLowerCase().includes(query) ||
			athlete.lastName.toLowerCase().includes(query)) &&
			(!position || athlete.position === position)
		);
	});
	renderAthletesList(filteredAthletes);
};

getMiamiRoster();