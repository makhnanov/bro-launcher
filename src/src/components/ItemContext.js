import React, { useState, useEffect } from "react";
import Item from "./Item";
import { ContextMenu } from "../styles/styles";
import "../styles/item.css";
import Plus from "../img/Plus.svg";

const ItemContext = ({ bookmarks, showModal, showModalForEdit, dataVersion, setDataVersion, exportData }) => {

    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({ x: 0,  y: 0 });
    const [contextMenuItemIndex, setContextMenuItemIndex] = useState(0);

    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const handleClick = (myLink) => () => {
        window.open(myLink, '_parent');
    }

    const deleteItem = () => {
        bookmarks.splice(contextMenuItemIndex, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        setDataVersion(dataVersion + 1);
        exportData();
    };

    const editItem = () => {
        showModalForEdit(contextMenuItemIndex);
    };

    // 86400000 - ms в дне
    const birthDay = '1996-11-30T00:00:00.000Z';
    const estimatedLifeTime = '2088-11-30T00:00:00.000Z';

    const totalLifeInDays = (Date.parse(estimatedLifeTime) - Date.parse(birthDay)) / 86400000;
    const alreadyLifeInDays = (Date.parse(new Date()) - Date.parse(birthDay)) / 86400000;

    const lifePercent = Math.trunc((alreadyLifeInDays * 100) / totalLifeInDays);
    const lifeDecimals = ((alreadyLifeInDays * 100) / totalLifeInDays % 1).toFixed(6);
    const estimateDecimals = (1 - lifeDecimals).toFixed(6);

    return (
        <div className='grid-container'>

            <div className="item item-life">
                <h1>
                    {lifePercent}%
                </h1>
                <h4>
                    {lifeDecimals}
                </h4>
                <div className={'item-life__separator'}></div>
                <h1>
                    {100 - lifePercent}%
                </h1>
                <h4>
                    {estimateDecimals}
                </h4>
            </div>

            <div className="item plus-container" onClick={() => showModal()}>
                <div>
                    <div>
                        <img src={Plus} alt="Plus" className={`item-image-icon`}></img>
                    </div>
                </div>
            </div>

            {bookmarks.map((item, index) => (

                <div
                    className="item"
                    onClick={handleClick(item.onClick)}
                    key={index}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        setClicked(true);
                        setPoints({ x: e.pageX,  y: e.pageY });
                        setContextMenuItemIndex(index)
                    }}
                >
                    <Item item={item} />
                </div>

            ))}

            {clicked && (
                <ContextMenu top={points.y} left={points.x}>
                    <ul className={'context-menu'}>
                        <li onClick={editItem}>Edit</li>
                        {/*<li>Copy</li>*/}
                        <li className={'context-menu-nothing'}>Nothing</li>
                        {/*<li>Duplicate</li>*/}
                        {/*<li>Move To Trash</li>*/}
                        <li onClick={deleteItem}>Delete</li>
                    </ul>
                </ContextMenu>
            )}

        </div>
    );
};
export default ItemContext;
