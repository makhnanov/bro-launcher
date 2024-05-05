import '../styles/notes.css';

import OneNote from "../components/OneNote";
import React, {useState} from "react";
import {ReactComponent as PlusImage} from '../img/Plus.svg';
import {ReactComponent as SettingImage} from '../img/setting-svgrepo-com.svg';

const NotesList = ({notes, changeNote, dropNote, addNote, changeNoteSize, changeNoteHidden, changeNoteMode, setNoteMinHeight}) => {

    const [activeTarget, setActiveTarget] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    return (<div className={`notes-list`}>
        <div className={"closed-notes"}>
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
                         changeNoteHidden={changeNoteHidden}
                         changeNoteMode={changeNoteMode}
                         type={"hidden"}
                         setNoteMinHeight={setNoteMinHeight}
                />))
            }
        </div>
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
                     changeNoteHidden={changeNoteHidden}
                     changeNoteMode={changeNoteMode}
                     type={"active"}
                     setNoteMinHeight={setNoteMinHeight}
            />))
        }
        <div className={`notes__settings`} onClick={() => {
            alert('WIP. Please wait new release.');
        }}>
            <SettingImage className={"notes__add-note-plus-svg"} alt={"Add"}/>
        </div>
        <div className={`notes__add-note`} onClick={addNote}>
            <PlusImage className={"notes__add-note-plus-svg"} alt={"Add"}/>
        </div>
    </div>);
};

export default NotesList;
