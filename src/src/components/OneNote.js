import Cross from '../img/cross-mark-svgrepo-com.svg';
import EyeClosed from '../img/eyeClosed.svg';
import DontKnow from '../img/question.png';
import {useEffect, useRef, useState} from "react";
import LinksColumn from './LinksColumn';
import Sun from '../img/sun-svgrepo-com.svg';
import Moon from '../img/moon-svgrepo-com.svg';

const OneNote = ({
                     note,
                     index,
                     changeNote,
                     dropNote,
                     notes,
                     changeNoteSize,
                     activeTarget,
                     setActiveTarget,
                     activeIndex,
                     setActiveIndex,
                     changeNoteHidden,
                     changeNoteMode,
                     type,
                     setNoteMinHeight
                 }) => {
    const ref = useRef(null);

    let magic = 6;

    const resizeWhenTyping = (e) => {
        if (ref.current) {
            let lastScrollHeight = e.target.scrollHeight;
            ref.current.style.removeProperty("min-height")
            ref.current.style.height = 27 + "px";
            ref.current.style.minHeight = (e.target.scrollHeight + 8) + "px";
            note.minHeight = e.target.scrollHeight + 8;
            setNoteMinHeight(index, note.minHeight)
            ref.current.style.height = parseInt(lastScrollHeight) + 8 + "px";
            if (e.target.scrollHeight > note.height) {
                ref.current.style.height = (e.target.scrollHeight + 8) + "px";
                note.height = (e.target.scrollHeight);
            }
            if (note.width) {
                ref.current.style.width = note.width - magic + 'px';
            }
        }
    };

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (ref.current) {
                if (ref.current.offsetHeight > ref.current.scrollHeight) {
                    note.height = ref.current.offsetHeight
                } else {
                    note.height = ref.current.scrollHeight
                }
                note.width = ref.current.offsetWidth
                if (note.width) {
                    changeNoteSize(index, note.width, note.height)
                }
            }
        });
        observer.observe(ref.current);

        if (note.height) {
            ref.current.style.height = (note.height - magic) + "px";
        }
        if (note.width) {
            ref.current.style.width = (note.width - magic) + 'px';
        }
        if (note?.minHeight) {
            ref.current.style.minHeight = note.minHeight + 'px';
        }

    }, []);

    let textChangedLinks = [];

    const isLink = (str) => {
        return str.startsWith('tg://') ||
            str.startsWith('http://') ||
            str.startsWith('https://') ||
            str.startsWith('phpstorm://') ||
            str.startsWith('webstorm://') ||
            str.startsWith('rocketchat://') ||
            str.startsWith('anyprogram://');
    }
    const isColor = (str) => {
        return str === 'red' ||
            str === 'green' ||
            str === 'yellow' ||
            str === 'blue';
    }
    note?.content?.split('\n').forEach((line, index) => {
        let words = line.split(' ');
        let color = null;
        let url = null;

        for (let i = 0; i < words.length; i++) {
            if (isLink(words[i])) {
                url = words[i];
            }
            if (isColor(words[i])) {
                color = words[i];
            }
        }
        if (url) {
            textChangedLinks.push({url: url, index: index, color: color})
            return
        }
        words = note?.contentReal?.split('\n')[index]?.split(' ') || [];
        for (let i = 0; i < words.length; i++) {
            if (isLink(words[i])) {
                url = words[i];
            }
            if (isColor(words[i])) {
                color = words[i];
            }
        }
        if (url) {
            textChangedLinks.push({url: url, index: index, color: color})
        }
    })

    const [links, setLinks] = useState(textChangedLinks);

    return (<div className={`one-note`} key={index} style={{
        display:
            (type === "hidden" && note?.hidden) || (type === "active" && !note?.hidden)
                ? "flex"
                : "none"
    }}>
        <LinksColumn links={links} noteHidden={note?.hidden}>
        </LinksColumn>
        <div
            className={"where-note-container-wrapper"}
            onClick={() => {
                if (note?.hidden) {
                    changeNoteHidden(index);
                }
            }}
            style={{
                overflow: "hidden",
                backgroundColor: "#ffc107",
                minWidth: note?.hidden ? '100px' : '',
                maxWidth: note?.hidden ? '100px' : '',
                minHeight: note?.hidden ? '41px' : '',
                maxHeight: note?.hidden ? '41px' : '',
                border:
                    note?.hidden && note.content.split("\n").pop().match(/border: (#[0-9a-f]{3,6});/i)
                        ? "2px solid " + note.content.split("\n").pop().match(/border: (#[0-9a-f]{3,6});/i)[1]
                        : "2px solid #ffc107",
                background:
                    note?.hidden && note.content.split("\n").pop().match(/background: (#[0-9a-f]{3,6});/i)
                        ? note.content.split("\n").pop().match(/background: (#[0-9a-f]{3,6});/i)[1]
                        : "#ffc107",
            }}
        >
            <div
                className={"where-note-container"}
                style={{
                    display: note?.hidden ? 'flex' : 'none',
                }}
            >
                <div
                    className={"where-text"}
                    style={{
                        overflowWrap: 'anywhere',
                        color:
                            note?.hidden && note.content.split("\n").pop().match(/color: (#[0-9a-f]{3,6});/i)
                                ? note.content.split("\n").pop().match(/color: (#[0-9a-f]{3,6});/i)[1]
                                : "",
                    }}>
                    {note.content.length
                        ? note.content.split("\n")[0]
                        : "Note " + (index + 1) + " hidden"
                    }
                </div>
            </div>
            <textarea
                style={{
                    visibility: note?.hidden ? 'hidden' : 'visible',
                    position: note?.hidden ? 'absolute' : 'relative',
                }}
                className={`one-note-textarea ${note?.mode ? 'one-note-textarea_night' : ''}`}
                value={note.content}
                ref={ref}
                rows={1}
                placeholder="Enter text here..."
                onInput={resizeWhenTyping}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                onChange={(e) => {

                    let newVisible = [];
                    let newHidden = [];

                    let save = (visible, hidden) => {
                        newVisible.push(visible)
                        newHidden.push(hidden)
                    }

                    e.target.value.split('\n').forEach((line, i) => {
                        let latestHidden = (note?.contentReal || '').split('\n')[i] || '';
                        let latestVisible = (note?.content || '').split('\n')[i] || '';

                        let split = line.split('///')
                        let visible = split[0] + '///';
                        let invisible = split.slice(1).join('///');

                        if (invisible) {
                            if (
                                latestVisible.endsWith('///') &&
                                line !== latestVisible.slice(0, -1)
                            ) {
                                save(latestVisible, latestHidden)
                            } else {
                                save(visible, invisible)
                            }
                        } else {
                            if (
                                latestVisible.endsWith('///')
                                && line === latestVisible.slice(0, -1)
                            ) {
                                save(line + latestHidden, '')
                                return;
                            }
                            save(line, latestHidden)
                        }
                    })

                    newVisible.forEach((visible, i) => {
                        let url = null;
                        let color = null;

                        let word = visible.split(' ');
                        for (let j = 0; j < word.length; j++) {
                            if (isLink(word[j])) {
                                url = word[j];
                                break;
                            }
                        }
                        for (let j = 0; j < word.length; j++) {
                            if (isColor(word[j])) {
                                color = word[j];
                                break;
                            }
                        }
                        if (url) {
                            textChangedLinks.push({url: url, index: i, color: color})
                            return;
                        }

                        word = newHidden[i].split(' ');
                        for (let j = 0; j < word.length; j++) {
                            if (isLink(word[j])) {
                                url = word[j];
                                break;
                            }
                        }
                        for (let j = 0; j < word.length; j++) {
                            if (isColor(word[j])) {
                                color = word[j];
                                break;
                            }
                        }
                        if (url) {
                            textChangedLinks.push({url: url, index: i, color: color})
                        }
                    })

                    // ToDo: detect new line drop and drop it from real

                    setLinks(textChangedLinks);
                    changeNote(index, newVisible.join('\n'), newHidden.join('\n'))
                }}
            />
        </div>

        <div className={"note-action-buttons"}>
            <div
                className={"note-mode-button"}
                style={{
                    backgroundImage: note?.mode ? `url(${Sun})` : `url(${Moon})`,
                    visibility: note?.hidden ? 'hidden' : 'visible'
                }}
                onClick={(e) => {
                    changeNoteMode(index);
                }}
            />
            <div className={"note-hide-button"}
                 style={{
                     backgroundImage: `url(${EyeClosed})`, visibility: note?.hidden ? 'hidden' : 'visible'
                 }}
                 onClick={(e) => {
                     changeNoteHidden(index);
                 }}
            />
            <div
                className={"note-close-button"}
                style={{
                    backgroundImage: `url(${Cross})`, visibility: note?.hidden ? 'hidden' : 'visible'
                }}
                onClick={(e) => {
                    dropNote(index);
                }}
            />
        </div>
    </div>);
};

export default OneNote;
