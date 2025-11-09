import { useState } from 'react';
import style from './style.module.css';

export default function TaskAddFrom({ onAdd }) {
    const [text, setText] = useState('');
    const [tag, setTag] = useState('');
    const [dateBurn, setDateBurn] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return

        const tags = tag.split(',').map(t => t.trim()).filter(t => t)
        let date;
        if (dateBurn) {
            date = new Date(dateBurn);
        }
        onAdd(text.trim(), tags, date.toISOString().split('T')[0]);
        setText('');
        setTag('');
        setDateBurn('');
    };

    return (
        <>
            <form className={style.form} onSubmit={handleSubmit}>
                <h2 className={style.form__title}>Добавь задачу</h2>
                <div className={style.form_cont}>
                    <label htmlFor='taskName'>
                        <input
                            type="text"
                            className={style.form__input}
                            name='taskName'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Новая задача..."
                        />
                    </label>
                    <label htmlFor="taskTag">
                        <input
                            type="text"
                            className={style.form__input}
                            name='taskTag'
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="Добавь тэг..."
                        />
                    </label>
                    <label htmlFor="taskBurnDate">
                        {/* <span>Добавьте дату сгорания задачи: </span> */}
                        <input
                            type="date"
                            className={style.form__input}
                            name='taskBurnDate'
                            value={dateBurn}
                            onChange={(e) => setDateBurn(e.target.value)}
                        />
                    </label>
                    <button type="submit" className={style.form__button}>
                        Добавить
                    </button>
                </div>

            </form>

        </>
    );
}