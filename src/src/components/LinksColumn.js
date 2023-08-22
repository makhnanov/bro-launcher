import React from "react";
import LinkImg from "../img/link.svg"
import Jira from "../img/Jira.png"

const LinksColumn = ({links, noteHidden}) => {
    return (<div className={`links-column`} style={{
        display: noteHidden ? 'none' : '',
        width: noteHidden || !links.length ? "0" : "20px",
    }}>
        {links.map((link, index) => (
            <div key={index} className={'link-container'} style={{
                top: ((15.1 * (link.index))) + "px",
            }}>
                <a href={link.url.split(' ')[0]} target={"_blank"} className={'link-a'} >
                    <img src={
                        link.url.toLowerCase().includes('jira')
                            ? Jira
                            : LinkImg
                    } alt={'Link'}
                         className={`link-icon ${
                             link.url.endsWith('red') ?
                                 'link-icon_red'
                                    : link.url.endsWith('green')
                                        ? "link-icon_green"
                                             : link.url.endsWith('blue')
                                                 ? "link-icon_blue"
                                                     : link.url.endsWith('yellow')
                                                         ? "link-icon_yellow"
                                                         : ""
                         }`}
                         style={{
                        height: link.url.toLowerCase().includes('jira')
                            ? "unset"
                            : "14px",
                    }}/>
                </a>
            </div>
        ))}
    </div>)
}

export default LinksColumn;
