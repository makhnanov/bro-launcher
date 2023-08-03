import React from "react";
import LinkImg from "../img/link.svg"

const LinksColumn = ({links, noteHidden}) => {
    return (<div className={`links-column`} style={{display: noteHidden ? 'none' : ''}}>
        {links.map((link, index) => (
            <div className={'link-container'} style={{
                top: ((15.1 * (link.index))) + "px"
            }}>
                <a href={link.url} target={"_blank"} className={'link-a'} >
                    <img src={LinkImg} alt={'Link'} className={'link-icon'}/>
                </a>
            </div>
        ))}
    </div>)
}

export default LinksColumn;
