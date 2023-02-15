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
    const rootElement = document.querySelector("#roster-container");
    rootElement.innerHTML = "";
    rootElement.appendChild(createPlayerCardInfo(playerInfo));
};

const createPlayerCardInfo = (playerInfo) => {
    const playerCardElem = document.createElement("div");
    playerCardElem.classList.add("player-card");

    const playerImg = document.createElement("img");
    playerImg.classList.add("player-photo");
    playerImg.src = playerInfo.photoUrl;
    playerCardElem.appendChild(playerImg);

    const playerName = document.createElement("strong");
    playerName.innerText = playerInfo.name;
    playerCardElem.appendChild(playerName);

    return playerCardElem;
};