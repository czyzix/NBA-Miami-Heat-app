import { renderPlayerCard } from "./help-functions.js";

export const renderPlayerDetails = () => {

    let currentSeason;

    // getting current NBA season year
    var date = new Date();
    var current_month = date.getMonth() + 1

    if (current_month <= 10) {
        currentSeason = new Date().getFullYear() - 1
    } else {
        currentSeason = new Date().getFullYear()
    };

    let params = new URLSearchParams(window.location.search);
    let statsId = params.get("athlete");
    let name = params.get("name");
    let lastname = params.get("lastname");

    /* function getPlayerStats() {
        fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${currentSeason}&player_ids[]=${statsId}`)
        .then(res => res.json())
        .then((dataRaw) => {
            playerStats = dataRaw.data.map((player) => {
                return {
                    gp: player.games_played,
                    pts: player.pts,
                    ast: player.ast,
                    reb: player.reb,
                    stl: player.stl,
                    blk: player.blk,
                    fg_pct: player.fg_pct
                };
            });
            console.log(playerStats);
        })
        .catch(err => console.error(err));
    }

    function getPlayerInfo() {
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
                    age: athlete.age,
                    experience: athlete.experience.years,
                    photoUrl: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${athlete.id}.png&w=350&h=254`,
                };
            });
            filterForPlayer();
        })
        .then(renderPlayerCard(filteredPlayer))
        .catch(err => console.error(err));
    }

    function filterForPlayer() {
        filteredPlayer = miamiHeatRoster.filter((athlete) => {
            return (
                (athlete.name === name) && (athlete.lastName === lastname)
            );
        });
        console.log(filteredPlayer);
    };

    getPlayerStats()
    getPlayerInfo() */


    let playerInfo = [];

    const dupa = () => {
        Promise.all(
            [fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${currentSeason}&player_ids[]=${statsId}`), 
            fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/mia/roster')])
            .then(async (values) => {
                // Stats
                const firstObj = await values[0].json();
                // Athletes
                const secondObj = await values[1].json();

                const filteredAthletes = secondObj.athletes.filter((athlete) => athlete.firstName === name && athlete.lastName === lastname)

                const mergedData = {...firstObj.data[0], ...filteredAthletes[0]};
                return mergedData;
                })
            .then((values) => {
                
                playerInfo = {
                    id: values.id,
                    name: values.firstName,
                    lastName: values.lastName,
                    jersey: values.jersey,
                    position: values.position.name,
                    height: values.displayHeight.slice(0,4).replace(" ",""),
                    weight: values.weight,
                    age: values.age,
                    experience: values.experience.years,
                    photoUrl: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${values.id}.png&w=350&h=254`,
                    gp: values.games_played,
                    pts: values.pts,
                    ast: values.ast,
                    reb: values.reb,
                    stl: values.stl,
                    blk: values.blk,
                    fg_pct: values.fg_pct
                }
                
                renderPlayerCard(playerInfo);

                // const mappedObject = {
                //     name: firstName,
                //     age,
                //     position: 
                // }
            })
    }

    dupa();
}