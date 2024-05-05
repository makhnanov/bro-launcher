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

    const changeNoteContent = (index, value, real) => {
        let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
        newNotes[index].content = value;
        newNotes[index].contentReal = real;
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes))
    }

    const changeNoteSize = (index, width, height) => {
        let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
        newNotes[index].width = width;
        newNotes[index].height = height;
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes))
    }

    const setNoteMinHeight = (index, height) => {
        let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
        newNotes[index].minHeight = height;
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes))
    }

    const changeNoteHidden = (index) => {
        let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
        newNotes[index].hidden = !(newNotes[index]?.hidden ?? false);
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes))
    }

    const changeNoteMode = (index) => {
        let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
        newNotes[index].mode = !(newNotes[index]?.mode ?? false);
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(newNotes))
    }

    const dropNote = (index) => {
        if (window.confirm('Are you sure you want to delete?')) {
            let newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]');
            newNotes.splice(index, 1);
            setNotes(newNotes);
            localStorage.setItem("notes", JSON.stringify(newNotes))
        }
    }

    return (<div
            className={`notes ${menuHidden ? 'notes_to-right' : ''}`}
            // className={`notes`}
            style={{display: settingsNotes ? "" : "none"}}
        >
            <NotesList
                notes={notes}
                changeNote={changeNoteContent}
                dropNote={dropNote}
                addNote={addNote}
                changeNoteSize={changeNoteSize}
                changeNoteHidden={changeNoteHidden}
                changeNoteMode={changeNoteMode}
                setNoteMinHeight={setNoteMinHeight}
            />
        </div>);
};

export default Notes;
