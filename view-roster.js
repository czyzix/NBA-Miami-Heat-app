import { renderAthletesList } from "./help-functions.js";

export const renderRoster = () => {
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
    
    /* ---- LOADER ---- */
    
    const loaderElem = document.getElementById("loader");

    function showLoader() {
        loaderElem.style.display = "flex"
    };

    function hideLoader() {
        loaderElem.style.display = "none"
    };

    function fetchFailed() {
        const fetchFailedElem = document.getElementById("fetch-failed");

                fetchFailedElem.style.display = "flex";
                document.getElementById('roster-container').innerHTML = "";
                document.querySelector(".filters").classList.add("hide");
    };

     /* ---- FUNCTIONS ---- */

    function getMiamiRoster() {
        showLoader()
        fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/mia/roster')
        .then(res => res.json())
        .then((dataRaw) => {

            hideLoader();
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

            Promise.all(miamiHeatRoster.map(getPlayerId))
            .then(() => {renderAthletesList(miamiHeatRoster)})
            .catch(fetchFailed);
        }) 
        .catch(fetchFailed)
    };
    
    function getPlayerId(athlete) {
        const searchForSpecificPlayer = `https://www.balldontlie.io/api/v1/players?search=${athlete.lastName}`
        
        return fetch(searchForSpecificPlayer)
        .then(res => res.json())
        .then((dataRaw) => {
            for (let i = 0; i <= dataRaw.data.length; i++) {
                if (dataRaw.data[i]) {
                    
                    const playerFirstNameAndTeamNameMatches = (dataRaw.data[i].first_name === athlete.name) && (dataRaw.data[i].team.abbreviation === "MIA");

                    if (playerFirstNameAndTeamNameMatches) {
                        athlete.statsId = dataRaw.data[i].id	
                    };
                };
            };
        })
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
};
