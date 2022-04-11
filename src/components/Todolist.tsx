import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    IconButton,
    List,
    ListItem,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import {FilterType, TaskType} from '../App';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type TodoPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filterTask: (filterValue: FilterType) => void
    addTask: (newTaskTitle: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}
export const Todolist = (props: TodoPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const onClickChangeFilterHandler = (filter: FilterType) => {
      props.filterTask(filter)
    }
    const onChangeNewTaskTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onClickAddTaskHandler = () => {
        newTaskTitle.trim() !== '' && props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLDivElement>) => {
        e.key==='Enter' && onClickAddTaskHandler()
    }
    const onClickRemoveTaskHandler = (taskId: string) => {props.removeTask(taskId)}

    return (
        <Paper sx={{padding: 2}}>
            <Typography variant={'h5'} textAlign={'center'}>{props.title}</Typography>
            <Box display={'flex'} alignItems={'flex-end'}>
                <TextField
                    value={newTaskTitle}
                    onChange={onChangeNewTaskTitle}
                    onKeyPress={onKeyPressAddTask}
                    label={'Add task'}
                    variant={'standard'}/>
                <Button  onClick={onClickAddTaskHandler} variant={'contained'} sx={{ml: 1}}>Add</Button>
            </Box>
            <List>
                {props.tasks.map(task => {
                    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                      props.changeStatus(task.id, event.currentTarget.checked)
                    }
                    return (
                        <Box key={task.id} display={'flex'} alignItems={'center'}>
                            <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
                            <IconButton onClick={() => onClickRemoveTaskHandler(task.id)}><DeleteOutlineIcon/></IconButton>
                            <ListItem>{task.title}</ListItem>
                        </Box>
                    )
                })}
            </List>
            <ButtonGroup>
                <Button onClick={() => onClickChangeFilterHandler('all')}>All</Button>
                <Button onClick={() => onClickChangeFilterHandler('active')}>Active</Button>
                <Button onClick={() => onClickChangeFilterHandler('complete')}>Complete</Button>
            </ButtonGroup>
        </Paper>
    );
};