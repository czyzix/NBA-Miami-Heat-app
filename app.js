
fetch('https://www.balldontlie.io/api/v1/players?search=butler')
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));




//'https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=79'
//https://www.balldontlie.io/api/v1/players?search=butler


//http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/Miami/roster - GIGA WAŻNE