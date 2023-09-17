import React from "react";
import '../styles/kate.css'
import "../fonts/Signika-Regular.ttf";
import Teeth from "../img/dailyHabbits/teeth.png"
import Books from "../img/dailyHabbits/books.png"
import Draw from "../img/dailyHabbits/draw.png"
import Gym from "../img/dailyHabbits/gym.png"
import Clean from "../img/dailyHabbits/clean.png"

const KateSlide = ({}) => {
    return (<div className={"kate-slide"} style={{}}>
        <div className={"kate-wrapper"}>
            <div className={"kate-container"}>
                <div className={"kate-items-container"}>
                    <div className={"kate-left"}>
                        <div className={"kate-left-top"}>
                            <div className={"kate-expenses"}>
                                <div className={"kate-header kate-font"}>
                                    Expenses
                                </div>
                                <div className={"kate-subheader"}>
                                    Last month
                                </div>
                            </div>
                            <div className={"kate-water-tracker"}>
                                <div className={"kate-header kate-font"}>
                                    Water tracker
                                </div>
                                <div className={"kate-subheader"}>
                                    This week
                                </div>
                            </div>
                        </div>
                        <div className={"kate-weight-tracker"}>
                            <div className={"kate-header kate-font"}>
                                Weight tracker
                            </div>
                            <div className={"kate-subheader"}>
                                Last month
                            </div>
                        </div>
                        <div className={"kate-left-bottom"}>
                            <div className={"kate-calendar"}>
                                <div className={"kate-header kate-font"}>
                                    March
                                </div>
                            </div>
                            <div className={"kate-notes"}>
                                <div className={"kate-header kate-font"}>
                                    Notes
                                </div>
                                <div className={"kate-notes-items"}>
                                    <ul>
                                        <li>
                                            Lorem ipsum lorem
                                        </li>
                                        <li>
                                            Lorem ipsum loremLorem ipsum loremLorem ipsum lorem Lorem ipsum lorem
                                            Lorem ipsum lorem Lorem ipsum loremLorem ipsum lorem
                                        </li>
                                        <li>
                                            Lorem ipsum lorem Lorem ipsum lorem
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"kate-right"}>
                        <div className={"kate-daily-container"}>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Monday</div>
                                    <div className={"kate-date"}>20</div>
                                </div>
                                <div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem</div>
                                        </label>
                                    </div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem ipsum lorem ipsum lorem</div>
                                        </label>
                                    </div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem ipsum lorem ipsum</div>
                                        </label>
                                    </div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem ipsum lorem</div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Tuesday</div>
                                    <div className={"kate-date"}>21</div>
                                </div>
                                <div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem ipsum</div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Wednesday</div>
                                    <div className={"kate-date"}>22</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Thursday</div>
                                    <div className={"kate-date"}>23</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-font kate-daily-habits"}>Daily habits</div>
                                </div>
                                <div className={"kate-today-counter"}>
                                    Today <span>3/5</span>
                                </div>
                                <div className={"kate-daily-habits-icons"}>
                                    <img className={"kate-daily-habits-icon"} src={Teeth} alt={"Teeth"}/>
                                    <img className={"kate-daily-habits-icon"} src={Books} alt={"Books"}/>
                                    <img className={"kate-daily-habits-icon"} src={Draw} alt={"Draw"}/>
                                    <img className={"kate-daily-habits-icon"} src={Gym} alt={"Gym"}/>
                                    <img className={"kate-daily-habits-icon"} src={Clean} alt={"Clean"}/>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Friday</div>
                                    <div className={"kate-date"}>24</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Saturday</div>
                                    <div className={"kate-date"}>25</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Sunday</div>
                                    <div className={"kate-date"}>26</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default KateSlide;
