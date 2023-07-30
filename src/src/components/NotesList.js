import '../styles/notes.css';

import OneNote from "../components/OneNote";
import React from "react";
import {ReactComponent as PlusImage} from '../img/Plus.svg';

const NotesList = ({notes, changeNote, dropNote, addNote}) => {
    return (<div className={`notes-list`}>
            {notes.map((note, index) => (
                <OneNote note={note} index={index} key={index} changeNote={changeNote} dropNote={dropNote}
                         notes={notes}/>))}
            <div className={`notes__add-note`} onClick={addNote}>
                <PlusImage className={"notes__add-note-plus-svg"} alt={"Add"}/>
            </div>
        </div>);
};

export default NotesList;
