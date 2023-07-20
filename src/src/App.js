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

import './App.css';
import Modal from "react-overlays/Modal";
import React, {useState, useRef, useEffect} from "react";
import Notes from "./components/Notes";
import ItemContext from "./components/ItemContext";
import Settings from "./components/Settings";
import Tabex from "./widgets/Tabex";

import MetaTags from 'react-meta-tags';

import UaFlag from "./img/Flag_of_Ukraine.svg";
import KzFlag from "./img/Flag_of_Kazakhstan.svg";
import EnFlag from "./img/Flag_of_the_United_Kingdom.svg";
import RuFlag from "./img/ru.png";
import PutinFlag from "./img/PutinFlag.png";

document.title = 'BRO Launcher';

const appVersion = '1.7.13';

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

    const [settingsDeepl, setSettingsDeepl] = useState(getOrSetSetting("settingsDeepl", false))
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

    const warningFirstMsgArray = {
        UA: `
Дорогі користувачі! 19 липня о 21:00 по Києву буде здійснюватись примусове 
перенаправлення на захищену 
версію сайта з протоколом HTTPS. 
`,
        KZ: `
Құрметті пайдаланушылар, 19 шілдеден бастап Мәскеу уақыты бойынша сағат 21:00-де HTTPS протоколы бар сайттың қауіпсіз 
нұсқасына мәжбүрлеп қайта бағыттау жүзеге асырылады.
`,
        EN: `
Dear users, from July 19 at 21:00 Moscow time there will be a forced
redirection to a secure
version of the site with HTTPS protocol.
`,
        RU: `
Дорогие пользователи, с 19 июля в 21:00 по Москве будет осуществляться принудительное
перенаправление на защищённую
версию сайта с протоколом HTTPS.
`,
    };

    const warningSecondMsgArray = {
        UA: `
Прохання завчасно перейти на використання безпечної версії і постійно зберігати 
закладки  через  резервне копіювання або комбінацію клавіш CTRL+S
`,
        KZ: `
Осы нұсқаны пайдалануға алдын ала ауысуыңызды және жазбаларды үнемі сақтауыңызды сұраймыз.
`,
        EN: `
Please make sure to switch to using the safe version in advance and make note saving all the time.
`,
        RU: `
Убедительная просьба заранее перейти на использованию безопасной версии и постоянно делать сохранение
заметок.
`,
    };

    const [firstWarningMessage, setFirstWarningMessage] = useState(warningFirstMsgArray.RU)
    const [secondWarningMessage, setSecondWarningMessage] = useState(warningSecondMsgArray.RU)

    return (<div className="App"
                 onClick={(e) => {
                     unLockScreen(e)
                 }}
                 style={{filter: !isActive ? 'none' : '', backgroundColor: !isActive ? 'rgba(0, 0, 0, 0)' : ''}}>

        <MetaTags>
            <title>BRO Launcher</title>
            <meta name="description" content="One tap against three! Easies way to save bookmarks and many other features." />
            <meta property="og:title" content="BRO Launcher" />
            <meta property="og:image" content="http://bro-launcher/RocketV1.jpg" />
        </MetaTags>

        {/*<div>*/}
        {/*    <div className={'ssl-warning-message'}>*/}
        {/*        <img src={UaFlag} alt={"UA"} className={'small-flag'} onClick={() => {*/}
        {/*            setFirstWarningMessage(warningFirstMsgArray.UA)*/}
        {/*            setSecondWarningMessage(warningSecondMsgArray.UA)*/}
        {/*        }}></img>*/}
        {/*        <img src={KzFlag} alt={"KZ"} className={'small-flag'} onClick={() => {*/}
        {/*            setFirstWarningMessage(warningFirstMsgArray.KZ)*/}
        {/*            setSecondWarningMessage(warningSecondMsgArray.KZ)*/}
        {/*        }}></img>*/}
        {/*        <img src={EnFlag} alt={"EN"} className={'small-flag'} onClick={() => {*/}
        {/*            setFirstWarningMessage(warningFirstMsgArray.EN)*/}
        {/*            setSecondWarningMessage(warningSecondMsgArray.EN)*/}
        {/*        }}></img>*/}
        {/*        <img src={RuFlag} alt={"RU"} className={'small-flag small-flag_latest'} onClick={() => {*/}
        {/*            setFirstWarningMessage(warningFirstMsgArray.RU)*/}
        {/*            setSecondWarningMessage(warningSecondMsgArray.RU)*/}
        {/*        }}></img>*/}
        {/*        <img src={PutinFlag} alt={"PutinFlag"} className={'small-flag'} onClick={() => {*/}
        {/*            setFirstWarningMessage(warningFirstMsgArray.UA)*/}
        {/*            setSecondWarningMessage(warningSecondMsgArray.UA)*/}
        {/*        }}></img>*/}
        {/*    </div>*/}
        {/*    <div className={'ssl-warning-message'}>*/}
        {/*        <div className={'ssl-warning-message_first'}>*/}
        {/*            {firstWarningMessage}*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className={'ssl-warning-message'}>*/}
        {/*        {secondWarningMessage}*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="App-header" style={{opacity: !isActive ? '0' : '1'}}>

            <div className={`item-max-header ${menuHidden ? 'menu-hidden' : ''}`}>

                <div className={'menu-item close-menu-button'} style={{backgroundImage: `url(${Cross})`}}
                     onClick={toggleHideMenu}>
                </div>

                <div className="launcher">
                        <span className={'bro-three-letters'} onClick={toggleHideMenu}>
                            BRO
                        </span>
                    <span className={'launcher-text menu-item'}>
                            Launcher
                        </span>
                    <span className="logo-version-text menu-item"
                          onClick={() => {
                              window.open(
                                  process.env.NODE_ENV === "production"
                                      ? publicRepo
                                      : localProjectPathForWebStorm
                              )
                          }}>
                            v.{appVersion}
                        </span>
                </div>

                <div className={'menu-item'} onClick={exportData}>
                    Backup
                </div>

                <div className={'menu-item'}>
                    <label className="custom-file-upload">
                        <input type="file" className="import-button" onChange={importData}/>
                        Import
                    </label>
                </div>

                <div className={"menu-item"} onClick={toggleSettings}>
                    Settings
                </div>

                <div className={'menu-item'} onClick={lockScreen}>
                    Lock
                </div>

                {/*<div className="">*/}
                {/*    Login*/}
                {/*</div>*/}

            </div>

            <Notes
                menuHidden={menuHidden}
                settingsNotes={settingsNotes}
            />

            <ItemContext bookmarks={bookmarks}
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

            <div className={"search-engines"}>

                <div className="item-max" style={{display: settingsGoogle ? "" : "none"}}>
                    <div className="g-wrapper" onClick={() => window.open('https://www.google.com/', '_parent')}>
                        <img src={GoogleLogo} className="y-img" alt="YouTube" width="200" height="50"></img>
                    </div>
                    <div className="youtube-search-container">
                        <input type="text"
                               className="youtube-search"
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
                               onKeyDown={handleDeeplDown}/>
                    </div>
                </div>

            </div>

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
                        <div className="modal-title">Add New Bookmark</div>
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
                        <input type="text" className="input-style" onChange={handleBookmarkImageChange}
                               value={newBookmarkImage}/>

                        <div className="image-style-selector-block">
                            <label htmlFor="image-style">Round Image:</label>
                            <div className="input-style">
                                <select name="image-style"
                                        id="image-style-id"
                                        className="input-style"
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

        </div>
    </div>);
}

export default App;
