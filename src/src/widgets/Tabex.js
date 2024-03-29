import React, {useEffect, useState} from "react";

let oncePills = false;

const Tabex = ({settingsTabex}) => {

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

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
        days: [
            {day: 1, perDay: 6, delay: 2, checked: []},
            {day: 2, perDay: 6, delay: 2, checked: []},
            {
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

    const [forNextPill, setForNextPill] = useState('')

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
                let nextWithDelay = (schedule.lastTimestamp + (/* delay in hours */ delay * 60 /* min */ * 60 /* sec */ * 1000 /* millisecond */));
                // let nextWithDelay = schedule.lastTimestamp + 10000;

                // Detect is it last pill per day
                let nextPerDayPillElement = latestCheckbox.nextElementSibling;
                let nextDayFirst = document.getElementById("tabex-" + (day + 1) + "-0")

                // Need drink now!
                if (Date.now() >= nextWithDelay) {

                    // Not last of the day
                    if (nextPerDayPillElement) {
                        if (nextPerDayPillElement.style.outline === "red solid 6px") {
                            nextPerDayPillElement.style.outline = "0px solid red";
                            nextPerDayPillElement.style.transform = "scale(1)";
                        } else {
                            nextPerDayPillElement.style.outline = "6px solid red";
                            nextPerDayPillElement.style.transform = "scale(2)";
                        }
                        setForNextPill("Next pill need take now !");
                    } else if (nextDayFirst && ((new Date(schedule.lastTimestamp)).getUTCDate() === (new Date()).getUTCDate())) {
                        setForNextPill("Wait new day for take next pill !");
                    } else if (nextDayFirst && ((new Date(schedule.lastTimestamp)).getUTCDate() !== (new Date()).getUTCDate())) {
                        // Find next day and signal only if now new day
                        if (nextDayFirst.style.outline === "red solid 6px") {
                            nextDayFirst.style.outline = "0px solid red";
                            nextDayFirst.style.transform = "scale(1)";
                        } else {
                            nextDayFirst.style.outline = "6px solid red";
                            nextDayFirst.style.transform = "scale(2)";
                        }
                        setForNextPill("Next pill need take now !");
                    } else if (!nextDayFirst) {
                        setForNextPill("Congratulations!");
                    }

                } else {
                    // Need wait
                    let dateObj = Math.floor(((new Date(nextWithDelay)).getTime() - (new Date(Date.now())).getTime()) / 1000);
                    if (nextPerDayPillElement && dateObj > 0) {
                        let hours = Math.floor(dateObj / 3600)
                        let seconds = dateObj - (hours * 3600)
                        let minutes = Math.floor(seconds / 60)
                        seconds = seconds - (minutes * 60)
                        setForNextPill("Next pill need take after: " + hours + ":" + minutes + ":" + seconds)
                    } else if (!nextDayFirst) {
                        setForNextPill("Congratulations!");
                    } else {
                        setForNextPill("Wait new day for take next pill !");
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
            // console.log(schedule.days[day].realDayGetPill)
            if (schedule.days[day].realDayGetPill === undefined) {
                schedule.days[day].realDayGetPill = (new Date()).getTime();
            }
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

    const [tabexTitle, setTabexTitle] = useState(localStorage.getItem("tabexTitle") ?? "Tabex")

    function everyDayDateFormat(timestamp) {
        return monthNames[(new Date(timestamp)).getMonth()] + " " + (new Date(timestamp)).getUTCDate();
    }

    // schedule.firstTimestamp = (new Date(2023, 5, 27, 2, 3, 4, 567)).getTime();
    // schedule.lastTimestamp = (new Date(2023, 5, 29, 2, 3, 4, 567)).getTime();
    // setSchedule(schedule)
    // localStorage.setItem("pillsTabex", JSON.stringify(schedule))

    const getDate = (probablyTimestampIfFromStart, dayIndex) => {

        // let dateByDefault = everyDayDateFormat(probablyTimestampIfFromStart);

        // console.log(schedule.days[dayIndex].realDayGetPill)

        // delete schedule.days[dayIndex].realDayGetPill;
        // setSchedule(schedule)
        // localStorage.setItem("pillsTabex", JSON.stringify(schedule))

        if (typeof schedule.days[dayIndex].realDayGetPill !== "undefined") {
            return "(" + everyDayDateFormat(schedule.days[dayIndex].realDayGetPill) + ")";
        }

        return ""

        // let dateLatestRealPill = everyDayDateFormat(schedule.days[dayIndex].realDayGetPill);
        //
        // // console.log(fromInitial)
        // // console.log(fromLatestRealPill)
        //
        // // console.log(probablyTimestampIfFromStart)
        // // console.log(everyDayDateFormat(probablyTimestampIfFromStart))
        //
        // // console.log(schedule.days[dayIndex].realDayGetPill)
        // // console.log(everyDayDateFormat(schedule.days[dayIndex].realDayGetPill))
        //
        // // console.log(schedule.lastTimestamp)
        // // console.log(everyDayDateFormat(schedule.lastTimestamp))
        //
        // if (
        //     probablyTimestampIfFromStart
        //     // dateIfDrinkFromStart !== dateLatestRealPill
        //     // && timestamp > schedule.days[dayIndex].realDayGetPill
        //     // && timestamp > schedule.lastTimestamp
        //     // && (new Date(timestamp)).getMonth() === (new Date(schedule.days[dayIndex].realDayGetPill)).getMonth()
        //     // && (new Date(timestamp)).getUTCDate() < (new Date(schedule.days[dayIndex].realDayGetPill)).getUTCDate()
        // ) {
        //     // return dateLatestRealPill;
        // }

        // return "()";
        // return dateByDefault;
    }

    const updateTabexTitle = (e) => {
        localStorage.setItem("tabexTitle", e.target.value);
        setTabexTitle(e.target.value);
    };

    return (<div className={"tabex w-2-tabex-container"} style={{display: settingsTabex ? "" : "none"}}>

        <div className={"tabex-header"}>
            <div>
                <input className={"tabex-pill-title-editable"} value={tabexTitle} onChange={updateTabexTitle}/>
            </div>
            <div>
                <h3>
                    Last pill: {lastTimestamp}
                </h3>
            </div>
            <div>
                <h3>
                    {forNextPill}
                </h3>
            </div>
        </div>

        <div className={"tabex-grid"}>
            {schedule.days.map((day, dayIndex) => {
                return (<div key={dayIndex} className={"tabex-day-container"}>
                    <div className={"tabex-day"}>
                        <h3>Day {dayIndex + 1}</h3>
                        <div
                            className={"tabex-date-counter"}>
                            {
                                schedule.firstTimestamp
                                    ? getDate((schedule.firstTimestamp) + (dayIndex * 86400 * 1000), dayIndex)
                                    : ""
                            }
                        </div>
                    </div>
                    <div className={"tabex-checkboxes-list"}>
                        <div className={"tabex-checkboxes-per-day"}>
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
                        <div className={"tabex-checkboxes-description"}>
                            (one pill every {day.delay} hours)
                        </div>
                    </div>
                </div>);
            })}
        </div>

    </div>);
};

export default Tabex;
