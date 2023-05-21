import React from "react";

const Item = ({ item }) => {
    return (
        <div>
            <div>
                <img src={item.img} alt="Alt" className={`item-image-icon ${item.imgStyle}`}></img>
            </div>
            <div className="text-description">{item.text}</div>
        </div>
    );
};
export default Item;
