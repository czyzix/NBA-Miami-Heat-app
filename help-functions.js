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
    athleteCardElem.classList.add("player-card");

    const anchorElement = document.createElement("a");
    anchorElement.href = `https://www.nba.com/heat/roster`;

    const athleteImg = document.createElement("img");
    athleteImg.classList.add("player-photo");
    athleteImg.src = athlete.photoUrl;
    anchorElement.appendChild(athleteImg);

    const athleteJersey = document.createElement("strong");
    athleteJersey.innerText = athlete.jersey;
    athleteJersey.classList.add("player-jersey");
    anchorElement.appendChild(athleteJersey);

    const athleteName = document.createElement("strong");
    athleteName.innerText = athlete.name + " " + athlete.lastName;
    athleteName.classList.add("player-name");
    anchorElement.appendChild(athleteName);

    const athletePosition = document.createElement("p");
    athletePosition.innerText = athlete.position;
    athletePosition.classList.add("player-position");
    anchorElement.appendChild(athletePosition);

    
    athleteCardElem.appendChild(anchorElement);

    return athleteCardElem;
}