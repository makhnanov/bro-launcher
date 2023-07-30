import React, {useState, useEffect} from "react";
import Item from "./Item";
import {ContextMenu} from "../styles/styles";
import "../styles/item.css";
import {ReactComponent as PlusImage} from '../img/Plus.svg';
import {useCopyToClipboard} from 'usehooks-ts';

const ItemContext = ({
                         bookmarks,
                         showModal,
                         showModalForEdit,
                         dataVersion,
                         setDataVersion,
                         exportData,
                         isMenuHidden,
                         settingsOneClick,
                         settingsLifetime,
                         suggestBackup,
                     }) => {

    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({x: 0, y: 0});
    const [contextMenuItemIndex, setContextMenuItemIndex] = useState(0);
    const [value, copy] = useCopyToClipboard();

    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const handleClick = (myLink, aux = false) => (e) => {
        if (e.button === 2) {
            return;
        }
        if (e.button === 1 && aux) {
            window.open(myLink, '_blank');
        } else {
            window.open(myLink, '_parent');
        }
    }

    const deleteItem = () => {
        bookmarks.splice(contextMenuItemIndex, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        setDataVersion(dataVersion + 1);
        if (suggestBackup) {
            exportData();
        }
    };

    const editItem = () => {
        showModalForEdit(contextMenuItemIndex);
    };

    // 86400000 - ms в дне
    const birthDay = '1996-11-30T00:00:00.000Z';
    const estimatedLifeTime = '2088-11-30T00:00:00.000Z';

    const totalLifeInDays = (Date.parse(estimatedLifeTime) - Date.parse(birthDay)) / 86400000;
    const alreadyLifeInDays = (Date.parse(new Date()) - Date.parse(birthDay)) / 86400000;

    const fixed = 5;

    const lifePercent = Math.trunc((alreadyLifeInDays * 100) / totalLifeInDays);
    const lifeDecimals = ((alreadyLifeInDays * 100) / totalLifeInDays % 1).toFixed(fixed);
    const estimateDecimals = (1 - lifeDecimals).toFixed(fixed);

    return (
        <div className={`grid-container-wrapper ${isMenuHidden ? 'grid-container-wrapper_menu-hidden' : ''}`}>
            <div className='grid-container'>

                <div className="item item-1-life" style={{display: settingsLifetime ? "" : "none"}}>
                    <h1 className={'item-1-life__already_percent'}>
                        {lifePercent}%
                    </h1>
                    <h4 className={'item-1-life__already_decimal'}>
                        {lifeDecimals}
                    </h4>
                    <div className={'item-1-life__separator'}></div>
                    <h1 className={'item-1-life__estimate_percent'}>
                        {100 - lifePercent}%
                    </h1>
                    <h4 className={'item-1-life__estimate_decimal'}>
                        {estimateDecimals}
                    </h4>
                </div>

                {bookmarks.map((item, index) => (
                    <div
                        className="item"
                        onClick={settingsOneClick ? handleClick(item.onClick) : null}
                        onDoubleClick={!settingsOneClick ? handleClick(item.onClick) : null}
                        onAuxClick={handleClick(item.onClick, true)}
                        key={index}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setClicked(true);
                            setPoints({x: e.pageX, y: e.pageY});
                            setContextMenuItemIndex(index)
                        }}
                    >
                        <Item item={item}/>
                    </div>
                ))}

                <div className="item item-plus" onClick={() => showModal()}>
                    <PlusImage className={"item-image-icon"} alt={"Add"} />
                </div>

                {clicked && (
                    <ContextMenu top={points.y} left={points.x}>
                        <ul className={'context-menu'}>
                            <li onClick={editItem}>Edit</li>
                            <li onClick={() => copy(bookmarks[contextMenuItemIndex].img)}>Copy Image</li>
                            <li onClick={() => copy(bookmarks[contextMenuItemIndex].link)}>Copy Link</li>
                            <li className={'context-menu-nothing'}>Nothing</li>
                            {/*<li>Duplicate</li>*/}
                            {/*<li>To Archive</li>*/}
                            {/*<li>Trash</li>*/}
                            <li onClick={deleteItem}>Delete</li>
                        </ul>
                    </ContextMenu>
                )}

            </div>
        </div>
    );
};

export default ItemContext;
