import { useState } from 'react';
import style from './style.module.css';

export default function TaskAddFrom({ onAdd }) {
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return

        const tags = tag.split(',').map(t => t.trim()).filter(t => t)

        onAdd(text.trim(), tags);
        setText('');
        setTag('');
    };

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <h2 className={style.form__title}>Добавь задачу</h2>
            <input
                type="text"
                className={style.form__input}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Новая задача..."
            />
            <input
                type="text"
                className={style.form__input}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Добавь тэг..."
            />
            <button type="submit" className={style.form__button}>
                Добавить
            </button>
        </form>
    );
}