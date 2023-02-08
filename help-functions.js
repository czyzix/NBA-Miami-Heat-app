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

    const athleteImg = document.createElement("img");
    athleteImg.src = athlete.photoUrl;
    athleteCardElem.appendChild(athleteImg);

    return athleteCardElem;
}