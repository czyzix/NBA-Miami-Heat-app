export const renderAthletesList = (miamiHeatRoster) => {
    const rootElement = document.querySelector("#roster-container");
    rootElement.innerHTML = "";
    rootElement.appendChild(createAthletesListElement(miamiHeatRoster));
};

const createAthletesListElement = (miamiHeatRoster) => {
    const listElement = document.createElement("ul");
    miamiHeatRoster.forEach(athlete => {
        listElement.appendChild(createAthleteCardElement(athlete));
    });

    return listElement;
};

const createAthleteCardElement = (athlete) => {
    const athleteCardElem = document.createElement("li");
    athleteCardElem.classList.add("athlete-card");

    const anchorElement = document.createElement("a");
    anchorElement.href = `?athlete=${athlete.statsId}&name=${athlete.name}&lastname=${athlete.lastName}`;

    const athleteImg = document.createElement("img");
    athleteImg.classList.add("athlete-photo");
    athleteImg.src = athlete.photoUrl;
    anchorElement.appendChild(athleteImg);

    const athleteJersey = document.createElement("strong");
    athleteJersey.innerText = athlete.jersey;
    athleteJersey.classList.add("athlete-jersey");
    anchorElement.appendChild(athleteJersey);

    const athleteTextElem = document.createElement("div");
    athleteTextElem.classList.add("card-text-container");
    anchorElement.appendChild(athleteTextElem);

    const athleteName = document.createElement("strong");
    athleteName.innerText = athlete.name + " " + athlete.lastName;
    athleteName.classList.add("athlete-name");
    athleteTextElem.appendChild(athleteName);

    const athletePosition = document.createElement("p");
    athletePosition.innerText = athlete.position;
    athletePosition.classList.add("athlete-position");
    athleteTextElem.appendChild(athletePosition);

    
    athleteCardElem.appendChild(anchorElement);

    return athleteCardElem;
}

export const renderPlayerCard = (playerInfo) => {
    const rootElement = document.querySelector("#player-container");
    rootElement.innerHTML = "";
    rootElement.appendChild(createPlayerCardInfo(playerInfo));
};

const createInfoElem = (label, value) => {
    const infoElem = document.createElement("p");
    infoElem.innerText = `${label}${value}`;
    return infoElem;
};

const createStatElem = (label, value) => {
    const statElem = document.createElement("div");
    statElem.classList.add("stat-elem");
    
    const labelElem= document.createElement("p");
    labelElem.innerText = `${label}`;
    labelElem.classList.add("label-elem");
    const valueElem= document.createElement("p");
    valueElem.innerText = `${value}`;
    valueElem.classList.add("value-elem");

    statElem.appendChild(labelElem);
    statElem.appendChild(valueElem);

    return statElem;
};

const createPlayerCardInfo = (playerInfo) => {
    const playerCardElem = document.createElement("div");
    playerCardElem.classList.add("player-card");

    // Player bio
    const playerBio = document.createElement("div");
    playerBio.setAttribute("id", "player-bio");
    playerCardElem.appendChild(playerBio)

    const miaLogo = document.createElement("img");
    miaLogo.src = "imgs/mialogo.png";
    miaLogo.setAttribute("id", "mia-logo-card");
    playerCardElem.appendChild(miaLogo)

    playerBio.appendChild(createInfoElem(playerInfo.jersey,""));

    playerBio.appendChild(createInfoElem(playerInfo.name,""));

    const playerLastName = document.createElement("strong");
    playerLastName.classList.add("bio-text-bold");
    playerLastName.innerText = playerInfo.lastName;
    playerBio.appendChild(playerLastName);

    const playerPosition = playerBio.appendChild(createInfoElem(playerInfo.position,""));
    playerPosition.classList.add("last");
    
    playerBio.appendChild(createInfoElem("AGE: ", playerInfo.age));
    playerBio.appendChild(createInfoElem("HEIGHT: ", playerInfo.height));
    playerBio.appendChild(createInfoElem("WEIGHT: ", playerInfo.weight));

    //Player photo
    const playerPhoto = document.createElement("img");
    playerPhoto.src = playerInfo.photoUrl;
    playerPhoto.setAttribute("id", "player-photo");
    playerCardElem.appendChild(playerPhoto);

    //Player stats
    const playerStatsContainer = document.createElement("div");
    playerStatsContainer.setAttribute("id","stats-container");
    playerCardElem.appendChild(playerStatsContainer);

    const averageStats = document.createElement("strong");
    averageStats.innerText = "CURRENT SEASON AVERAGE STATS";
    averageStats.setAttribute("id", "stats-h");
    playerStatsContainer.appendChild(averageStats);

    const stats = document.createElement("div");
    stats.setAttribute("id","stats");
    playerStatsContainer.appendChild(stats);

    stats.appendChild(createStatElem("FG%", playerInfo.fg_pct));
    stats.appendChild(createStatElem("PTS", playerInfo.pts));
    stats.appendChild(createStatElem("AST", playerInfo.ast));
    stats.appendChild(createStatElem("REB", playerInfo.reb));
    stats.appendChild(createStatElem("STL", playerInfo.stl));
    stats.appendChild(createStatElem("BLK", playerInfo.blk));

    return playerCardElem;
};