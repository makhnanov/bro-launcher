import Cross from '../img/cross-mark-svgrepo-com.svg';
import EyeClosed from '../img/eyeClosed.svg';
import DontKnow from '../img/question.png';
import {useEffect, useRef, useState} from "react";
import LinksColumn from './LinksColumn';

const OneNote = ({note, index, changeNote, dropNote, notes, changeNoteSize, activeTarget, setActiveTarget, activeIndex, setActiveIndex}) => {

    const ref = useRef(null);

    const getIndexName = () => {
        return "note_" + index + "_Hidden";
    }

    const getItemWidthKey = () => {
        return "note_" + index + "_width";
    }

    const getItemHeightKey = () => {
        return "note_" + index + "_height";
    }

    const [noteHidden, setNoteHidden] = useState(localStorage.getItem(getIndexName()) === "true");

    const [width, setWidth] = useState(localStorage.getItem(getItemWidthKey()) ?? null);
    const [height, setHeight] = useState(localStorage.getItem(getItemHeightKey()) ?? null);

    const toggleNoteHidden = () => {
        setNoteHidden(!noteHidden)
        localStorage.setItem(getIndexName(), (!noteHidden).toString())
    }
    // const toggleNoteMode = () => {
    //     setNoteMode(!noteHidden)
    //     localStorage.setItem(getIndexName(), (!noteHidden).toString())
    // }



    const handleInput = (e) => {
        if (ref.current) {
            ref.current.style.height = "19px";
            if (e.target.scrollHeight > 18) {
                if (note.height) {
                    ref.current.style.height = (e.target.scrollHeight) + "px";
                } else {
                    ref.current.style.height = (e.target.scrollHeight - 4) + "px";
                }
            }
            if (note.width) {
                ref.current.style.width = note.width + 'px';
            }
        }
    };

    function adjustHeight() {
        if (ref.current) {
            ref.current.style.height = "19px";
            if (ref.current.scrollHeight > 18) {
                if (note.height) {
                    // ref.current.style.height = note.height + 'px';
                    ref.current.style.height = (ref.current.scrollHeight) + "px";
                } else {
                    ref.current.style.height = (ref.current.scrollHeight - 4) + "px";
                }
            }
            if (note.width) {
                ref.current.style.width = note.width + 'px';
            }
        }
    }

    useEffect(() => {
        adjustHeight()
    }, [notes]);

    function handleOnMouseUp(e) {
        console.log('handleOnMouseUp');
        changeNoteSize(activeIndex, activeTarget.offsetWidth - 6,  activeTarget.offsetHeight - 6)
    }

    function handleOnMouseDown(e) {
        console.log('handleOnMouseDown');
        setActiveTarget(e.target)
        setActiveIndex(index)
    }

    let textChangedLinks = [];
    note.content.split('\n').forEach((e, index) => {
        if (e.startsWith('http://') || e.startsWith('https://')) {
            console.log(index)
            textChangedLinks.push({url: e, index: index})
        }
    })

    const [links, setLinks] = useState(textChangedLinks);

    return (<div className={`one-note`} key={index}>
        <LinksColumn links={links} noteHidden={noteHidden}>
        </LinksColumn>
        <div
            onClick={toggleNoteHidden}
            style={{
                overflow: "hidden", backgroundColor: "#ffc107", borderRadius: 8 + "px", border: '2px solid #ffc107'
            }}
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
                style={{
                    visibility: noteHidden ? 'hidden' : 'visible'
                }}
                className={'one-note-textarea'}
                value={note.content}
                ref={ref}
                rows={1}
                placeholder="Enter text here..."
                onInput={handleInput}
                onClick={(e) => {
                    console.log('onClick')
                    e.stopPropagation();
                }}
                // onMouseLeave={(e) => {
                //     console.log('onMouseLeave')
                // }}
                // onMouseUpCapture={(e) => {
                //     console.log('onMouseUpCapture')
                // }}
                onMouseDown={handleOnMouseDown}
                onMouseUp={handleOnMouseUp}
                onChange={(e) => {
                    let textChangedLinks = [];
                    e.target.value.split('\n').forEach((e, index) => {
                        if (e.startsWith('http://') || e.startsWith('https://')) {
                            // console.log(index)
                            textChangedLinks.push({url: e, index: index})
                        }
                    });
                    setLinks(textChangedLinks);
                    changeNote(index, e.target.value)
                }}
            />
        </div>
        {/*<div*/}
        {/*    className={"note-mode-button"}*/}
        {/*    style={{*/}
        {/*        backgroundImage: `url(${EyeClosed})`, visibility: noteHidden ? 'hidden' : 'visible'*/}
        {/*    }}*/}
        {/*    onClick={(e) => {*/}
        {/*        toggleNoteMode();*/}
        {/*    }}*/}
        {/*/>*/}
        <div
            className={"note-close-button"}
            style={{
                backgroundImage: `url(${Cross})`, visibility: noteHidden ? 'hidden' : 'visible'
            }}
            onClick={(e) => {
                dropNote(index);
            }}
        />
        <div className={"note-hide-button"}
             style={{
                 backgroundImage: `url(${EyeClosed})`, visibility: noteHidden ? 'hidden' : 'visible'
             }}
             onClick={(e) => {
                 toggleNoteHidden();
             }}
        />
    </div>);
};

export default OneNote;
