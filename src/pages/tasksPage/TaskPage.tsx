import s from './TaskPage.module.scss'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {CardContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useDispatch, useSelector} from "react-redux";
import {selectTasks} from "../../store/tasks/tasks.selector";
import {Task, taskStatus} from "../../store/tasks/tasks.types";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useEffect, useState} from "react";
import CreateTaskForm from "../../components/createTaskForm/createTaskForm";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import TaskItem from "../../components/taskItems/TaskItem";
import {setNewTasksOrder, setNewTaskStatus} from "../../store/tasks/tasks.action";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const TaskPage = () => {

    const tasks: Task[] = useSelector(selectTasks) || []



    let [TodoLength, setTodoLength] = useState(tasks.filter(task => task.status === taskStatus.Todo).length)
    let [InProgressLength, setInProgressLength] = useState(tasks.filter(task => task.status === taskStatus.InProgress).length)
    let [CompletedLength, setCompletedLength ]= useState(tasks.filter(task => task.status === taskStatus.Completed).length)

    useEffect(()=>{
        setTodoLength(tasks.filter(task => task.status === taskStatus.Todo).length)
        setInProgressLength(tasks.filter(task => task.status === taskStatus.InProgress).length)
        setCompletedLength(tasks.filter(task => task.status === taskStatus.Completed).length)
    }, [tasks])

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onDragEnd = (result: DropResult) => {
        console.log(result)
        if (!result.destination) {
            return;
        }
        const { destination, source, draggableId} = result;
        let to = destination.droppableId === 'Todo'
            ? taskStatus.Todo
            : destination.droppableId === 'InProgress'
                ? taskStatus.InProgress : taskStatus.Completed
        if(destination.droppableId === source.droppableId){
            dispatch(setNewTasksOrder(tasks, destination.index, source.index))
        }
        if(destination.droppableId !== source.droppableId){
            dispatch(setNewTasksOrder(tasks, destination.index, source.index))
            if(to === taskStatus.Todo){
                dispatch(setNewTaskStatus(tasks, draggableId, taskStatus.Todo))
            } else if( to === taskStatus.InProgress){
                dispatch(setNewTaskStatus(tasks, draggableId, taskStatus.InProgress))
            } else if(to === taskStatus.Completed){
                dispatch(setNewTaskStatus(tasks, draggableId, taskStatus.Completed))
            }

        }
    };

    return (
        <div className={s.taskPage}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <CreateTaskForm closeForm={handleClose}/>
                    </Box>
                </Fade>
            </Modal>
            <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
                <Card>
                    <CardHeader
                        title={'To do'}
                        action={
                            <IconButton color="primary">
                                <AddCircleOutlineRoundedIcon onClick={handleOpen}/>
                            </IconButton>
                        }
                    />


                    <Droppable droppableId='Todo'>
                        {((provided) => <CardContent className={s.card} ref={provided.innerRef}
                                                     {...provided.droppableProps}>
                            {tasks
                                .map((task, index) => {
                                    if(task.status === taskStatus.Todo){
                                        return <Draggable key={task.id} draggableId={task.id}
                                                                       index={index}>
                                {((provided) => <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps} >
                                    <TaskItem
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        status={taskStatus.Todo}
                                    />
                                </div>)}
                            </Draggable>}else return <></>})}
                            {provided.placeholder}
                        </CardContent>)}
                    </Droppable>


                </Card>
                <Card>
                    <CardHeader title={'In progress'}/>
                    <Droppable droppableId='InProgress'>
                        {((provided) => <CardContent ref={provided.innerRef}
                                                     {...provided.droppableProps}>
                            {tasks
                                .map((task, index) => {
                                    if(task.status === taskStatus.InProgress){
                                    return <Draggable key={task.id} draggableId={task.id}
                                                                             index={index}>
                                {((provided) => <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}>
                                    <TaskItem
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        status={taskStatus.InProgress}
                                    />
                                </div>)}
                            </Draggable>} else return <></>})}
                            {provided.placeholder}
                        </CardContent>)}
                    </Droppable>
                </Card>
                <Card>
                    <CardHeader title={'Completed'}/>
                    <Droppable droppableId='Completed'>
                        {((provided) => <CardContent ref={provided.innerRef}
                                                     {...provided.droppableProps}>
                            {tasks
                                .map((task, index) => {
                                    if(task.status === taskStatus.Completed){
                                    return <Draggable key={task.id} draggableId={task.id}
                                               index={index}>
                                        {((provided) => <div ref={provided.innerRef}
                                                             {...provided.draggableProps}
                                                             {...provided.dragHandleProps}>
                                            <TaskItem
                                                key={task.id}
                                                id={task.id}
                                                title={task.title}
                                                description={task.description}
                                                status = {taskStatus.Completed}
                                            />
                                        </div>)}
                                    </Draggable>} else return <></>
                                })}
                            {provided.placeholder}
                        </CardContent>)}
                    </Droppable>
                </Card>
            </DragDropContext>
        </div>
    );
};

export default TaskPage;