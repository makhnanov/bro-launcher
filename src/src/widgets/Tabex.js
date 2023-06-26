import React, {useEffect, useState} from "react";

let oncePills = false;

const Tabex = ({settingsTabex}) => {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const toDate = () => {
        let date = new Date(schedule.lastTimestamp);
        let hours = date.getHours()
        if (hours.toString().length === 1) {
            hours = "0" + hours
        }
        let minutes = date.getUTCMinutes()
        if (minutes.toString().length === 1) {
            minutes = "0" + minutes
        }
        let seconds = date.getUTCSeconds()
        if (seconds.toString().length === 1) {
            seconds = "0" + seconds
        }
        return date.getUTCDate() + " " + monthNames[date.getUTCMonth()] + " " + hours + ":" + minutes + ":" + seconds
    }

    const [schedule, setSchedule] = useState(localStorage.getItem('pillsTabex') === null ? {
        days: [{day: 1, perDay: 6, delay: 2, checked: []}, {day: 2, perDay: 6, delay: 2, checked: []}, {
            day: 3,
            perDay: 6,
            delay: 2,
            checked: []
        }, {day: 4, perDay: 5, delay: 2.5, checked: []}, {day: 5, perDay: 5, delay: 2.5, checked: []}, {
            day: 6,
            perDay: 5,
            delay: 2.5,
            checked: []
        }, {day: 7, perDay: 5, delay: 2.5, checked: []}, {day: 8, perDay: 5, delay: 2.5, checked: []}, {
            day: 9,
            perDay: 5,
            delay: 2.5,
            checked: []
        }, {day: 10, perDay: 5, delay: 2.5, checked: []}, {day: 11, perDay: 5, delay: 2.5, checked: []}, {
            day: 12,
            perDay: 5,
            delay: 2.5,
            checked: []
        }, {day: 13, perDay: 4, delay: 3, checked: []}, {day: 14, perDay: 4, delay: 3, checked: []}, {
            day: 15,
            perDay: 4,
            delay: 3,
            checked: []
        }, {day: 16, perDay: 4, delay: 3, checked: []}, {day: 17, perDay: 3, delay: 5, checked: []}, {
            day: 18,
            perDay: 3,
            delay: 5,
            checked: []
        }, {day: 19, perDay: 3, delay: 5, checked: []}, {day: 20, perDay: 3, delay: 5, checked: []}, {
            day: 21,
            perDay: 2,
            delay: 8,
            checked: []
        }, {day: 22, perDay: 2, delay: 8, checked: []}, {day: 23, perDay: 2, delay: 8, checked: []}, {
            day: 24,
            perDay: 1,
            delay: 20,
            checked: []
        }, {day: 25, perDay: 1, delay: 20, checked: []},], lastTimestamp: null, firstTimestamp: null
    } : JSON.parse(localStorage.getItem("pillsTabex")))

    const [lastTimestamp, setLastTimestamp] = useState(toDate(schedule.lastTimestamp))

    useEffect(() => {
        const checkPills = event => {
            let list = document.getElementsByClassName('tabex-checkbox');
            let latestChecked = null;
            let day;
            let perDay;
            let latestCheckbox;
            for (let item of list) {
                if (item.checked) {
                    let split = item.id.split("-")
                    day = parseInt(split[1]);
                    perDay = parseInt(split[2]);
                    latestChecked = item;
                    latestCheckbox = item;
                }
            }
            if (latestChecked) {
                let delay = schedule.days[day].delay;
                if (Date.now() > (schedule.lastTimestamp + (/* delay in hours */ delay * 60 /* min */ * 60 /* sec */ * 1000 /* millisecond */))) {
                    // Detect is it last pill per day
                    let nextPerDayPillElement = latestCheckbox.nextElementSibling;
                    console.log(nextPerDayPillElement)
                    if (nextPerDayPillElement) {
                        console.log(nextPerDayPillElement.style.outline)
                        if (nextPerDayPillElement.style.outline === "red solid 6px") {
                            nextPerDayPillElement.style.outline = "0px solid red";
                            nextPerDayPillElement.style.transform = "scale(1)";
                        } else {
                            nextPerDayPillElement.style.outline = "6px solid red";
                            nextPerDayPillElement.style.transform = "scale(2)";
                        }
                    } else {
                        // Find next day and signal only if now new day
                        let nextDayFirst = document.getElementById("tabex-" + (day + 1) + "-0")
                        if (nextDayFirst && ((new Date(schedule.lastTimestamp)).getUTCDate() !== (new Date()).getUTCDate())) {
                            if (nextDayFirst.style.outline === "red solid 6px") {
                                nextDayFirst.style.outline = "0px solid red";
                                nextDayFirst.style.transform = "scale(1)";
                            } else {
                                nextDayFirst.style.outline = "6px solid red";
                                nextDayFirst.style.transform = "scale(2)";
                            }
                        }
                    }
                }
            }
        }
        if (!oncePills) {
            oncePills = true;
            setInterval(checkPills, 1000)
        }
        return () => {
        };
    }, []);

    const getPill = (event) => {
        let day = parseInt(event.target.id.split("-")[1]);
        let perDay = parseInt(event.target.id.split("-")[2]);

        let list = document.getElementsByClassName('tabex-checkbox');
        for (let item of list) {
            item.style.removeProperty("transform")
            item.style.removeProperty("outline")
        }

        if (event.target.checked) {
            schedule.days[day].checked.push(perDay)
        } else {
            let index = schedule.days[day].checked.indexOf(perDay);
            if (index !== -1) {
                schedule.days[day].checked.splice(index, 1);
            }
        }
        schedule.lastTimestamp = Date.now();
        if (!schedule.firstTimestamp) {
            schedule.firstTimestamp = Date.now();
        }
        setLastTimestamp(toDate(schedule.lastTimestamp))
        setSchedule(schedule)
        localStorage.setItem("pillsTabex", JSON.stringify(schedule))
    };

    const getDate = (timestamp) => {
        return monthNames[(new Date(timestamp)).getMonth()] + " " + (new Date(timestamp)).getUTCDate();
    }

    return (<div className={"tabex w-2-tabex-container"} style={{display: settingsTabex ? "" : "none"}}>

        <div>
            <h1>
                Tabex
            </h1>
        </div>

        <div className={"tabex-grid"}>
            {schedule.days.map((day, dayIndex) => {
                return (<div key={dayIndex} className={"tabex-day-container"}>
                    <div className={"tabex-day"}>
                        <h3>Day {dayIndex + 1}</h3>
                        <div className={"tabex-date-counter"}>({getDate(schedule.firstTimestamp + (dayIndex * 86400 * 1000))})</div>
                    </div>
                    <div>
                        {Array.from({length: day.perDay}, (_, perDayCounter) => (<input
                            id={"tabex-" + dayIndex + "-" + perDayCounter}
                            className={"tabex-checkbox"}
                            key={perDayCounter}
                            type={"checkbox"}
                            onChange={getPill}
                            defaultChecked={day.checked.includes(perDayCounter)}
                        >
                        </input>))}
                    </div>
                </div>);
            })}
        </div>

        <div>
            Last pill: {lastTimestamp}
        </div>

    </div>);
};

export default Tabex;
