// Images
import Outlook from './img/Outlook.svg';
import Confluence from './img/Confluence.svg';
import ChatGPT from './img/ChatGPT.png';
import Jira from './img/Jira.png';
import WebStorm from './img/WebStorm.png';
import PhpStorm from './img/PhpStorm.png';
import Diary from './img/Diary.webp';
import Bitbucket from './img/Bitbucket.svg';
import KeePassXC from './img/KeePassXC.png';
import Firefox from './img/Firefox.png';
import Mousepad from './img/Mousepad.png';
import Zoom from './img/Zoom.svg';
import Postman from './img/Postman.svg';
import Without from './img/Without.jpg';
import YouTube from './img/YouTube.png';
import Calculator from './img/Calculator.png';
import Tinder from './img/Tinder.svg';
import Github from './img/Github.svg';
import Plus from './img/Plus.svg';
import GTranslate from './img/GTranslate.png';
import Telegram from './img/Telegram.png';
import GoogleTranslate from './img/Icons8GoogleTranslate.svg';
import Deepl from './img/DeepLLogo.svg';
import Cross from './img/cross-mark-svgrepo-com.svg';
import GoogleLogo from './img/GoogleLogo.svg';
import DuckDuckGo from './img/DuckDuckGo.svg';
import YandexLogo from './img/YandexLogo.svg';
import Lock from "./img/lock-round-svgrepo-com.svg";

// Css
import './App.css';

// Vendor CSS
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';

// Components
import Modal from "react-overlays/Modal";
import React, {useState, useRef, useEffect} from "react";
import Notes from "./components/Notes";
import ItemContext from "./components/ItemContext";
import Settings from "./components/Settings";
import Tabex from "./widgets/Tabex";

// Vendor
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { Options } from '@splidejs/splide';

// Unsorted
import p1 from './img/Jira.png';
import p2 from './img/Confluence.svg';
import p3 from './img/WebStorm.png';
import p4 from './img/PhpStorm.png';
import main from "./Main";

document.title = 'BRO Launcher';

const appVersion = '2.0.11';

function App() {

    const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks') ?? '[]'));
    const [dataVersion, setDataVersion] = useState(parseInt(localStorage.getItem('dataVersion') ?? '0'));

    if (localStorage.getItem('isActive') === null) {
        localStorage.setItem('isActive', 'true');
    }
    const [isActive, setIsActive] = useState(localStorage.getItem('isActive') === 'true');

    const [showModal, setShowModal] = useState(false);
    const [indexForEdit, setIndexForEdit] = useState(null);

    const [newBookmarkLink, setNewBookmarkLink] = useState('');
    const [newBookmarkImage, setNewBookmarkImage] = useState('');
    const [newBookmarkImageStyle, setNewBookmarkImageStyle] = useState('');
    const [newBookmarkText, setNewBookmarkText] = useState('');

    if (localStorage.getItem("suggestBackup") === null) {
        localStorage.setItem("suggestBackup", "true")
    }
    const [suggestBackup, setSuggestBackup] = useState(localStorage.getItem("suggestBackup") === "true");
    const toggleSuggestBackup = () => {
        localStorage.setItem("suggestBackup", (!suggestBackup).toString())
        setSuggestBackup(!suggestBackup)
    }

    const [menuHidden, setMenuHidden] = useState(localStorage.getItem('menuHidden') === 'true');

    const localProjectPathForWebStorm = "webstorm://open?url=file:///var/www/bro-launcher/&line=95";
    const localProjectPathForPhpStorm = "phpstorm://open?url=file:///var/www/bro-launcher/backend/&line=95";
    const publicRepo = "https://github.com/makhnanov/bro-launcher";

    const renderBackdrop = (props) => <div className="backdrop" {...props} />;

    let handleClose = () => {
        setIndexForEdit(null);
        setShowModal(false);
        setNewBookmarkLink('');
        setNewBookmarkText('');
    }

    const toggleHideMenu = () => {
        localStorage.setItem('menuHidden', (!menuHidden).toString());
        setMenuHidden(!menuHidden);
    };

    const exportData = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        let gmt;
        let gmtStarts = date.toString().indexOf('GMT');
        if (gmtStarts !== -1) {
            try {
                gmt = date.toString().slice(gmtStarts).split(' ')[0];
            } catch (error) {
                gmt = '';
            }
        } else {
            gmt = '';
        }

        const fileName = `BroLauncher_Backup_App_Version_${appVersion}_Data_Version_${dataVersion}_Date_${year}-${month}-${day}_${hours}_${minutes}-${seconds}_${gmt}.json`;
        const data = new Blob([JSON.stringify(JSON.parse(localStorage.getItem('bookmarks') ?? '[]'), null, 4)], {type: 'text/json'});
        const jsonURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = jsonURL;
        link.setAttribute('download', fileName);
        link.click();

        document.body.removeChild(link);
    };

    const importData = (event) => {

        event.preventDefault()

        const fileObj = event.target.files[0];
        const reader = new FileReader();

        let fileLoaded = e => {
            const pureJson = e.target.result.trim();
            setBookmarks(JSON.parse(pureJson));
            localStorage.setItem('bookmarks', pureJson);
        }

        fileLoaded = fileLoaded.bind(fileObj);
        reader.onload = fileLoaded;
        reader.readAsText(fileObj);
    };

    const [state, setState] = useState('');

    useEffect(() => {
        const handleKeyDown = (event) => {
            const code = event.which || event.keyCode;
            let charCode = String.fromCharCode(code).toLowerCase();
            if ((event.ctrlKey || event.metaKey) && charCode === 's') {
                setState('CTRL+S');
                exportData();
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const handlePasteAnywhere = event => {
            // setNewBookmarkText('');
            // setNewBookmarkLink(event.clipboardData.getData('text'));
            setShowModal(true);
            // console.log(event.clipboardData.items[0].getAsFile())
            // https://stackoverflow.com/questions/73659207/react-js-upload-image-when-user-pastes-an-image
        };
        // window.addEventListener('paste', handlePasteAnywhere);

        // if (mainRef.current) {
            // console.log(mainRef.current.splide);
        // }

        handleThumbs(tabs.indexOf(currentTab))

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // window.removeEventListener('paste', handlePasteAnywhere);
        };
    }, []);

    let handleSuccess = () => {

        const newBookmarks = JSON.parse(localStorage.getItem('bookmarks') ?? '[]');

        let image = newBookmarkImage;

        if (!newBookmarkImage) {
            if (newBookmarkLink.includes('github')) {
                image = Github
            } else if (newBookmarkLink.includes('jira')) {
                image = Jira
            } else if (newBookmarkLink.includes('confluence')) {
                image = Confluence
            } else {
                try {
                    let domain = (new URL(newBookmarkLink)).hostname.replace('www.', '');
                    image = 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=128';
                } catch (error) {
                    image = Without;
                }
            }
        }

        let text = newBookmarkText;

        if (indexForEdit === null) {
            newBookmarks.push({
                'onClick': newBookmarkLink,
                'img': image,
                'imgStyle': newBookmarkImageStyle === '' ? "round-image-30" : newBookmarkImageStyle,
                'text': text,
            });
        } else {
            newBookmarks[indexForEdit].onClick = newBookmarkLink;
            newBookmarks[indexForEdit].text = text;
            newBookmarks[indexForEdit].img = image;
            newBookmarks[indexForEdit].imgStyle = newBookmarkImageStyle;
        }

        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setBookmarks(newBookmarks);

        setShowModal(false);

        setNewBookmarkText('');
        setNewBookmarkLink('');
        setNewBookmarkImage('');
        setNewBookmarkImageStyle('');

        setDataVersion(dataVersion + 1);

        if (suggestBackup) {
            exportData();
        }
    };

    const [settingsModal, setSettingsModal] = useState(false)
    const toggleSettings = () => {
        setSettingsModal(!settingsModal)
    }

    const lockScreen = () => {
        if (isActive) {
            localStorage.setItem('isActive', false.toString());
            setIsActive(false);
        }
    };

    const unLockScreen = () => {
        if (!isActive) {
            localStorage.setItem('isActive', true.toString());
            setIsActive(true);
        }
    };

    const handleBookmarkLinkChange = (e) => {
        let newLink = e.target.value.trim();
        if (!newBookmarkText && newLink) {
            try {
                let domain = (new URL(newLink)).hostname.replace('www.', '').split('.')[0];
                setNewBookmarkText(domain.charAt(0).toUpperCase() + domain.slice(1));
            } catch (error) {
            }
        }
        setNewBookmarkLink(newLink);
    };

    const handleBookmarkImageChange = (e) => {
        setNewBookmarkImage(e.target.value);
    };

    const handleBookmarkImageStyleChange = (e) => {
        setNewBookmarkImageStyle(e.target.value);
    };

    const handleBookmarkTextChange = (e) => {
        const str = e.target.value;
        setNewBookmarkText(str.charAt(0).toUpperCase() + str.slice(1));
    };

    const handleYoutubeKeyDown = (e) => {
        if (e.key === 'Enter') {
            window.open(encodeURI('https://www.youtube.com/results?search_query=' + e.target.value), '_parent');
            e.target.value = '';
        }
    };

    const [barrelRoll, setBarrelRoll] = useState(false);
    const handleBarrelRoll = (e) => {
        if (e?.target?.value?.toLowerCase() === 'do a barrel roll') {
            setBarrelRoll(true);
        } else {
            setBarrelRoll(false);
        }
    };

    const handleGoogleKeyDown = (e) => {
        if (e.key === 'Enter') {
            window.open(encodeURI('https://www.google.com/search?q=' + e.target.value), '_parent');
            e.target.value = '';
        }
    };

    const handleDuckDuckGoKeyDown = (e) => {
        if (e.key === 'Enter') {
            window.open(encodeURI('https://duckduckgo.com/?q=' + e.target.value), '_parent');
            e.target.value = '';
        }
    };

    const handleYandexKeyDown = (e) => {
        if (e.key === 'Enter') {
            window.open(encodeURI('https://yandex.kz/search/?text=' + e.target.value), '_parent');
            e.target.value = '';
        }
    };

    const EN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const RU = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я'];

    function detectLang(str) {
        let arrFromStr = [...str];
        let ru, en = "";
        en = arrFromStr.filter(i => EN.includes(i));
        ru = arrFromStr.filter(i => RU.includes(i));
        return en.length > ru.length;
    }

    const handleGoogleTranslateDown = (e) => {
        if (e.key === 'Enter') {
            window.open(encodeURI((detectLang(e.target.value) ? "https://translate.google.com/?sl=en&tl=ru&text=" : "https://translate.google.com/?sl=ru&tl=en&text=") + e.target.value), '_parent');
            e.target.value = '';
        }
    };

    const handleDeeplDown = (e) => {
        if (e.key === 'Enter') {
            window.open(encodeURI((detectLang(e.target.value) ? "https://www.deepl.com/translator#en/ru/" : "https://www.deepl.com/translator#ru/en/") + e.target.value), '_parent');
            e.target.value = '';
        }
    };

    function needShowModalForEdit(index) {
        setIndexForEdit(index);
        setNewBookmarkLink(bookmarks[index].onClick);
        setNewBookmarkText(bookmarks[index].text);
        setNewBookmarkImage(bookmarks[index].img);
        setNewBookmarkImageStyle(bookmarks[index].imgStyle);
        setShowModal(true);
    }

    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => {
            htmlElRef.current && htmlElRef.current.focus()
        }
        return [htmlElRef, setFocus]
    }

    const [inputLinkRef, setInputFocus] = useFocus();
    const [inputTextRef, setTextFocus] = useFocus();

    const [settingsOneClick, setSettingsOneClick] = useState(localStorage.getItem("settingsOneClick") === "true");

    const toggleSettingsOneClick = () => {
        setSettingsOneClick(!settingsOneClick)
        localStorage.setItem("settingsOneClick", (!settingsOneClick).toString())
    }

    function needShowModal() {
        setIndexForEdit(null);
        setShowModal(true);
    }

    function getOrSetSetting(setting, defaultBool) {
        if (localStorage.getItem(setting) === null) {
            localStorage.setItem(setting, defaultBool ? "true" : "false");
            return defaultBool;
        } else {
            return localStorage.getItem(setting) === "true"
        }
    }

    const [settingsGoogle, setSettingsGoogle] = useState(getOrSetSetting("settingsGoogle", true))
    const toggleSettingsGoogle = () => {
        setSettingsGoogle(!settingsGoogle)
        localStorage.setItem("settingsGoogle", (!settingsGoogle).toString())
    }

    const [settingsYoutube, setSettingsYoutube] = useState(getOrSetSetting("settingsYoutube", true))
    const toggleSettingsYoutube = () => {
        setSettingsYoutube(!settingsYoutube)
        localStorage.setItem("settingsYoutube", (!settingsYoutube).toString())
    }

    const [settingsDuckDuckGo, setSettingsDuckDuckGo] = useState(getOrSetSetting("settingsDuckDuckGo", false))
    const toggleSettingsDuckDuckGo = () => {
        setSettingsDuckDuckGo(!settingsDuckDuckGo)
        localStorage.setItem("settingsDuckDuckGo", (!settingsDuckDuckGo).toString())
    }

    const [settingsYandex, setSettingsYandex] = useState(getOrSetSetting("settingsYandex", false))
    const toggleSettingsYandex = () => {
        setSettingsYandex(!settingsYandex)
        localStorage.setItem("settingsYandex", (!settingsYandex).toString())
    }

    const [settingsGoogleTranslate, setSettingsGoogleTranslate] = useState(getOrSetSetting("settingsGoogleTranslate", false))
    const toggleSettingsGoogleTranslate = () => {
        setSettingsGoogleTranslate(!settingsGoogleTranslate)
        localStorage.setItem("settingsGoogleTranslate", (!settingsGoogleTranslate).toString())
    }

    const [settingsDeepl, setSettingsDeepl] = useState(getOrSetSetting("settingsDeepl", true))
    const toggleSettingsDeepl = () => {
        setSettingsDeepl(!settingsDeepl)
        localStorage.setItem("settingsDeepl", (!settingsDeepl).toString())
    }

    const [settingsLifetime, setSettingsLifetime] = useState(getOrSetSetting("settingsLifetime", false))
    const toggleSettingsLifetime = () => {
        setSettingsLifetime(!settingsLifetime)
        localStorage.setItem("settingsLifetime", (!settingsLifetime).toString())
    }

    const [settingsTabex, setSettingsTabex] = useState(getOrSetSetting("settingsTabex", false))
    const toggleSettingsTabex = () => {
        setSettingsTabex(!settingsTabex)
        localStorage.setItem("settingsTabex", (!settingsTabex).toString())
    }

    const [settingsNotes, setSettingsNotes] = useState(getOrSetSetting("settingsNotes", true))
    const toggleSettingsNotes = () => {
        setSettingsNotes(!settingsNotes)
        localStorage.setItem("settingsNotes", (!settingsNotes).toString())
    }

    const [settingsDeveloperMode, setSettingsDeveloperMode] = useState(getOrSetSetting("settingsDeveloperMode", false))
    const toggleSettingsDeveloperMode = () => {
        setSettingsDeveloperMode(!settingsDeveloperMode)
        localStorage.setItem("settingsDeveloperMode", (!settingsDeveloperMode).toString())
    }

    const mainOptions = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        pagination: false,
        height: '27.8125rem',
    };

    const mainRef = useRef(null);

    const handleThumbs = (id) => {
        id = "Default"
        localStorage.setItem('currentTab', tabs[id] ?? "Default");
        setCurrentTab(tabs[id] ?? "Default");
        mainRef.current.go(id);
    };

    if (localStorage.getItem("tabs") === null) {
        localStorage.setItem("tabs", JSON.stringify(["Default"]));
    }

    const [tabs, setTabs] = useState(['Default'])

    const [settingsKate, setSettingsKate] = useState(getOrSetSetting("settingsKate", false))
    const toggleSettingsKate = () => {
        setSettingsKate(!settingsKate)
        localStorage.setItem("settingsKate", (!settingsKate).toString())
        let localTabs;
        if (!settingsKate) {
            localTabs = ["Default", "Kates's Style"];
        } else {
            localTabs= ["Default"];
        }
        localStorage.setItem("tabs", JSON.stringify(localTabs));
        setTabs(localTabs)
    }

    let localCurrentTab = localStorage.getItem('currentTab');
    if (localCurrentTab === null) {
        localCurrentTab = 'Default'
    }
    const [currentTab, setCurrentTab] = useState(localCurrentTab);

    return (<div
        className={`App ${barrelRoll ? "barrel-roll" : ""}`}
        onClick={(e) => {
            unLockScreen(e)
        }}
        style={{
            filter: !isActive ? 'none' : '',
            backgroundColor: !isActive ? 'rgba(0, 0, 0, 0)' : "",
        }}
    >
        <div className="App-header" style={{opacity: !isActive ? '0' : '1'}}>

            <div className={`item-max-header ${menuHidden ? 'menu-hidden' : ''}`}>

                <div className={'menu-item close-menu-button'} style={{backgroundImage: `url(${Cross})`}}
                     onClick={toggleHideMenu}>
                </div>

                <div className="launcher">
                    <span className={'bro-three-letters menu-item-text-style'} onClick={toggleHideMenu}>
                        <b>BRO</b>
                    </span>
                    <span className={'launcher-text menu-item'}>
                        <b>Launcher</b>
                    </span>
                    <span className="logo-version-text menu-item" onClick={(e) => {
                        window.open("https://github.com/makhnanov/bro-launcher/releases", '_blank')
                    }}>
                        v.{appVersion}
                    </span>
                    <img src={Github} className={'gh-icon-in-header menu-item'} onClick={(e) => {
                        window.open("https://github.com/makhnanov/bro-launcher", '_blank')
                    }}/>
                    <span
                        className={'bro-go-dev menu-item menu-item-border menu-item-to-dev'}
                        style={{
                            backgroundColor: process.env.NODE_ENV === "production" ? "darkred" : "darkgreen",
                            display: settingsDeveloperMode ? "inline" : "none"
                        }}
                        onClick={() => {
                            window.open(process.env.NODE_ENV === "production" ? "http://bro-launcher/" : "https://bro-launcher.com/", '_parent')
                        }}
                    >
                        <b>{process.env.NODE_ENV === "production" ? "PROD !" : "Dev"}</b>
                    </span>
                    <a href={localProjectPathForWebStorm}>
                        <img src={WebStorm} className={"ws-dev-mode menu-item"} style={{
                            display: settingsDeveloperMode ? "inline" : "none"
                        }} alt={"WebStorm"}/>
                    </a>
                    <a href={localProjectPathForPhpStorm}>
                        <img src={PhpStorm} className={"ws-dev-mode_second menu-item"} style={{
                            display: settingsDeveloperMode ? "inline" : "none"
                        }} alt={"PhpStorm"}/>
                    </a>
                    <img src={Github} className={'gh-icon-in-header-dev menu-item'} onClick={(e) => {
                        window.open("https://github.com/makhnanov/bro-launcher/blob/master/ToDo.md", '_blank')
                    }} style={{
                        display: settingsDeveloperMode ? "inline" : "none"
                    }}/>
                </div>

                <div className={'menu-item menu-item-border'} onClick={exportData}>
                    <b>Create Backup</b>
                </div>

                <div className={'menu-item menu-item-border'}>
                    <label className="custom-file-upload">
                        <input type="file" className="import-button" onChange={importData}/>
                        <b>Import From File</b>
                    </label>
                </div>

                <div className={"menu-item menu-item-border"} onClick={toggleSettings}>
                    <b>Settings</b>
                </div>

                <div className={'menu-item menu-item-border'} onClick={lockScreen}>
                    <b>Lock</b>
                </div>

                <div className="menu-item menu-item-border" onClick={() => {
                    alert('WIP. Please wait new release.');
                }}>
                    <b>Login</b>
                </div>
                <div className={"lock-round-icon-wrapper"} onClick={lockScreen}>
                    <img src={Lock} alt={"Lock"} className={"lock-round-icon"}/>
                </div>
            </div>

            <ul className="thumbnails">
                {(tabs).map((thumbnail, index) => (
                    <li
                        className={"thumbnail"}
                        style={{marginLeft: menuHidden && index === 0 ? `50px` : ""}}
                    >
                        <button onClick={() => handleThumbs(index)} className={"splide-thumbnail-button"}>
                            <div>
                                {thumbnail}
                            </div>
                        </button>
                    </li>
                ))}
            </ul>

            <div className={'tab-backstage'}>
            </div>

            <Splide options={{
                type: 'fade',
                perPage: 1,
                perMove: 1,
                gap: '1rem',
                pagination: false,
                // height: '100px',
                arrows: false,
                rewindByDrag: false,
                drag: false,
            }} ref={mainRef}>

                <SplideSlide>
                    <div className={"simple-notes-wrapper"}>

                        <span className={"simple-notes-label"} style={{
                            marginLeft: menuHidden ? "27px" : '27px',
                            marginTop: menuHidden ? "0" : '0',
                        }}>
                            Simple Notes
                        </span>
                        <Notes
                            menuHidden={menuHidden}
                            settingsNotes={settingsNotes}
                        />
                    </div>

                    <div className={"search-engines"}>

                        <div className="item-max" style={{display: settingsGoogle ? "" : "none"}}>
                            <div className="g-wrapper" onClick={() => window.open('https://www.google.com/', '_parent')}>
                                <img src={GoogleLogo} className="y-img" alt="YouTube" width="200" height="50"></img>
                            </div>
                            <div className="youtube-search-container">
                                <input type="text"
                                       className="youtube-search"
                                       onChange={handleBarrelRoll}
                                       onKeyDown={handleGoogleKeyDown}/>
                            </div>
                        </div>

                        <div className="item-max" style={{display: settingsYoutube ? "" : "none"}}>
                            <div className="y-wrapper" onClick={() => window.open('https://youtube.com/', '_parent')}>
                                <img src={YouTube} className="y-img" alt="YouTube" width="200" height="50"></img>
                            </div>
                            <div className="youtube-search-container">
                                <input type="text"
                                       className="youtube-search"
                                       onChange={handleBarrelRoll}
                                       onKeyDown={handleYoutubeKeyDown}/>
                            </div>
                        </div>

                        <div className="item-max" style={{display: settingsDuckDuckGo ? "" : "none"}}>
                            <div className="g-wrapper" onClick={() => window.open('https://duckduckgo.com/', '_parent')}>
                                <img src={DuckDuckGo} className="y-img" alt="YouTube" width="200" height="50"></img>
                            </div>
                            <div className="youtube-search-container">
                                <input type="text"
                                       className="youtube-search"
                                       onChange={handleBarrelRoll}
                                       onKeyDown={handleDuckDuckGoKeyDown}/>
                            </div>
                        </div>

                        <div className="item-max" style={{display: settingsYandex ? "" : "none"}}>
                            <div className="g-wrapper" onClick={() => window.open('https://ya.ru/', '_parent')}>
                                <img src={YandexLogo} className="y-img" alt="YouTube" width="200" height="50"></img>
                            </div>
                            <div className="youtube-search-container">
                                <input type="text"
                                       className="youtube-search"
                                       onChange={handleBarrelRoll}
                                       onKeyDown={handleYandexKeyDown}/>
                            </div>
                        </div>

                        <div className="item-max" style={{display: settingsGoogleTranslate ? "" : "none"}}>
                            <div className="g-wrapper" onClick={() => window.open('https://ya.ru/', '_parent')}>
                                <img src={GoogleTranslate} className="y-img gt-img" alt="YouTube" width="200"
                                     height="50"></img>
                            </div>
                            <div className="youtube-search-container">
                                <input type="text"
                                       className="youtube-search"
                                       onChange={handleBarrelRoll}
                                       onKeyDown={handleGoogleTranslateDown}/>
                            </div>
                        </div>

                        <div className="item-max" style={{display: settingsDeepl ? "" : "none"}}>
                            <div className="g-wrapper" onClick={() => window.open('https://ya.ru/', '_parent')}>
                                <img src={Deepl} className="y-img" alt="YouTube" width="200" height="50"></img>
                            </div>
                            <div className="youtube-search-container">
                                <input type="text"
                                       className="youtube-search"
                                       onChange={handleBarrelRoll}
                                       onKeyDown={handleDeeplDown}/>
                            </div>
                        </div>

                    </div>

                    <ItemContext
                        bookmarks={bookmarks}
                        showModal={needShowModal}
                        showModalForEdit={needShowModalForEdit}
                        dataVersion={dataVersion}
                        setDataVersion={setDataVersion}
                        exportData={exportData}
                        isMenuHidden={menuHidden}
                        settingsOneClick={settingsOneClick}
                        settingsLifetime={settingsLifetime}
                        suggestBackup={suggestBackup}
                    />

                    <Tabex settingsTabex={settingsTabex}></Tabex>

                    <Settings
                        className="modal"
                        show={settingsModal}
                        onHide={toggleSettings}
                        renderBackdrop={renderBackdrop}
                        settingsOneClick={settingsOneClick}
                        toggleSettingsOneClick={toggleSettingsOneClick}
                        settingsGoogle={settingsGoogle}
                        toggleSettingsGoogle={toggleSettingsGoogle}
                        settingsYoutube={settingsYoutube}
                        toggleSettingsYoutube={toggleSettingsYoutube}
                        settingsDuckDuckGo={settingsDuckDuckGo}
                        toggleSettingsDuckDuckGo={toggleSettingsDuckDuckGo}
                        settingsYandex={settingsYandex}
                        toggleSettingsYandex={toggleSettingsYandex}
                        settingsGoogleTranslate={settingsGoogleTranslate}
                        toggleSettingsGoogleTranslate={toggleSettingsGoogleTranslate}
                        settingsDeepl={settingsDeepl}
                        toggleSettingsDeepl={toggleSettingsDeepl}
                        settingsLifetime={settingsLifetime}
                        toggleSettingsLifetime={toggleSettingsLifetime}
                        settingsTabex={settingsTabex}
                        toggleSettingsTabex={toggleSettingsTabex}
                        suggestBackup={suggestBackup}
                        toggleSuggestBackup={toggleSuggestBackup}
                        settingsNotes={settingsNotes}
                        toggleSettingsNotes={toggleSettingsNotes}
                        settingsDeveloperMode={settingsDeveloperMode}
                        toggleSettingsDeveloperMode={toggleSettingsDeveloperMode}
                    >
                    </Settings>

                    <Modal
                        className="modal"
                        show={showModal}
                        onHide={handleClose}
                        renderBackdrop={renderBackdrop}
                        onShow={() => !newBookmarkText ? inputLinkRef.current.focus() : inputTextRef.current.focus()}
                        onEnter={handleSuccess}>

                        <div>

                            <div className="modal-header">
                                <div
                                    className="modal-title">{indexForEdit ? ("Edit \"" + bookmarks[indexForEdit].text + "\" ") : "Add New"} Bookmark
                                </div>
                            </div>

                            <div className="modal-desc">

                                <p>Text:</p>
                                <input type="text"
                                       className="input-style"
                                       ref={inputTextRef}
                                       onChange={handleBookmarkTextChange}
                                       onFocus={(e) => e.target.select()}
                                       value={newBookmarkText}
                                       onKeyUp={(e) => e.keyCode === 13 ? handleSuccess() : null}
                                />

                                <p>Link:</p>
                                {/*or AnyProgram executor*/}
                                <input type="text"
                                       className="input-style"
                                       ref={inputLinkRef}
                                       onChange={handleBookmarkLinkChange}
                                       onKeyUp={(e) => e.keyCode === 13 ? handleSuccess() : null}
                                       value={newBookmarkLink}
                                />

                                <p>Image:</p>
                                <input type="text"
                                       className="input-style"
                                       onChange={handleBookmarkImageChange}
                                       onKeyUp={(e) => e.keyCode === 13 ? handleSuccess() : null}
                                       value={newBookmarkImage}/>

                                <div className="image-style-selector-block">
                                    <label htmlFor="image-style">Round Image:</label>
                                    <div className="input-style">
                                        <select name="image-style"
                                                id="image-style-id"
                                                className="input-style"
                                                onKeyUp={(e) => e.keyCode === 13 ? handleSuccess() : null}
                                                onChange={handleBookmarkImageStyleChange}
                                                value={!indexForEdit && newBookmarkImageStyle === '' ? "round-image-30" : newBookmarkImageStyle}>
                                            <option value="none">None</option>
                                            <option value="round-image-5">5%</option>
                                            <option value="round-image-10">10%</option>
                                            <option value="round-image-15">15%</option>
                                            <option value="round-image-20">20%</option>
                                            <option value="round-image-25">25%</option>
                                            <option value="round-image-30">30%</option>
                                            <option value="round-image-40">40%</option>
                                            <option value="round-image-50">50%</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button className="secondary-button" onClick={handleClose}>
                                    Close
                                </button>
                                <button className="primary-button" onClick={handleSuccess}>
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </Modal>
                </SplideSlide>
                <SplideSlide>
                    <div>This is test</div>
                </SplideSlide>
            </Splide>
        </div>
    </div>);
}

export default App;
