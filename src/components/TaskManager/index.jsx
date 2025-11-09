import { useEffect, useMemo, useState } from "react";
import List from '../List';
import TaskAddForm from '../TaskAddForm';

import style from './style.module.css';


export default function TaskManager () {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    })
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    const addTask = (text, tags, date) => {
        const newId = tasks.length + 1;
        setTasks(prev => [...prev, { id: newId, text, tags, burnDate: date, complited: false}]);
    };

    const removeTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const updateTask = (id, newText) => {
        setTasks(prev => prev.map(task => 
            task.id === id ? { ...task, text: newText } : task
        ));
    };

    const markTask = (id) => {
        setTasks(prev => prev.map(task => task.id === id ? {...task, complited: !task.complited} : task))
    }

    const updateTag = (id, newTags) => {
        newTags = newTags.split(',').map(t => t.trim()).filter(t => t);
        setTasks(prev => prev.map(task => 
            task.id === id ? { ...task, tags: newTags } : task
        ));
    }
    
    const filteredTasks = useMemo(() => {
        if (!searchQuery.trim()) {
            return tasks;
        }

        const query = searchQuery.toLowerCase();
        
        return tasks.filter(task => task.text.toLowerCase().includes(query) || (task.tag && task.tags.some(tag => tag.toLowerCase().includes(query))));


    }, [tasks, searchQuery])

    return (
        <div className={style.section}>
            <h2 className={style.section__title}>Task Manager</h2>
            <TaskAddForm onAdd={addTask}></TaskAddForm>
            <label className={style.searchContainer}>
                <span>Поиск</span>
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={style.searchInput}
                />
            </label>
            <List list={filteredTasks} onRemove={removeTask} onUpdate={updateTask} onMark={markTask} onUpdateTag={updateTag}></List>
        </div>
    )
}  