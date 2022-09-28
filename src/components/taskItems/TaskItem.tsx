import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {CardActions, CardContent} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassDisabledRoundedIcon from '@mui/icons-material/HourglassDisabledRounded';
import DeleteTaskButton from "../deleteTaskButton/DeleteTaskButton";
import style from "./styles.module.scss";
import {Sessions, taskStatus} from "../../redux/types/tasksTypes";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {tasksActions} from "../../redux/reducers/tasksReducer";

type Props = {
    key: string
    id: string
    title: string
    description: string
    sessions: Sessions[]
    status: taskStatus
}

const TaskItem = ({id, title, description, sessions, status}: Props) => {
    const dispatch: AppDispatch = useDispatch()

    const deleteTask = (id: string): void => {
        dispatch(tasksActions.deleteTask(id))
    }
    const setTaskStatusTodo = (id: string):void => {
        dispatch(tasksActions.setTaskStatusTodo(id))
    }
    const setTaskStatusInProgress = (id: string):void => {
        dispatch(tasksActions.setTaskStatusInProgress(id))
    }
    const setTaskStatusCompleted = (id: string):void => {
        dispatch(tasksActions.setTaskStatusCompleted(id))
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
                {sessions.map((session, index) => {
                    if (session.timeStart) {
                        let dataStart = new Date(session.timeStart)
                        let dataFinish: Date | null = null
                        if(session.timeFinish){
                            dataFinish = new Date(session.timeFinish)
                        }
                        return <Typography variant="body2" color="text.secondary">
                            {index + 1 + ' session start '
                                + dataStart.getFullYear() + '-' + (dataStart.getMonth() + 1)
                                + '-' + dataStart.getDate() + ' ' + dataStart.getHours() + ':' + dataStart.getMinutes() + " - " +
                                (dataFinish ? 'finish '
                                    + dataFinish.getFullYear() + '-' + (dataFinish.getMonth() + 1)
                                    + '-' + dataFinish.getDate() + ' ' + dataFinish.getHours() + ':' + dataFinish.getMinutes()
                                    : '...')
                            }
                        </Typography>
                    }
                })}
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