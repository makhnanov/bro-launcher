import Cross from '../img/cross-mark-svgrepo-com.svg'
import {ChangeEvent, useEffect, useLayoutEffect, useRef} from "react";

const OneNote = ({note, index, changeNote, dropNote}) => {

    const ref = useRef(null);

    const handleInput = (e) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${e.target.scrollHeight}px`;
        }
    };

    function adjustHeight() {
        ref.current.style.height = "inherit";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
    }

    useEffect(adjustHeight, []);
    useLayoutEffect(adjustHeight, []);

    return (
        <div className={`one-note`} key={index}>
            <div className={"note-close-button"} style={{backgroundImage: `url(${Cross})`}} onClick={() => {
                dropNote(index);
            }}/>
            <textarea
                value={note.content}
                ref={ref}
                rows={1}
                placeholder="Enter text here..."
                onInput={handleInput}
                onChange={(e) => {
                changeNote(index, e.target.value)
            }}/>
        </div>
    );
};

export default OneNote;
