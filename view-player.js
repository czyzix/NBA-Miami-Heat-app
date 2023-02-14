export const renderPlayerDetails = () => {

    let currentSeason;
    let playerStats = [];
    let miamiHeatRoster = [];
    let filteredPlayer = [];
    let playerFullInfo = [];

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

    function getPlayerStats() {
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
            console.log(playerStats)
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
                    dob: athlete.dateOfBirth.slice(0,10).replaceAll("-","/"),
                    photoUrl: `https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/${athlete.id}.png&w=350&h=254`,
                };
            });
            filterForPlayer();
        })
        .catch(err => console.error(err));
    }
    function filterForPlayer() {
        filteredPlayer = miamiHeatRoster.filter((athlete) => {
            return (
                (athlete.name === name) && (athlete.lastName = lastname)
            );
        });
        console.log(filteredPlayer);
    };

    getPlayerStats()
    getPlayerInfo()
};