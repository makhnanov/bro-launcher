import Cross from '../img/cross-mark-svgrepo-com.svg'
import EyeClosed from '../img/eyeClosed.svg'
import DontKnow from '../img/question.png'
import {useEffect, useRef, useState} from "react";

const OneNote = ({note, index, changeNote, dropNote, notes}) => {

    const ref = useRef(null);

    const getIndexName = () => {
        return "note_" + index + "_Hidden";
    }

    const getItemWidthKey = () => {
        return "note_" + index + "_width";
    }

    const getItemHeightKey = () => {
        return "note_" + index + "_height";
    }

    const [noteHidden, setNoteHidden] = useState(localStorage.getItem(getIndexName()) === "true");

    const [width, setWidth] = useState(localStorage.getItem(getItemWidthKey()) ?? null);
    const [height, setHeight] = useState(localStorage.getItem(getItemHeightKey()) ?? null);

    const toggleNoteHidden = () => {
        setNoteHidden(!noteHidden)
        localStorage.setItem(getIndexName(), (!noteHidden).toString())
    }

    const handleInput = (e) => {
        if (ref.current) {
            ref.current.style.height = "19px";
            if (e.target.scrollHeight > 18) {
                if (height) {
                    ref.current.style.height = height + 'px';
                } else {
                    ref.current.style.height = (e.target.scrollHeight - 4) + "px";
                }
                if (width) {
                    ref.current.style.width = width + 'px';
                }
            }
        }
    };

    function adjustHeight() {
        if (ref.current) {
            ref.current.style.height = "19px";
            if (ref.current.scrollHeight > 18) {
                if (height) {
                    ref.current.style.height = height + 'px';
                } else {
                    ref.current.style.height = (ref.current.scrollHeight - 4) + "px";
                }
                if (width) {
                    ref.current.style.width = width + 'px';
                }
            }
        }
    }

    useEffect(() => {
        adjustHeight()
    }, [notes]);

    function handleOnMouseUp(e) {
        let offsetWidth = e.target.offsetWidth - 6;
        setWidth(offsetWidth);
        localStorage.setItem(getItemWidthKey(), offsetWidth.toString());

        let offsetHeight = e.target.offsetHeight - 6;
        setHeight(offsetHeight);
        localStorage.setItem(getItemHeightKey(), offsetHeight.toString());
    }

    return (<div className={`one-note`} key={index}>
        <div
            onClick={toggleNoteHidden}
            style={{
                overflow: "hidden",
                backgroundColor: "#ffc107",
                borderRadius: 8 + "px",
                border: '2px solid #ffc107'
            }}
        >
            <div
                className={"where-note-container"}
                style={{display: noteHidden ? 'flex' : 'none'}}
            >
                <div className={"where-text"}>
                    Note {index + 1} hidden
                </div>
                <img src={DontKnow} alt={"Where?"} className={'where-note'}/>
            </div>
            <textarea
                style={{
                    visibility: noteHidden ? 'hidden' : 'visible'
                }}
                className={'one-note-textarea'}
                value={note.content}
                ref={ref}
                rows={1}
                placeholder="Enter text here..."
                onInput={handleInput}
                onClick={(e) => e.stopPropagation()}
                onMouseUp={handleOnMouseUp}
                onChange={(e) => {
                    changeNote(index, e.target.value)
                }}
            />
        </div>
        <div
            className={"note-close-button"}
            style={{
                backgroundImage: `url(${Cross})`,
                visibility: noteHidden ? 'hidden' : 'visible'
            }}
            onClick={(e) => {
                dropNote(index);
            }}
        />
        <div className={"note-hide-button"}
             style={{
                 backgroundImage: `url(${EyeClosed})`,
                 visibility: noteHidden ? 'hidden' : 'visible'
             }}
             onClick={(e) => {
                 toggleNoteHidden();
             }}
        />
    </div>);
};

export default OneNote;
