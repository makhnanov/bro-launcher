import React from "react";
import '../styles/kate.css'
import "../fonts/Signika-Regular.ttf";

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
                            </div>
                            <div className={"kate-water-tracker"}>
                                <div className={"kate-header kate-font"}>
                                    Water tracker
                                </div>
                            </div>
                        </div>
                        <div className={"kate-weight-tracker"}>
                            <div className={"kate-header kate-font"}>
                                Weight tracker
                            </div>
                        </div>
                        <div className={"kate-left-bottom"}>
                            <div className={"kate-notes"}>
                                <div className={"kate-header kate-font"}>
                                    Notes
                                </div>
                            </div>
                            <div className={"kate-calendar"}>
                                <div className={"kate-header kate-font"}>
                                    March
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
                                            <div className={"kate-checkbox-label-text"}>Lorem</div>
                                        </label>
                                    </div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem ipsum</div>
                                        </label>
                                    </div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem ipsum dolor</div>
                                        </label>
                                    </div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem ipsum dolor sir</div>
                                        </label>
                                    </div>
                                    <div className={"kate-checkbox"}>
                                        <label className={"kate-checkbox-label"}>
                                            <input type={"checkbox"}/>
                                            <div className={"kate-checkbox-label-text"}>Lorem ipsum dolor sir amulet</div>
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
