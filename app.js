/* important links:
'https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=79' - athlete stats
`https://www.balldontlie.io/api/v1/players?search=butler` - search by lastname
`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/mia/roster` - miami heat roster */

import { renderAthletesList } from "./help-functions.js";

let miamiHeatRoster = [];
let query = "";
let position = "";

function getMiamiRoster() {
	fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/mia/roster')
	.then(res => res.json())
	.then((dataRaw) => {

		miamiHeatRoster = dataRaw.athletes.map((athlete) => {
			return {
				id: athlete.id,
				name: athlete.firstName.toUpperCase(),
				lastName: athlete.lastName.toUpperCase(),
				jersey: athlete.jersey,
				position: athlete.position.name,
				height: athlete.displayHeight.slice(0,4).replace(" ",""),
				weight: athlete.weight,
				dob: athlete.dateOfBirth.slice(0,10).replaceAll("-","/"),
				country: athlete.birthPlace.country,
				photoUrl: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${athlete.id}.png&w=350&h=254`,
			};
		});
		console.log(dataRaw);
		console.log(miamiHeatRoster);
		renderAthletesList(miamiHeatRoster);
	})
	.catch(err => console.error(err));
}

getMiamiRoster();

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

document.querySelector("#query").addEventListener("input", (e) => {
	query = e.target.value.toLowerCase().trim();
	filterMiamiRoster();
});

document.querySelector("#position").addEventListener("change", (e) => {
	position = e.target.value;
	filterMiamiRoster();
});
