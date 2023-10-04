import React from "react";
import LinkImg from "../img/link.svg"
import Jira from "../img/Jira.png"
import Figma from "../img/Figma.png"
import GoogleDrive from "../img/icons8-google-drive-48.png"
import GoogleSheets from "../img/icons8-google-sheets.svg"
import GoogleDocs from "../img/icons8-google-docs.svg"

const LinksColumn = ({links, noteHidden}) => {
    return (<div className={`links-column`} style={{
        display: noteHidden ? 'none' : '',
        width: noteHidden || !links.length ? "0" : "20px",
    }}>
        {links.map((link, index) => (
            <div
                key={index}
                className={'link-container'} style={{
                    top: ((15.1 * (link.index))) + "px",
                }}
                onClick={() => window.open(link.url.split(' ')[0], '_self')}
                onAuxClick={() => window.open(link.url.split(' ')[0], '_blank')}
            >
                <img
                    src={
                        link.url.toLowerCase().includes('jira')
                            ? Jira
                            : link.url.toLowerCase().includes('figma')
                                ? Figma
                                : link.url.toLowerCase().startsWith('https://docs.google.com/spreadsheets')
                                    ? GoogleSheets
                                    : link.url.toLowerCase().startsWith('https://docs.google.com/document')
                                        ? GoogleDocs
                                        :  link.url.toLowerCase().startsWith('https://drive.google.com/drive')
                                            ? GoogleDrive
                                            : LinkImg
                    }
                    alt={'Link'}
                    className={`link-icon 
                    ${
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
                />
            </div>
        ))}
    </div>)
}

export default LinksColumn;


