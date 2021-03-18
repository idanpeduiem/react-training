import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {
    Button,
    Card,
    CardActions,
    CardContent, makeStyles,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import CalendarUrgentTask from "../task/CalendarTasks/CalendarUrgentTask";
import CalendarCompletedTask from "../task/CalendarTasks/CalendarCompletedTask";
import CalendarTask from "../task/CalendarTasks/CalendarTask";
import {addTask, updateTask} from '../task/TaskStore/TaskSlice';
import {getISOTime} from "../../assets/SimpleDate";
import {useHistory} from "react-router-dom";
import {gridItemType} from "../../App";

interface TaskFormProps {
    item: CalendarTask,
    add?: boolean,
    setCardSize:  React.Dispatch<React.SetStateAction<gridItemType>>
}

const TaskFormBody: FC<TaskFormProps> = ({item, add = false, setCardSize}) => {
    const dispatch = useDispatch();
    const task = item;
    const classes = useStyles();
    const [title, setTitle] = useState(task.getTitle());
    const [description, setDescription] = useState(task.getDescription());
    const [estimatedTime, setEstimatedTime] = useState(task.getEstimatedTime());
    const [status, setStatus] = useState(task.getStatus());
    const [priority, setPriority] = useState(task.getPriority());
    const [invalidForm, setInvalidForm] = useState(false);
    const [helperText, setHelperText] = useState("");
    const pageHistory = useHistory();

    const validateForm = () => {
        if(title.length === 0){
            setInvalidForm(true);
            setHelperText("Please enter a title");
            return false;
        }
        return true;
    }

    const initialUntilDate = () => {
        if (task instanceof CalendarCompletedTask || task instanceof CalendarUrgentTask) {
            return getISOTime(task.getUntilDate());
        }
        return "";
    }
    const initialReview = () => {
        if (task instanceof CalendarCompletedTask) {
            return task.getReview();
        }
        return "";
    }
    const initialTimeSpent = () => {
        if (task instanceof CalendarCompletedTask) {
            return task.getTimeSpent();
        }
        return "";
    }
    const [untilDate, setUntilDate] = useState(initialUntilDate());
    const [review, setReview] = useState(initialReview());
    const [timeSpent, setTimeSpent] = useState(initialTimeSpent());

    const updateTitle = (event: any) => {
        if (event.target.value.length > 0) {
            setTitle(event.target.value);
            setInvalidForm(false);
            setHelperText("");

        } else {
            setInvalidForm(true);
            setHelperText("Please enter a title");
        }
    };
    const updateDescription = (event: any) => {
        setDescription(event.target.value);
    };
    const updateEstimatedTime = (event: any) => {
        setEstimatedTime(event.target.value);
    };
    const updateStatus = (event: any) => {
        setStatus(event.target.value);
    };
    const updatePriority = (event: any) => {
        setPriority(event.target.value);
    };
    const updateUntilDate = (event: any) => {
        setUntilDate(event.target.value);
    };
    const updateReview = (event: any) => {
        setReview(event.target.value);
    };
    const updateTimeSpent = (event: any) => {
        setTimeSpent(event.target.value);
    };

    const initTask = () => {
        if (status === 'Close') {
            return new CalendarCompletedTask(task.getId(), title, description, estimatedTime, priority, review, timeSpent, untilDate);
        } else if (priority === 'High') {
            return new CalendarUrgentTask(task.getId(), title, description, estimatedTime, status, untilDate);
        } else {
            return new CalendarTask(task.getId(), title, description, estimatedTime, status, priority);
        }
    };

    const toggleUntilDateInput = () => {
        const untilDate = () => {
            if (task instanceof CalendarCompletedTask || task instanceof CalendarUrgentTask) {
                return <TextField
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue={getISOTime(task.getUntilDate())}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={updateUntilDate}
                />
            } else return <TextField
                id="datetime-local"
                type="datetime-local"
                defaultValue={(new Date()).toISOString()}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={updateUntilDate}
            />
        }
        if (priority === 'High' || status === 'Close') {
            return (<TableRow>
                <TableCell><Typography>Until Date:</Typography></TableCell>
                <TableCell>
                    {untilDate()}
                </TableCell>
            </TableRow>);
        }
    };

    const toggleReview = () => {
        const review = () => {
            if (task instanceof CalendarCompletedTask) {
                return <TextField defaultValue={task.getReview()} onChange={updateReview} multiline/>
            } else return <TextField defaultValue={''} onChange={updateReview} multiline/>
        }
        if (status === 'Close') {
            return (
                <TableRow>
                    <TableCell><Typography>Review:</Typography></TableCell>
                    <TableCell>
                        {review()}
                    </TableCell>
                </TableRow>);
        }
    };

    const toggleTimeSpent = () => {
        const timeSpent = () => {
            if (task instanceof CalendarCompletedTask) {
                return <TextField defaultValue={task.getTimeSpent()} onChange={updateTimeSpent} multiline/>
            } else return <TextField defaultValue={''} onChange={updateTimeSpent} multiline/>
        };
        if (status === 'Close') {
            return (
                <TableRow>
                    <TableCell><Typography>Time Spent:</Typography></TableCell>
                    <TableCell>
                        {timeSpent()}
                    </TableCell>
                </TableRow>);
        }
    };
    const handleClose = () => {
        pageHistory.push('/');
        setCardSize(12);
    };
    const submitForm = () => {
        if (validateForm()) {
            const updatedTask = initTask();
            if (add) {
                dispatch(addTask(updatedTask));
            } else {
                dispatch(updateTask(updatedTask));
            }
            handleClose();
        }
    };
    return (
        <div>
            <Card>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><Typography>Title:</Typography></TableCell>
                                <TableCell>
                                    <TextField defaultValue={task.getTitle()} onChange={updateTitle} multiline
                                               error={invalidForm} helperText={helperText}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Description:</Typography></TableCell>
                                <TableCell>
                                    <TextField defaultValue={task.getDescription()} onChange={updateDescription}
                                               multiline/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Estimated Time:</Typography></TableCell>
                                <TableCell>
                                    <TextField defaultValue={task.getEstimatedTime()} onChange={updateEstimatedTime}
                                               multiline/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Status:</Typography></TableCell>
                                <TableCell>
                                    <Select defaultValue={task.getStatus()} onChange={updateStatus}>
                                        <MenuItem value={"Open"}>Open</MenuItem>
                                        <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                        <MenuItem value={"Close"}>Close</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Typography>Priority:</Typography></TableCell>
                                <TableCell>
                                    <Select defaultValue={task.getPriority()} onChange={updatePriority}>
                                        <MenuItem value={"Low"}>Low</MenuItem>
                                        <MenuItem value={"Medium"}>Medium</MenuItem>
                                        <MenuItem value={"High"}>High</MenuItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                            {toggleUntilDateInput()}
                            {toggleReview()}
                            {toggleTimeSpent()}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardActions>
                    <Button onClick={submitForm} className={classes.saveButton}>Save</Button>
                    <Button onClick={handleClose} className={classes.cancelButton}>Cancel</Button>
                </CardActions>
            </Card>
        </div>
    );
}

const useStyles = makeStyles({
    cancelButton: {
        backgroundColor: "lightgrey"
    },
    saveButton: {
        backgroundColor: "#9ce1ff"
    }
});

export default TaskFormBody;