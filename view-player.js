export const renderPlayerDetails = () => {

    let currentSeason

    var date = new Date();
    var current_month = date.getMonth() + 1

    if (current_month <= 10) {
        currentSeason = new Date().getFullYear() - 1
    } else {
        currentSeason = new Date().getFullYear()
    };

    const searchParams = new URLSearchParams(window.location.search);
    let statsId = searchParams.get("athlete");

    let playerStats = [];

    fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${currentSeason}&player_ids[]=${statsId}`)
    .then(res => res.json())
    .then((dataRaw) => {

        console.log(dataRaw)
    })
};