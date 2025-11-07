import { useState } from "react";
import List from '../List';
import TaskAddFrom from '../TaskAddForm';
import style from './style.module.css';


export default function TaskManager () {
    const [tasks, setTasks] = useState([])

    const addTask = (text, tags) => {
        const newId = tasks.length + 1;
        setTasks(prev => [...prev, { id: newId, text, tags, complited: false}]);
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

    return <div className={style.section}>
        <h2 className={style.section__title}>Task Manager</h2>
        <TaskAddFrom onAdd={addTask}></TaskAddFrom>
        <List list={tasks} onRemove={removeTask} onUpdate={updateTask} onMark={markTask} onUpdateTag={updateTag}></List>
    </div>

}  