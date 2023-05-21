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

import './App.css';

import Modal from "react-overlays/Modal";

import React, {useState, useEffect} from "react";

import ItemContext from "./components/ItemContext";

document.title = 'BRO Launcher';

const appVersion = '1.0.0';

const addNewBookmark = () => () => {
    alert('add new modal window here');
}

const handleAlertClick = (text) => () => {
    alert(text)
}

function App() {
    const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks') ?? '[]'));

    const [dataVersion, setDataVersion] = useState(parseInt(localStorage.getItem('dataVersion') ?? '0'));

    // console.log('dataVersion');
    // console.log(localStorage.getItem('dataVersion'));

    const [isActive, setIsActive] = useState(localStorage.getItem('isActive') === 'true');

    const [showModal, setShowModal] = useState(false);

    const [indexForEdit, setIndexForEdit] = useState(null);

    const [newBookmarkLink, setNewBookmarkLink] = useState('');
    const [newBookmarkImage, setNewBookmarkImage] = useState('');
    const [newBookmarkImageStyle, setNewBookmarkImageStyle] = useState('');
    const [newBookmarkText, setNewBookmarkText] = useState('');

    const [file, setFile] = useState();

    const renderBackdrop = (props) => <div className="backdrop" {...props} />;

    let handleClose = () => {
        setIndexForEdit(null);
        setShowModal(false);
        setNewBookmarkLink('');
        setNewBookmarkText('');
    }

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
        setFile(event.target.files[0])

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

    // useEffect(() => {
    //     // console.log('useEffect')
    //     // console.log(parseInt(localStorage.getItem('dataVersion') ?? '0'))
    //     // console.log(dataVersion)
    //     // if (parseInt(localStorage.getItem('dataVersion') ?? '0') !== dataVersion) {
    //     //     localStorage.setItem('dataVersion', dataVersion.toString());
    //     //     exportData();
    //     // }
    // }, [dataVersion]);

    let handleSuccess = () => {

        const newBookmarks = JSON.parse(localStorage.getItem('bookmarks') ?? '[]');

        if (indexForEdit === null) {
            newBookmarks.unshift({
                'onClick': newBookmarkLink,
                'img': Without,
                'imgStyle': newBookmarkImageStyle,
                'text': newBookmarkText,
            });
        } else {
            newBookmarks[indexForEdit].onClick = newBookmarkLink;
            newBookmarks[indexForEdit].text = newBookmarkText;
        }

        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setBookmarks(newBookmarks);

        setShowModal(false);

        setNewBookmarkLink('');
        setNewBookmarkText('');

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
        setNewBookmarkLink(e.target.value);
    };
    const handleBookmarkImageChange = (e) => {
        setNewBookmarkImage(e.target.value);
    };
    const handleBookmarkImageStyleChange = (e) => {
        setNewBookmarkImageStyle(e.target.value);
    };
    const handleBookmarkTextChange = (e) => {
        setNewBookmarkText(e.target.value);
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

    function needShowModal() {
        setIndexForEdit(null);
        setShowModal(true);
    }

    function needShowModalForEdit(index) {
        setIndexForEdit(index);
        setNewBookmarkLink(bookmarks[index].onClick);
        setNewBookmarkText(bookmarks[index].text);
        setShowModal(true);
    }

    return (
        <div className="App"
             onClick={(e) => {
                 unLockScreen(e)
             }}
             style={{filter: !isActive ? 'none' : '', backgroundColor: !isActive ? 'rgba(0, 0, 0, 0)' : ''}}
        >
            <div className="App-header" style={{visibility: !isActive ? 'hidden' : ''}}>

                <div className="item-max-header">

                    <div className="launcher">
                        BRO Launcher
                        <span className="logo-version-text"
                              onClick={() => {
                                  window.open('webstorm://open?url=file:///var/www/bookmarks/&line=95')
                              }}>
                            v.{appVersion}
                        </span>
                    </div>

                    {/*<div className="">*/}
                    {/*    Editor*/}
                    {/*</div>*/}

                    <div className="" onClick={exportData}>
                        Backup
                    </div>

                    <div className="">
                        <label className="custom-file-upload">
                            <input type="file" className="import-button" onChange={importData}/>
                            Import
                        </label>
                    </div>

                    <div className="" onClick={lockScreen}>
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
                             exportData={exportData}/>

                <div className="item-max">
                    <div className="y-wrapper" onClick={() => window.open('https://youtube.com/', '_parent')}>
                        <img src={YouTube} className="y-img" alt="YouTube" width="200" height="50"></img>
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
                >
                    <div>

                        <div className="modal-header">
                            <div className="modal-title">Add New Bookmark</div>
                        </div>

                        <div className="modal-desc">

                            <p>Text:</p>
                            <input type="text" className="input-style" onChange={handleBookmarkTextChange}
                                   value={newBookmarkText}/>

                            <p>Link:</p>
                            {/*or AnyProgram executor*/}
                            <input type="text" className="input-style" onChange={handleBookmarkLinkChange}
                                   value={newBookmarkLink}/>

                            {/*<p>Image:</p>*/}
                            {/*<input type="text" className="input-style" onChange={handleBookmarkImageChange}*/}
                            {/*       value={newBookmarkImage}/>*/}

                            {/*<div className="image-style-selector-block">*/}
                            {/*    <label htmlFor="image-style">ImageStyle:</label>*/}
                            {/*    <div className="input-style">*/}
                            {/*        <select name="image-style" id="image-style-id" className="input-style"*/}
                            {/*                onChange={handleBookmarkImageStyleChange} value={newBookmarkImageStyle}>*/}
                            {/*            <option value="round-image-50">Round 50</option>*/}
                            {/*            <option value="round-image-20">Round 20</option>*/}
                            {/*            <option value="none">None</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

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
    );
}

export default App;
