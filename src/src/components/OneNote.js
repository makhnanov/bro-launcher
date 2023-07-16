import Cross from '../img/cross-mark-svgrepo-com.svg'
import {ChangeEvent, useEffect, useLayoutEffect, useRef} from "react";

const OneNote = ({note, index, changeNote, dropNote, notes}) => {

    const ref = useRef(null);

    const handleInput = (e) => {
        if (ref.current) {
            // ref.current.style.height = "auto";
            ref.current.style.height = "1px";
            ref.current.style.height = `${e.target.scrollHeight}px`;
        }
    };

    function adjustHeight() {
        if (ref.current) {
            // ref.current.style.height = "inherit";
            ref.current.style.height = "1px";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    }

    useEffect(() => {
        console.log('useEffect');
        adjustHeight()
    }, [notes]);

    // useLayoutEffect(() => {
    //     console.log('useLayoutEffect');
    //     adjustHeight()
    // }, []);

    return (
        <div className={`one-note`} key={index}>
            <div className={"note-close-button"} style={{backgroundImage: `url(${Cross})`}} onClick={(e) => {
                dropNote(index);
            }}/>
            <textarea
                className={'one-note-textarea'}
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
