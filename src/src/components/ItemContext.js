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

    return (
        <div className='grid-container'>
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

            <div className="item plus-container" onClick={() => showModal()}>
                <div>
                    <div>
                        <img src={Plus} alt="Plus" className={`item-image-icon`}></img>
                    </div>
                </div>
            </div>

            {clicked && (
                <ContextMenu top={points.y} left={points.x}>
                    <ul className={'context-menu'}>
                        <li onClick={editItem}>Edit</li>
                        {/*<li>Copy</li>*/}
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
