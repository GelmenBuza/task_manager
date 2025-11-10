import {useState} from 'react'
import style from './style.module.css'

export const Item = ({ item, onRemove, onUpdate, onMark, onUpdateTag}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isEditingTag, setIsEditingTag] = useState(false)
    const [editText, setEditText] = useState(item.text)
    const [isTagsVisible, setTagsVisible] = useState(false)
    const [editTag, setEditTag] = useState(item.tags ? item.tags.join(', ') : '');


    const renderTags = () => {
        return (
            <>
                <span>Теги:</span>
                <div className={style.tags_cont}>
                    {item.tags.map((tag, i) => (
                        <span key={i} className={style.tag}>{tag}</span>
                    ))}
                </div>
            </>
        )
    }

    const renderEditorTags = () => {
        return (
            <>
            <span className={style.edit_desc}>Введи новый тэг:</span>
                <input className={style.tags_edit_input}
                    type="text" 
                    value={editTag}
                    onChange={(e) => setEditTag(e.target.value)}
                />
            </>
        )
    }


    const renderDate = () => {
        return (
            <div className={style.date_cont}>
                <span>Задача до: </span>
                <span>{new Date(item.burnDate).toLocaleDateString('ru-RU')}</span>
            </div>
        )
    }

    const renderData = () => {

        const modeSwitchingTag = () => {
            if (isEditingTag) {
                onUpdateTag(item.id, editTag)
            } else {
                setEditTag(item.tags.join(', '))
            }
            setIsEditingTag(!isEditingTag)
        }


        return <>
            <button className={style.mark} onClick={() => onMark(item.id)}>
                {
                item.complited ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" stroke-width="0.5" stroke="#000"/></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" stroke-width="0.5" stroke="#000"/></svg>
                }
            </button>
            <button className={style.tags_btn} onClick={() => {setTagsVisible(!isTagsVisible)}}>Tags</button>
            <div className={isTagsVisible ? style.tags : style.tags_unvisible}>
                {isEditingTag ? renderEditorTags() : renderTags()}
                <button className={style.add_tag_btn} onClick={modeSwitchingTag}>
                    {
                    isEditingTag ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"/></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#969696ff" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm-6 4q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"/></svg>
                    }
                    </button>
            </div>
            <span className={style.item_text}>{item.text}</span>
            {item.burnDate ? renderDate() : <></>}
            <button className={style.list_delete} onClick={() => onRemove(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM7 6v13z"/></svg>
            </button>
        </>
    }

    const renderEditor = () => {
        return (
            <>
            <span className={style.edit_desc}>Введи новый текст:</span>
                <input className={style.list_edit_input}
                    type="text" 
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            </>
        )
    }

    const modeSwitching = () => {
        if (isEditing) {
            onUpdate(item.id, editText)
        } else {
            setEditText(item.text)
        }
        setIsEditing(!isEditing)
    }

    const taskStatus = () => {
        const today = new Date().toISOString().split('T')[0];
        if (item.complited) {
            return style.list_item_marked;
        }
        try {
            if (item.burnDate) {
                if (item.burnDate && item.burnDate.toISOString().split('T')[0] < today) {
                    return style.list_item_burned;
                }
            }
        } catch {
            if (item.burnDate) {
                if (item.burnDate && item.burnDate < today) {
                    return style.list_item_burned;
                }
            }
        }


        return style.list_item;
    }

    return(
        <li className={taskStatus()} key={item.id}>
            {isEditing ? renderEditor() : renderData()}
            <button className={style.list_edit} onClick={modeSwitching}>
                {
                isEditing ?
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z"/></svg>
                 :
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#000" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>}
            </button>
        </li>
    )
}

export default function List({ list, onRemove, onUpdate, onMark, onUpdateTag }) {
    return (
        <ul className={style.list}>
            {list.map((item) => (
                <Item key={item.id} item={item} onRemove={onRemove} onUpdate={onUpdate} onMark={onMark} onUpdateTag={onUpdateTag}/>
            ))}
        </ul>
    )
}