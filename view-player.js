import { renderPlayerCard } from "./help-functions.js";

export const renderPlayerDetails = () => {

    let currentSeason;
    const params = new URLSearchParams(window.location.search);
    const statsId = params.get("athlete");
    const name = params.get("name");
    const lastname = params.get("lastname");
    let playerInfo;

    // Getting current NBA season start year
    const date = new Date();
    const current_month = date.getMonth() + 1

    const newSeasonHasNotStarted = current_month <= 10;

    if (newSeasonHasNotStarted) {
        currentSeason = new Date().getFullYear() - 1
    } else {
        currentSeason = new Date().getFullYear()
    };

    const fetchPlayerStats = `https://www.balldontlie.io/api/v1/season_averages?season=${currentSeason}&player_ids[]=${statsId}`;
    const fetchMiamiHeatRoster = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/mia/roster';

    /* ---- LOADER ---- */
    
    const loaderElem = document.getElementById("loader");

    function showLoader() {
        loaderElem.style.display = "flex"
    };

    function hideLoader() {
        loaderElem.style.display = "none"
    };
    
    const getPlayerInfo = () => {
        Promise.all(
            [fetch(fetchPlayerStats), 
            fetch(fetchMiamiHeatRoster)])
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
                    height: values.displayHeight.slice(0,4).replace(" ","")+'"',
                    weight: values.weight + " lbs",
                    age: values.age,
                    photoUrl: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${values.id}.png&w=350&h=254`,
                    pts: Math.round(values.pts * 10) / 10,
                    ast: Math.round(values.ast * 10) / 10,
                    reb: Math.round(values.reb * 10) / 10,
                    stl: Math.round(values.stl * 10) / 10,
                    blk: Math.round(values.blk * 10) / 10,
                    fg_pct: Math.round(values.fg_pct * 100)
                }
                
                const thereIsNoPlayerStats = isNaN(playerInfo.pts);

                if (thereIsNoPlayerStats) {
                    backToRoster()
                } else {
                    renderPlayerCard(playerInfo);
                }
            })
            .then(() => {hideLoader()})
            .catch((error) => {
                hideLoader()
                backToRoster()
                console.log(error)
            });

            function backToRoster() {
                window.location.href = "https://czyzix.github.io/NBA-Miami-Heat-app/";
                alert('Sorry, right now there are no available stats for this player')
            };
    }

    showLoader();
    getPlayerInfo();
};