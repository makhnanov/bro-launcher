import * as img from "./images"
import "./App.css";
import "./description.css";
import Modal from "react-overlays/Modal";
import React, {useState, useRef, useEffect} from "react";
import ItemContext from "./components/ItemContext";

import Voice1 from "./voice/1.ogg";
import Voice2 from "./voice/2.ogg";
import Voice3 from "./voice/3.ogg";

document.title = 'BRO Launcher';

const appVersion = '1.5.18';

const addNewBookmark = () => () => {
    alert('add new modal window here');
}

const handleAlertClick = (text) => () => {
    alert(text)
}

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

    const [menuHidden, setMenuHidden] = useState(localStorage.getItem('menuHidden') === 'true');

    const localProjectPathForWebStorm = "webstorm://open?url=file:///var/www/bro-launcher/&line=95";

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
        const data = new Blob([
            JSON.stringify(JSON.parse(localStorage.getItem('bookmarks') ?? '[]'), null, 4)
        ], {type: 'text/json'});
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

        window.addEventListener('paste', handlePasteAnywhere);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('paste', handlePasteAnywhere);
        };
    }, []);

    let handleSuccess = () => {

        const newBookmarks = JSON.parse(localStorage.getItem('bookmarks') ?? '[]');

        let image = newBookmarkImage;
        if (!newBookmarkImage) {
            try {
                let domain = (new URL(newBookmarkLink)).hostname.replace('www.', '');
                image = 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=128';
            } catch (error) {
                image = img.Without;
            }
        }
        let text = newBookmarkText;
        if (indexForEdit === null) {
            // newBookmarks.unshift({
            newBookmarks.push({
                'onClick': newBookmarkLink,
                'img': image,
                'imgStyle': newBookmarkImageStyle,
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

        setDataVersion(dataVersion + 1);

        exportData();
    };

    const unLockScreen = () => {
        if (!isActive) {
            localStorage.setItem('isActive', true.toString());
            setIsActive(true);
        }
    };

    const lockScreen = () => {
        if (isActive) {
            localStorage.setItem('isActive', false.toString());
            setIsActive(false);
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
            window.open(
                'https://www.youtube.com/results?search_query=' + e.target.value.replace(/\s+/g, '+'),
                '_parent'
            );
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


    function needShowModal() {
        setIndexForEdit(null);
        setShowModal(true);
    }

    let voices = [Voice1, Voice2, Voice3];
    let latestIndex = -1;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    let asHours = true;

    const playTagline = (e) => {
        e.target.classList.toggle("voice-fff_on")
        e.target.style.transition = "all ." + getRandomInt(3, 6) + "s ease-in-out";
        if (e.target.style.transform) {
            e.target.style.removeProperty("transform");
        } else {
            e.target.style.transform = "rotate(" + (asHours ? "" : "-") + getRandomInt(90, 360) + "deg)" + " " + "scale(1.3)";
            asHours = !asHours
        }
        if (typeof voices[++latestIndex] === "undefined") {
            latestIndex = 0
        }
        let audio = new Audio(voices[latestIndex]);
        audio.play();
    }

    return (
        <div>
            <audio src={Voice1}></audio>
            <div className={"site-description"}>
                <div className={"site-description__bro-launcher"}>
                    <span className={"site-description__bro"}>BRO</span> Launcher
                </div>
                <div className={"site-description__tagline"}>
                    <div className={"description__tagline-text"}>One tap instead of three</div>
                    <img className={"voice-fff"} src={img.Voice} alt={"Voice"} onClick={playTagline}/>
                </div>
            </div>
            <div className="App"
                 onClick={(e) => unLockScreen(e)}
                 style={{filter: !isActive ? 'none' : '', backgroundColor: !isActive ? 'rgba(0, 0, 0, 0)' : ''}}>
                <div className="App-header" style={{opacity: !isActive ? '0' : '1'}}>

                    <div className={`item-max-header ${menuHidden ? 'menu-hidden' : ''}`}>

                        <div className={'menu-item close-menu-button'} style={{backgroundImage: `url(${img.Cross})`}}
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
                                      window.open(localProjectPathForWebStorm)
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

                        <div className={'menu-item'} onClick={lockScreen}>
                            Lock
                        </div>

                        {/*<div className="">*/}
                        {/*    Settings*/}
                        {/*</div>*/}

                        {/*<div className="">*/}
                        {/*    Login*/}
                        {/*</div>*/}

                    </div>

                    <ItemContext bookmarks={bookmarks}
                                 showModal={needShowModal}
                                 showModalForEdit={needShowModalForEdit}
                                 dataVersion={dataVersion}
                                 setDataVersion={setDataVersion}
                                 exportData={exportData}
                                 isMenuHidden={menuHidden}/>

                    <div className="item-max">
                        <div className="y-wrapper" onClick={() => window.open('https://youtube.com/', '_parent')}>
                            <img src={img.YouTube} className="y-img" alt="YouTube" width="200" height="50"></img>
                        </div>
                        <div className="youtube-search-container">
                            <input type="text"
                                   className="youtube-search"
                                   onKeyDown={handleYoutubeKeyDown}/>
                        </div>
                    </div>

                    <Modal
                        className="modal"
                        show={showModal}
                        onHide={handleClose}
                        renderBackdrop={renderBackdrop}
                        onShow={() => !newBookmarkText ? inputLinkRef.current.focus() : inputTextRef.current.focus()}
                        onEnter={handleSuccess}
                    >
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
                                        <select name="image-style" id="image-style-id" className="input-style"
                                                onChange={handleBookmarkImageStyleChange}
                                                value={newBookmarkImageStyle ?? "round-image-30"}>
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
            </div>
        </div>
    );
}

export default App;
