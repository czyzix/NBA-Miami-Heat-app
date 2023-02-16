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
    const valueElem= document.createElement("p");
    valueElem.innerText = `${value}`;

    statElem.appendChild(labelElem);
    statElem.appendChild(valueElem);

    return statElem;
};

const createPlayerCardInfo = (playerInfo) => {
    const playerCardElem = document.createElement("div");
    playerCardElem.classList.add("player-card");

    // Player bio
    const playerBio = document.createElement("div");
    playerCardElem.appendChild(playerBio)

    const miaLogo = document.createElement("img");
    miaLogo.src = "imgs/mialogo.png";
    playerCardElem.appendChild(miaLogo)

    const playerJersey = playerBio.appendChild(createInfoElem(playerInfo.jersey,""));
    playerJersey.classList.add("bio-text");

    const playerName = playerBio.appendChild(createInfoElem(playerInfo.name,""));
    playerName.classList.add("bio-text");

    const playerLastName = document.createElement("strong");
    playerLastName.innerText = playerInfo.lastName;
    playerBio.appendChild(playerLastName);

    const playerPosition = playerBio.appendChild(createInfoElem(playerInfo.position,""));
    playerPosition.classList.add("player-position");
    
    playerBio.appendChild(createInfoElem("AGE: ", playerInfo.age));
    playerBio.appendChild(createInfoElem("HEIGHT: ", playerInfo.height));
    playerBio.appendChild(createInfoElem("WEIGHT: ", playerInfo.weight));

    //Player photo
    const playerPhoto = document.createElement("img");
    playerPhoto.src = playerInfo.photoUrl;
    playerCardElem.appendChild(playerPhoto);

    //Player stats
    const playerStatsContainer = document.createElement("div");
    playerStatsContainer.classList.add("stats-container");
    playerCardElem.appendChild(playerStatsContainer);

    playerStatsContainer.appendChild(createInfoElem("AVERAGE STATS",""));

    const stats = document.createElement("div");
    stats.classList.add("stats");
    playerStatsContainer.appendChild(stats);

    stats.appendChild(createStatElem("FG%", playerInfo.fg_pct));
    stats.appendChild(createStatElem("PTS", playerInfo.pts));
    stats.appendChild(createStatElem("AST", playerInfo.ast));
    stats.appendChild(createStatElem("REB", playerInfo.reb));
    stats.appendChild(createStatElem("STL", playerInfo.stl));
    stats.appendChild(createStatElem("BLK", playerInfo.blk));

    return playerCardElem;
};