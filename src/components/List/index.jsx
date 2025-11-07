import {useState} from 'react'
import style from './style.module.css'

const Item = ({ item, onRemove, onUpdate, onMark}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(item.text)
    const [isTagsVisible, setTagsVisible] = useState(false)


    const renderData = () => {
        return <>
            <button className={style.mark} onClick={() => onMark(item.id)}></button>
            <button className={style.tags_btn} onClick={() => {setTagsVisible(!isTagsVisible)}}>Tags</button>
            <div className={isTagsVisible ? style.tags : style.tags_unvisible}>
                <span>Теги:</span>
                <div className={style.tags_cont}>
                    {item.tags.map((tag, i) => (
                        <span key={i} className={style.tag}>{tag}</span>
                    ))}
                </div>
                <button className={style.add_tag_btn}>Добавить теги</button>
            </div>
            <span className={style.item_text}>{item.text}</span>
            <button className={style.list_delete} onClick={() => onRemove(item.id)}>Удалить</button>
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

    return(
        <li className={item.complited ? style.list_item_marked : style.list_item} key={item.id}>
            {isEditing ? renderEditor() : renderData()}
            <button className={style.list_edit} onClick={modeSwitching}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    )
}

export default function List({ list, onRemove, onUpdate, onMark }) {
    return (
        <ul className={style.list}>
            {list.map((item) => (
                <Item key={item.id} item={item} onRemove={onRemove} onUpdate={onUpdate} onMark={onMark}/>
            ))}
        </ul>
    )
}