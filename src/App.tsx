import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'complete'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: true}
    ])
    const [filter, setFilter] = useState<FilterType>('all')
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const filterTask = (filterValue: FilterType) => {
        setFilter(filterValue)
    }
    const addTask = (newTaskTitle: string) => {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id ===taskId ? {...task, isDone} : task))
    }

    let filteredTask = tasks
    if (filter === 'active') {
        filteredTask = tasks.filter(t => !t.isDone)
    }
    if (filter === 'complete') {
        filteredTask = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTask}
                removeTask={removeTask}
                filterTask={filterTask}
                addTask={addTask}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
