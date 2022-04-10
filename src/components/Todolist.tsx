import React from 'react';
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
}
export const Todolist = (props: TodoPropsType) => {
    const onClickChangeFilterHandler = (filter: FilterType) => {
      props.filterTask(filter)
    }
    return (
        <Paper sx={{padding: 2}}>
            <Typography variant={'h5'} textAlign={'center'}>{props.title}</Typography>
            <Box display={'flex'} alignItems={'flex-end'}>
                <TextField label={'Add task'} variant={'standard'}/>
                <Button  variant={'contained'} sx={{ml: 1}}>Add</Button>
            </Box>
            <List>
                {props.tasks.map(task => {
                    const onClickRemoveTaskHandler = () => {props.removeTask(task.id)}
                    return (
                        <Box key={task.id} display={'flex'} alignItems={'center'}>
                            <Checkbox checked={task.isDone}/>
                            <IconButton onClick={onClickRemoveTaskHandler}><DeleteOutlineIcon/></IconButton>
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