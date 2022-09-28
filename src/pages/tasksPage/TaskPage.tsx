import s from './TaskPage.module.scss'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {CardContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useDispatch, useSelector} from "react-redux";
import {getTasksCompleted, getTasksInProgress, getTasksToDo} from "../../redux/selectors/tasksSelectors";
import {AppDispatch} from '../../redux/store';
import {tasksActions} from "../../redux/reducers/tasksReducer";
import {taskStatus} from "../../redux/types/tasksTypes";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {useState} from "react";
import CreateTaskForm from "../../components/createTaskForm/createTaskForm";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import TaskItem from "../../components/taskItems/TaskItem";


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

    const tasksTodo = useSelector(getTasksToDo) || []
    const tasksInProgress = useSelector(getTasksInProgress) || []
    const tasksCompleted = useSelector(getTasksCompleted) || []

    const dispatch: AppDispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onDragEnd = (result: DropResult) => {
        console.log(result)
        if (!result.destination) {
            return;
        }
        const { destination, source, draggableId } = result;
        let to = destination.droppableId === 'Todo'
            ? taskStatus.Todo
            : destination.droppableId === 'InProgress'
                ? taskStatus.InProgress : taskStatus.Completed
        if(destination.droppableId === source.droppableId){
            dispatch(tasksActions.reorderTask(draggableId, destination.index, source.index))
        }
        if(destination.droppableId !== source.droppableId){
            if(to === taskStatus.Todo){
                dispatch(tasksActions.setTaskStatusTodo(draggableId))
            } else if( to === taskStatus.InProgress){
                dispatch(tasksActions.setTaskStatusInProgress(draggableId))
            } else if(to === taskStatus.Completed){
                dispatch(tasksActions.setTaskStatusCompleted(draggableId))
            }
            dispatch(tasksActions.reorderTask(draggableId, destination.index, source.index))
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
                            {tasksTodo.map((task) => <Draggable key={task.id} draggableId={task.id}
                                                                       index={task.order}>
                                {((provided) => <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps} >
                                    <TaskItem
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        sessions={task.sessions}
                                        status={taskStatus.Todo}
                                    />
                                </div>)}
                            </Draggable>)}
                            {provided.placeholder}
                        </CardContent>)}
                    </Droppable>


                </Card>
                <Card>
                    <CardHeader title={'In progress'}/>
                    <Droppable droppableId='InProgress'>
                        {((provided) => <CardContent ref={provided.innerRef}
                                                     {...provided.droppableProps}>
                            {tasksInProgress.map((task) => <Draggable key={task.id} draggableId={task.id}
                                                                             index={task.order}>
                                {((provided) => <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}>
                                    <TaskItem
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        sessions = {task.sessions}
                                        status={taskStatus.InProgress}
                                    />
                                </div>)}
                            </Draggable>)}
                            {provided.placeholder}
                        </CardContent>)}
                    </Droppable>
                </Card>
                <Card>
                    <CardHeader title={'Completed'}/>
                    <Droppable droppableId='Completed'>
                        {((provided) => <CardContent ref={provided.innerRef}
                                                     {...provided.droppableProps}>
                            {tasksCompleted.map((task) => <Draggable key={task.id} draggableId={task.id}
                                                                            index={task.order}>
                                {((provided) => <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}>
                                    <TaskItem
                                        key={task.id}
                                        id={task.id}
                                        title={task.title}
                                        description={task.description}
                                        sessions = {task.sessions}
                                        status = {taskStatus.Completed}
                                    />
                                </div>)}
                            </Draggable>)}
                            {provided.placeholder}
                        </CardContent>)}
                    </Droppable>
                </Card>
            </DragDropContext>
        </div>
    );
};

export default TaskPage;