export const renderPlayerDetails = () => {


    var currentSeasonDate

    const searchParams = new URLSearchParams(window.location.search);
    const dupa = searchParams.get("athlete")

    let playerStats = [];

    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${currentSeasonDate}&player_ids[]=4`)
    .then(res => res.json())
    .then((dataRaw) => {

        console.log(dataRaw)
    })
};


/* var cipa = new Date().getFullYear() - 1

console.log(cipa);

function dupa() {
    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${cipa}&player_ids[]=4`)
    .then(res => res.json())
    .then((res) => {console.log(res)})
}

https://www.balldontlie.io/api/v1/stats

dupa(); */