import Cross from '../img/cross-mark-svgrepo-com.svg'
import EyeClosed from '../img/eyeClosed.svg'
import DontKnow from '../img/question.png'
import {useEffect, useRef, useState} from "react";

const OneNote = ({note, index, changeNote, dropNote, notes}) => {

    const ref = useRef(null);

    const getIndexName = () => {
        return  "note_" + index + "_Hidden";
    }

    const [noteHidden, setNoteHidden] = useState(localStorage.getItem(getIndexName()) === "true");

    const toggleNoteHidden = () => {
        setNoteHidden(!noteHidden)
        localStorage.setItem(getIndexName(), (!noteHidden).toString())
    }

    const handleInput = (e) => {
        if (ref.current) {
            ref.current.style.height = "19px";
            if (e.target.scrollHeight > 19) {
                ref.current.style.height = (e.target.scrollHeight - 6) + "px";
            }
        }
    };

    function adjustHeight() {
        if (ref.current) {
            ref.current.style.height = "19px";
            if (ref.current.scrollHeight > 19) {
                ref.current.style.height = (ref.current.scrollHeight - 6) + "px";
            }
        }
    }

    useEffect(() => {
        console.log('useEffect');
        adjustHeight()
    }, [notes]);

    return (
        <div className={`one-note`} key={index}>
            <div
                onClick={toggleNoteHidden}
                style={{overflow: "hidden" ,backgroundColor: "#ffc107", borderRadius: 8 + "px", border: '2px solid #ffc107'}}
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
                    style={{ visibility: noteHidden ? 'hidden' : 'visible'}}
                    className={'one-note-textarea'}
                    value={note.content}
                    ref={ref}
                    rows={1}
                    placeholder="Enter text here..."
                    onInput={handleInput}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                        changeNote(index, e.target.value)
                    }}/>
            </div>
            <div
                className={"note-close-button"}
                style={{backgroundImage: `url(${Cross})`, visibility: noteHidden ? 'hidden' : 'visible'}}
                onClick={(e) => {
                dropNote(index);
            }}/>
            <div className={"note-hide-button"}
                 style={{backgroundImage: `url(${EyeClosed})`, visibility: noteHidden ? 'hidden' : 'visible'}}
                 onClick={(e) => {
                toggleNoteHidden();
            }}/>
        </div>
    );
};

export default OneNote;
