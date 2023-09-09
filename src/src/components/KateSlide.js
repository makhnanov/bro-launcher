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
                                Expenses
                            </div>
                            <div className={"kate-water-tracker"}>
                                Water tracker
                            </div>
                        </div>
                        <div className={"kate-weight-tracker"}>
                            Weight tracker
                        </div>
                        <div className={"kate-left-bottom"}>
                            <div className={"kate-calendar"}>
                                March
                            </div>
                            <div className={"kate-notes"}>
                                Notes
                            </div>
                        </div>
                    </div>
                    <div className={"kate-right"}>
                        <div className={"kate-daily-container"}>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Monday</div>
                                    <div>20</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Tuesday</div>
                                    <div>21</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Wednesday</div>
                                    <div>22</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Thursday</div>
                                    <div>23</div>
                                </div>
                            </div>
                            <div className={"kate-day kate-daily-habits"}>
                                <div className={"kate-day-header"}>
                                    <div>Daily habits</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Friday</div>
                                    <div>24</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Saturday</div>
                                    <div>25</div>
                                </div>
                            </div>
                            <div className={"kate-day"}>
                                <div className={"kate-day-header"}>
                                    <div className={"kate-day-of-week"}>Sunday</div>
                                    <div>26</div>
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
