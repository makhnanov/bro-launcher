import React from "react";

const Item = ({item}) => {
    return (
        <div className={'item-content'}>
            <div className={'item-image-container'}>
                <div className={`item-img-wrapper ${item.imgStyle}`}>
                    <img src={item.img}
                         alt="Alt"
                         className={`item-image-icon ${item.imgStyle}`}
                         draggable={"false"}
                         loading={"lazy"}></img>
                </div>
            </div>
            <div className="text-description-block">
                <div className={'text-description'}>
                    {item.text}
                </div>
            </div>
        </div>
    );
};

export default Item;
