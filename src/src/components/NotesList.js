import '../styles/notes.css';

import OneNote from "../components/OneNote";
import React, {useState} from "react";
import {ReactComponent as PlusImage} from '../img/Plus.svg';

const NotesList = ({notes, changeNote, dropNote, addNote, changeNoteSize}) => {

    const [activeTarget, setActiveTarget] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    return (<div className={`notes-list`}>
            {notes.map((note, index) => (
                <OneNote note={note}
                         index={index}
                         key={index}
                         changeNote={changeNote}
                         dropNote={dropNote}
                         notes={notes}
                         changeNoteSize={changeNoteSize}
                         activeTarget={activeTarget}
                         setActiveTarget={setActiveTarget}
                         activeIndex={activeIndex}
                         setActiveIndex={setActiveIndex}
                />))}
            <div className={`notes__add-note`} onClick={addNote}>
                <PlusImage className={"notes__add-note-plus-svg"} alt={"Add"}/>
            </div>
        </div>);
};

export default NotesList;
