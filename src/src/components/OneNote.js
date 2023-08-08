import Cross from '../img/cross-mark-svgrepo-com.svg';
import EyeClosed from '../img/eyeClosed.svg';
import DontKnow from '../img/question.png';
import {useEffect, useRef, useState} from "react";
import LinksColumn from './LinksColumn';
import Sun from '../img/sun-svgrepo-com.svg';
import Moon from '../img/moon-svgrepo-com.svg';


const OneNote = ({
                     note,
                     index,
                     changeNote,
                     dropNote,
                     notes,
                     changeNoteSize,
                     activeTarget,
                     setActiveTarget,
                     activeIndex,
                     setActiveIndex,
                     changeNoteHidden,
                     changeNoteMode
                 }) => {
    const ref = useRef(null);

    let magic = 6;

    const resizeWhenTyping = (e) => {
        if (ref.current) {
            let lastScrollHeight = e.target.scrollHeight;
            ref.current.style.removeProperty("min-height")
            ref.current.style.height = 19 + "px";
            ref.current.style.minHeight = (e.target.scrollHeight + 8) + "px";
            ref.current.style.height = parseInt(lastScrollHeight) + 8 + "px";
            if (e.target.scrollHeight > note.height) {
                ref.current.style.height = (e.target.scrollHeight + 8) + "px";
                note.height = (e.target.scrollHeight);
            }

            if (note.width) {
                ref.current.style.width = note.width - magic + 'px';
            }
        }
    };

    useEffect(() => {
        ref.current.style.height = 19 + "px";
        ref.current.style.minHeight = ref.current.scrollHeight + magic + "px";

        const observer = new ResizeObserver(() => {
            if (ref.current) {
                if (ref.current.offsetHeight > ref.current.scrollHeight) {
                    note.height = ref.current.offsetHeight
                } else {
                    note.height = ref.current.scrollHeight
                }
                note.width = ref.current.offsetWidth
                changeNoteSize(index, note.width, note.height)
            }
        });
        observer.observe(ref.current);

        if (note.height) {
            ref.current.style.height = (note.height - magic) + "px";
        }
        if (note.width) {
            ref.current.style.width = (note.width - magic) + 'px';
        }

    }, []);

    let textChangedLinks = [];
    note.content.split('\n').forEach((e, index) => {
        if (e.startsWith('http://') || e.startsWith('https://')) {
            textChangedLinks.push({url: e, index: index})
        }
    })

    const [links, setLinks] = useState(textChangedLinks);

    return (<div className={`one-note`} key={index}>
        <LinksColumn links={links} noteHidden={note?.hidden}>
        </LinksColumn>
        <div
            className={"where-note-container-wrapper"}
            onClick={(e) => {
                changeNoteHidden(index);
                // resizeRef();
            }}
            style={{
                overflow: "hidden",
                backgroundColor: "#ffc107",
                border: '2px solid #ffc107',
                maxWidth: !note?.hidden ? 'unset' : '',
                minWidth: !note?.hidden ? 'unset' : '',
                minHeight: !note?.hidden ? 'unset' : '',
            }}
        >
            <div
                className={"where-note-container"}
                style={{display: note?.hidden ? 'flex' : 'none'}}
            >
                <div className={"where-text"}>
                    Note {index + 1} hidden
                </div>
                <img src={DontKnow} alt={"Where?"} className={'where-note'}/>
            </div>
            <textarea
                style={{
                    visibility: note?.hidden ? 'hidden' : 'visible',
                    position: note?.hidden ? 'absolute' : 'relative',
                }}
                className={`one-note-textarea ${note?.mode ? 'one-note-textarea_night' : ''}`}
                value={note.content}
                ref={ref}
                rows={1}
                placeholder="Enter text here..."
                onInput={resizeWhenTyping}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                onChange={(e) => {
                    let textChangedLinks = [];
                    e.target.value.split('\n').forEach((e, index) => {
                        if (e.startsWith('http://') || e.startsWith('https://')) {
                            // console.log(index)
                            textChangedLinks.push({url: e, index: index})
                        }
                    });
                    setLinks(textChangedLinks);
                    changeNote(index, e.target.value)
                }}
            />
        </div>

        <div className={"note-action-buttons"}>
            <div
                className={"note-mode-button"}
                style={{
                    backgroundImage: note?.mode ? `url(${Sun})` : `url(${Moon})`,
                    visibility: note?.hidden ? 'hidden' : 'visible'
                }}
                onClick={(e) => {
                    changeNoteMode(index);
                }}
            />
            <div className={"note-hide-button"}
                 style={{
                     backgroundImage: `url(${EyeClosed})`, visibility: note?.hidden ? 'hidden' : 'visible'
                 }}
                 onClick={(e) => {
                     changeNoteHidden(index);
                 }}
            />
            <div
                className={"note-close-button"}
                style={{
                    backgroundImage: `url(${Cross})`, visibility: note?.hidden ? 'hidden' : 'visible'
                }}
                onClick={(e) => {
                    dropNote(index);
                }}
            />
        </div>
    </div>);
};

export default OneNote;
