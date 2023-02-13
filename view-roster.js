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
            miamiHeatRoster.forEach(getPlayerId);
            renderAthletesList(miamiHeatRoster);	
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
}