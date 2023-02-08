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

    const athleteImg = document.createElement("img");
    athleteImg.src = athlete.photoUrl;
    athleteCardElem.appendChild(athleteImg);

    const athleteName = document.createElement("strong");
    athleteName.innerText = athlete.name + " " + athlete.lastName;
    athleteName.classList.add("player-name");
    athleteCardElem.appendChild(athleteName);

    return athleteCardElem;
}