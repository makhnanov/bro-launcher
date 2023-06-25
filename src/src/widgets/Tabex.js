import React, {useEffect, useState} from "react";

let oncePills = false;

const Tabex = ({settingsTabex}) => {

    const toDate = () => {
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
        let date = new Date(schedule.lastTimestamp);
        return monthNames[date.getUTCMonth()]
            + " " + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()
    }

    const [schedule, setSchedule] = useState(
        localStorage.getItem('pillsTabex') === null
            ? {
                days: [
                    {day: 1, perDay: 6, delay: 2, checked: []},
                    {day: 2, perDay: 6, delay: 2, checked: []},
                    {day: 3, perDay: 6, delay: 2, checked: []},
                    {day: 4, perDay: 5, delay: 2.5, checked: []},
                    {day: 5, perDay: 5, delay: 2.5, checked: []},
                    {day: 6, perDay: 5, delay: 2.5, checked: []},
                    {day: 7, perDay: 5, delay: 2.5, checked: []},
                    {day: 8, perDay: 5, delay: 2.5, checked: []},
                    {day: 9, perDay: 5, delay: 2.5, checked: []},
                    {day: 10, perDay: 5, delay: 2.5, checked: []},
                    {day: 11, perDay: 5, delay: 2.5, checked: []},
                    {day: 12, perDay: 5, delay: 2.5, checked: []},
                    {day: 13, perDay: 4, delay: 3, checked: []},
                    {day: 14, perDay: 4, delay: 3, checked: []},
                    {day: 15, perDay: 4, delay: 3, checked: []},
                    {day: 16, perDay: 4, delay: 3, checked: []},
                    {day: 17, perDay: 3, delay: 5, checked: []},
                    {day: 18, perDay: 3, delay: 5, checked: []},
                    {day: 19, perDay: 3, delay: 5, checked: []},
                    {day: 20, perDay: 3, delay: 5, checked: []},
                    {day: 21, perDay: 2, delay: 8, checked: []},
                    {day: 22, perDay: 2, delay: 8, checked: []},
                    {day: 23, perDay: 2, delay: 8, checked: []},
                    {day: 24, perDay: 1, delay: 20, checked: []},
                    {day: 25, perDay: 1, delay: 20, checked: []},
                ],
                lastTimestamp: null
            }
            : JSON.parse(localStorage.getItem("pillsTabex"))
    )

    const [lastTimestamp, setLastTimestamp] = useState(toDate(schedule.lastTimestamp))


    useEffect(() => {
        const checkPills = event => {
            let list = document.getElementsByClassName('tabex-checkbox');
            let latestChecked = null;
            for (let item of list) {
                if (item.checked) {
                    latestChecked = item;
                }
            }
            // if (latestChecked) {
            //     console.log(latestChecked)
            // }
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
        if (event.target.checked) {
            schedule.days[day].checked.push(perDay)
        } else {
            let index = schedule.days[day].checked.indexOf(perDay);
            if (index !== -1) {
                schedule.days[day].checked.splice(index, 1);
            }
        }
        schedule.lastTimestamp = Date.now()
        setLastTimestamp(toDate(schedule.lastTimestamp))
        setSchedule(schedule)
        localStorage.setItem("pillsTabex", JSON.stringify(schedule))
    };

    return (
        <div className={"tabex w-2-tabex-container"} style={{display: settingsTabex ? "" : "none"}}>

            <div>
                <h1>
                    Tabex
                </h1>
            </div>

            <div className={"tabex-grid"}>
                {schedule.days.map((day, dayIndex) => {
                    return (
                        <div key={dayIndex} className={"tabex-day-container"}>
                            <div className={"tabex-day"}>
                                <h3>Day {dayIndex + 1}</h3>
                            </div>
                            <div>
                                {Array.from({length: day.perDay}, (_, perDayCounter) => (
                                    <input
                                        id={"tabex-" + dayIndex + "-" + perDayCounter}
                                        className={"tabex-checkbox"}
                                        key={perDayCounter}
                                        type={"checkbox"}
                                        onChange={getPill}
                                        defaultChecked={day.checked.includes(perDayCounter)}
                                    >
                                    </input>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                Last pill: {lastTimestamp}
            </div>

        </div>
    );
};

export default Tabex;
