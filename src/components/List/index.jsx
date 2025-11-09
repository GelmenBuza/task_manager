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
            <button className={style.mark} onClick={() => onMark(item.id)}></button>
            <button className={style.tags_btn} onClick={() => {setTagsVisible(!isTagsVisible)}}>Tags</button>
            <div className={isTagsVisible ? style.tags : style.tags_unvisible}>
                {isEditingTag ? renderEditorTags() : renderTags()}
                <button className={style.add_tag_btn} onClick={modeSwitchingTag}>
                    {isEditingTag ? 'Сохранить' : 'Добавить теги'}
                    </button>
            </div>
            <span className={style.item_text}>{item.text}</span>
            {item.burnDate ? renderDate() : <></>}
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

    const taskStatus = () => {
        const today = new Date().toISOString().split('T')[0];
        if (item.complited) {
            return style.list_item_marked;
        }
        if (item.burnDate) {
            if (item.burnDate && item.burnDate < today) {
                return style.list_item_burned;
            }
        }

        return style.list_item;
    }

    return(
        <li className={taskStatus()} key={item.id}>
            {isEditing ? renderEditor() : renderData()}
            <button className={style.list_edit} onClick={modeSwitching}>
                {isEditing ? 'Save' : 'Edit'}
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