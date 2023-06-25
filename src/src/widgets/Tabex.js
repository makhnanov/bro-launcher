import React, {useState} from "react";

const schedule = {
    1: {perDay: 6, delay: 2},
    2: {perDay: 6, delay: 2},
    3: {perDay: 6, delay: 2},
    4: {perDay: 5, delay: 2.5},
    5: {perDay: 5, delay: 2.5},
    6: {perDay: 5, delay: 2.5},
    7: {perDay: 5, delay: 2.5},
    8: {perDay: 5, delay: 2.5},
    9: {perDay: 5, delay: 2.5},
    10: {perDay: 5, delay: 2.5},
    11: {perDay: 5, delay: 2.5},
    12: {perDay: 5, delay: 2.5},
    13: {perDay: 4, delay: 3},
    14: {perDay: 4, delay: 3},
    15: {perDay: 4, delay: 3},
    16: {perDay: 4, delay: 3},
    17: {perDay: 3, delay: 5},
    18: {perDay: 3, delay: 5},
    19: {perDay: 3, delay: 5},
    20: {perDay: 3, delay: 5},
    21: {perDay: 2, delay: 8},
    22: {perDay: 2, delay: 8},
    23: {perDay: 2, delay: 8},
    24: {perDay: 1, delay: 20},
    25: {perDay: 1, delay: 20},
    "already": {}
};

const Tabex = ({settingsTabex}) => {

    if (!localStorage.getItem("tabexOnMemory")) {
        localStorage.setItem("tabexOnMemory", JSON.stringify(schedule))
    }

    const [tabexOnMemory, setTabexOnMemory] = useState(
        JSON.parse(localStorage.getItem("tabexOnMemory")) ?? schedule
    );

    return (
        <div className={"tabex w-2-tabex-container"} style={{ display: settingsTabex ? "" : "none"}}>
            <div>
                <h1>
                    Tabex
                </h1>
            </div>
            <div className={"tabex-grid"}>
                {Array.from({length: 25}, (_, day) => (
                    <div className={"tabex-day-container"}>
                        <div className={"tabex-day"}>
                            <h3>Day {day + 1}</h3>
                        </div>
                        <div>
                            {Array.from({length: tabexOnMemory[day + 1].perDay}, (_, perDayCounter) => (
                                <input
                                    day={day + 1}
                                    perDay={perDayCounter}
                                    type={"checkbox"}
                                    defaultChecked={
                                        (day + 1) in tabexOnMemory.already
                                        && typeof tabexOnMemory.already[day + 1].contain(perDayCounter) !== "undefined"
                                    }
                                >
                                </input>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabex;
