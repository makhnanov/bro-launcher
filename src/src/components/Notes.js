import React, {useState} from "react";
import '../styles/notes.css';
import NotesList from "../components/NotesList";

const Notes = ({menuHidden, settingsNotes}) => {
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

    return (<div
            className={`notes ${menuHidden ? 'notes_to-right' : ''}`}
            style={{display: settingsNotes ? "" : "none"}}
        >
            <NotesList notes={notes} changeNote={changeNote} dropNote={dropNote} addNote={addNote}/>
        </div>);
};

export default Notes;
