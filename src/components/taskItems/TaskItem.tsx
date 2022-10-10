import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {CardActions, CardContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassDisabledRoundedIcon from '@mui/icons-material/HourglassDisabledRounded';
import DeleteTaskButton from "../deleteTaskButton/DeleteTaskButton";
import style from "./styles.module.scss";
import {Task, taskStatus} from "../../store/tasks/tasks.types";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import {useDispatch, useSelector} from "react-redux";
import {removeTaskFromTasks, setNewTaskStatus} from "../../store/tasks/tasks.action";
import {selectTasks} from "../../store/tasks/tasks.selector";

type Props = {
    key: string
    id: string
    title: string
    description: string
    status: taskStatus
}

const TaskItem = ({id, title, description, status}: Props) => {
    const dispatch = useDispatch()

    const tasks: Task[] = useSelector(selectTasks) || []

    const deleteTask = (id: string): void => {
        dispatch(removeTaskFromTasks(tasks, id))
    }
    const setTaskStatusTodo = (id: string):void => {
        dispatch(setNewTaskStatus(tasks, id, taskStatus.Todo))
    }
    const setTaskStatusInProgress = (id: string):void => {
        dispatch(setNewTaskStatus(tasks, id, taskStatus.InProgress))
    }
    const setTaskStatusCompleted = (id: string):void => {
        dispatch(setNewTaskStatus(tasks, id, taskStatus.Completed))
    }
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={style.parentFlexSplit}>
            {status === taskStatus.Todo && <IconButton color='primary'
                                                       title='Task in progress'
                                                       onClick={() => setTaskStatusInProgress(id)}>
                <HourglassTopRoundedIcon/>
            </IconButton>}
            {status === taskStatus.Todo && <IconButton color='success'
                                                       title='Finish task'
                                                       onClick={() => setTaskStatusCompleted(id)}>
                <CheckCircleRoundedIcon/>
            </IconButton>}
            {status === taskStatus.InProgress && <IconButton color='secondary'
                                                             title='Reset task'
                                                             onClick={() => setTaskStatusTodo(id)}>
                <HourglassDisabledRoundedIcon/>
            </IconButton>}
            {status === taskStatus.InProgress && <IconButton color='success'
                                                             title='Finish task'
                                                             onClick={() => setTaskStatusCompleted(id)}>
                <CheckCircleRoundedIcon/>
            </IconButton>}
            {status === taskStatus.Completed && <IconButton color='error'
                                                            title='Reset task'
                                                            onClick={() => setTaskStatusTodo(id)}>
                <CheckCircleRoundedIcon/>
            </IconButton>}
            {status === taskStatus.Completed && <IconButton color='primary'
                                                            title='Task in progress'
                                                            onClick={() => setTaskStatusInProgress(id)}>
                <HourglassTopRoundedIcon/>
            </IconButton>}

            <div className={style.rightAlignItem}>
                <DeleteTaskButton id={id} deleteTask={deleteTask}/>
            </div>
        </CardActions>
        </Card>
    );
};

export default TaskItem;