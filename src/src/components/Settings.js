import React from "react";
import Modal from "react-overlays/Modal";
import "../styles/settings.css"

const Settings = ({show, onHide, renderBackdrop, settingsOneClick, toggleSettingsOneClick}) => {
    return (
        <div className={'settings'}>
            <Modal className={"modal"} show={show} onHide={onHide} renderBackdrop={renderBackdrop}>
                <div className={"settings__content"}>

                    <div className="modal-header">
                        <div className="modal-title">Settings</div>
                    </div>

                    <div className="modal-desc">

                        <p>Open bookmark:</p>

                        <div className={"settings__open-bookmark"}>

                            <div>
                                <input type="radio" id="contactChoice1" name="contact" value="email" checked={settingsOneClick} onChange={toggleSettingsOneClick} />
                                <label className={"settings__open-bookmark-label"} htmlFor="contactChoice1">
                                    One Click
                                </label>
                            </div>

                            <div>
                                <input type="radio" id="contactChoice2" name="contact" value="phone" checked={!settingsOneClick} onChange={toggleSettingsOneClick}/>
                                <label className={"settings__open-bookmark-label"} htmlFor="contactChoice2">
                                    Two Clicks
                                </label>
                            </div>

                        </div>

                    </div>

                </div>
            </Modal>
        </div>
);
};

export default Settings;
