/* important links:
'https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=79' - athlete stats
`https://www.balldontlie.io/api/v1/players?search=butler` - search by lastname
`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/Miami/roster` - miami heat roster */

import { renderAthletesList } from "./help-functions.js";

let miamiHeatRoster = [];

function getMiamiRoster() {
	fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/Miami/roster')
	.then(res => res.json())
	.then((dataRaw) => {

		miamiHeatRoster = dataRaw.athletes.map((athlete) => {
			return {
				id: athlete.id,
				name: athlete.firstName,
				lastName: athlete.lastName,
				jersey: athlete.jersey,
				position: athlete.position.name,
				photoUrl: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${athlete.id}.png&w=350&h=254`,
			};
		});
		console.log(miamiHeatRoster);
		renderAthletesList(miamiHeatRoster);
	})
	.catch(err => console.error(err));
}

getMiamiRoster();

