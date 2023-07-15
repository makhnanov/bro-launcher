
import '../styles/notes.css';

import OneNote from "../components/OneNote";

const NotesList = ({notes, changeNote, dropNote}) => {
    return (
        <div className={`notes-list`}>
            {notes.map((note, index) => (
                <OneNote note={note} index={index} key={index} changeNote={changeNote} dropNote={dropNote}/>
            ))}
        </div>
    );
};

export default NotesList;
