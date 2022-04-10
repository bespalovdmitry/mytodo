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
            />
        </div>
    );
}

export default App;
