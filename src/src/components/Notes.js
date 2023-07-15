import React, {useState} from "react";
import '../styles/notes.css';
import {ReactComponent as PlusImage} from '../img/Plus.svg';
import NotesList from "../components/NotesList";

const Notes = ({menuHidden}) => {
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes') ?? '[]'))

    const addNote = () => {
        let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
        newNotes.push({content: ""})
        setNotes(newNotes)
        localStorage.setItem("notes", JSON.stringify(newNotes))
    }

    const changeNote = (index, value) => {
        let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
        newNotes[index].content = value;
        setNotes(newNotes)
        localStorage.setItem("notes", JSON.stringify(newNotes))
    }

    const dropNote = (index) => {
        if (window.confirm('Are you sure to delete?')) {
            let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
            newNotes.splice(index, 1);
            setNotes(newNotes)
            localStorage.setItem("notes", JSON.stringify(newNotes))
        }
    }

    return (
        <div className={`notes ${menuHidden ? 'notes_to-right' : ''}`}>
            <NotesList notes={notes} changeNote={changeNote} dropNote={dropNote}/>
            <div className={'notes__add-note'} onClick={addNote}>
                <PlusImage className={"notes__add-note-plus-svg"} alt={"Add"} />
            </div>
        </div>
    );
};

export default Notes;
