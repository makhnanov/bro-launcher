import React from "react";
import Modal from "react-overlays/Modal";
import "../styles/settings.css"

const Settings = ({
                      show,
                      onHide,
                      renderBackdrop,
                      settingsOneClick,
                      toggleSettingsOneClick,
                      settingsGoogle,
                      toggleSettingsGoogle,
                      settingsYoutube,
                      toggleSettingsYoutube,
                      settingsDuckDuckGo,
                      toggleSettingsDuckDuckGo,
                      settingsYandex,
                      toggleSettingsYandex,
                      settingsGoogleTranslate,
                      toggleSettingsGoogleTranslate,
                      settingsDeepl,
                      toggleSettingsDeepl,
                      settingsLifetime,
                      toggleSettingsLifetime,
                      settingsTabex,
                      toggleSettingsTabex,
                      suggestBackup,
                      toggleSuggestBackup,
                  }) => {
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
                                <input type="radio"
                                       checked={settingsOneClick} onChange={toggleSettingsOneClick}
                                       id={"setting-one-click"}
                                />
                                <label for="setting-one-click" className={"settings__open-bookmark-label"}>
                                    One Click
                                </label>
                            </div>

                            <div>
                                <input type="radio"
                                       checked={!settingsOneClick} onChange={toggleSettingsOneClick}
                                       id={"setting-two-clicks"}
                                />
                                <label for="setting-two-clicks" className={"settings__open-bookmark-label"}>
                                    Two Clicks
                                </label>
                            </div>

                        </div>

                        <hr></hr>

                        <p>Suggest a backup:</p>

                        <div className={"settings__widgets-visibility"}>
                            <div>
                                <input type="checkbox"
                                       checked={suggestBackup}
                                       onChange={toggleSuggestBackup}
                                       id={"setting-backup"}
                                />
                                <label htmlFor={"setting-backup"} className={"settings__open-bookmark-label"}>
                                    Yes
                                </label>
                            </div>
                        </div>

                        <hr></hr>

                        <p>Enable / Disable widgets:</p>

                        <div className={"settings__widgets-visibility"}>

                            <div>
                                <input type="checkbox"
                                       checked={settingsGoogle}
                                       onChange={toggleSettingsGoogle}
                                       id={"setting-google"}
                                />
                                <label for={"setting-google"} className={"settings__open-bookmark-label"}>
                                    Google
                                </label>
                            </div>

                            <div>
                                <input type="checkbox"
                                       checked={settingsYoutube} onChange={toggleSettingsYoutube}
                                       id={"setting-youtube"}
                                />
                                <label for={"setting-youtube"} className={"settings__open-bookmark-label"}>
                                    Youtube
                                </label>
                            </div>

                            <div>
                                <input type="checkbox"
                                       checked={settingsDuckDuckGo}
                                       onChange={toggleSettingsDuckDuckGo}
                                       id={"setting-duck"}
                                />
                                <label for={"setting-duck"} className={"settings__open-bookmark-label"}>
                                    DuckDuckGo
                                </label>
                            </div>

                            <div>
                                <input type="checkbox"
                                       checked={settingsYandex}
                                       onChange={toggleSettingsYandex}
                                       id={"settings-yandex"}
                                />
                                <label for={"settings-yandex"} className={"settings__open-bookmark-label"}>
                                    Yandex
                                </label>
                            </div>

                            <div>
                                <input type="checkbox"
                                       checked={settingsGoogleTranslate}
                                       onChange={toggleSettingsGoogleTranslate}
                                       id={"settings-g-translate"}
                                />
                                <label for={"settings-g-translate"} className={"settings__open-bookmark-label"}>
                                    Google Translate
                                </label>
                            </div>

                            <div>
                                <input type="checkbox"
                                       checked={settingsDeepl}
                                       onChange={toggleSettingsDeepl}
                                       id={"settings-deepl"}
                                />
                                <label for={"settings-deepl"} className={"settings__open-bookmark-label"}>
                                    Deepl
                                </label>
                            </div>

                            <div>
                                <input type="checkbox"
                                       checked={settingsLifetime}
                                       onChange={toggleSettingsLifetime}
                                       id={"settings-lifetime"}
                                />
                                <label for={"settings-lifetime"} className={"settings__open-bookmark-label"}>
                                    Lifetime
                                </label>
                            </div>

                            <div>
                                <input type="checkbox"
                                       checked={settingsTabex}
                                       onChange={toggleSettingsTabex}
                                       id={"settings-tabex"}
                                />
                                <label for={"settings-tabex"} className={"settings__open-bookmark-label"}>
                                    Tabex
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
