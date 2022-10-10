import Typography from "@mui/material/Typography";
import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, FormControl, FormHelperText, Input, TextField} from "@mui/material";
import {addNewTaskToTasks} from "../../store/tasks/tasks.action";
import {selectTasks} from "../../store/tasks/tasks.selector";
import {Task} from "../../store/tasks/tasks.types";

type Props = {
    closeForm: () => void
}

const CreateTaskForm = ({closeForm}: Props) => {

    const tasks: Task[] = useSelector(selectTasks) || []

    let [inputError, setInputError] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const addTask = (title: string, description: string) => {
        if(title.length > 0){
            dispatch(addNewTaskToTasks(tasks, title, description))
            closeForm()
        } else {
            setInputError(true)
        }
    }

    return (
        <div>
            <Typography variant="h3" component="h3">
                Enter the new task
            </Typography>
            <form action="">
                <div>
                    <FormControl error={inputError} variant="standard">
                    <Input placeholder="Title" onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                        setInputError(false)
                        setTitle(e.target.value)
                    }}/>
                        {inputError && <FormHelperText id="component-error-text">Title can't be empty</FormHelperText>}
                    </FormControl>
                </div>
                <div>

                    <TextField margin="normal"
                        id="standard-basic"
                        label="Description"
                        variant="standard"
                        onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                            setDescription(e.target.value)
                        }}
                    />
                </div>
                <Button variant="contained" onClick={()=>{
                    addTask(title, description)
                }}>Create task</Button>
            </form>
        </div>
    );
};

export default CreateTaskForm;