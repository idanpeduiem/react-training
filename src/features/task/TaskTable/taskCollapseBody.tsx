import React, {FC} from 'react';
import {makeStyles, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import CalendarTask from "../CalendarTasks/CalendarTask";
import CalendarCompletedTask from "../CalendarTasks/CalendarCompletedTask";

interface TaskCollapseBodyProps {
    task: CalendarTask,
}

const TaskCollapseBody: FC<TaskCollapseBodyProps> = ({task}) => {
    const classes = useStyles();
    const taskReview = () => {
        if (task instanceof CalendarCompletedTask) {
            return (<TableRow>
                    <TableCell className={classes.borderlessTableCell}>
                        <Typography>Review:&nbsp;{task.getReview()}</Typography>
                    </TableCell>
                </TableRow>
            );
        }
    }
    return (
        <>
            <TableRow>
                <TableCell>
                    <Typography>Description:&nbsp;{task.getDescription()}</Typography>
                </TableCell>
            </TableRow>
            {taskReview()}
        </>
    );
}

export default TaskCollapseBody;

const useStyles = makeStyles({
    borderlessTableCell: {
        borderBottom: "none",
    },
});