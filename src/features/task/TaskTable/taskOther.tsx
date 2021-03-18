import React, {FC} from 'react';
import {makeStyles, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import CalendarCompletedTask from "../CalendarTasks/CalendarCompletedTask";
import CalendarUrgentTask from "../CalendarTasks/CalendarUrgentTask";
import CalendarTask from "../CalendarTasks/CalendarTask";

interface TaskOtherProps {
    task: CalendarTask,
}

const TaskOther: FC<TaskOtherProps> = ({task}) => {
    const classes = useStyles();

    const extraField = (task: CalendarTask) => {
        if (task instanceof CalendarCompletedTask) {
            return (
                <Typography>Time Spent:&nbsp;{task.getTimeSpent()}</Typography>
            );
        } else if (task instanceof CalendarUrgentTask) {
            return (

                <Typography>Until Date:&nbsp;{task.getSimpleUntilDate()}</Typography>
            );
        }
    }

    return (
        <TableBody>
            <TableRow>
                <TableCell align="center" className={classes.borderlessTableCell}>
                    <Typography>Status:&nbsp;{task.getStatus()}</Typography>
                </TableCell>
                <TableCell align="center" className={classes.borderlessTableCell}>
                    <Typography>Estimated Time:&nbsp;{task.getEstimatedTime()}</Typography>
                </TableCell>
                <TableCell align="center" className={classes.borderlessTableCell}>
                    {extraField(task)}
                </TableCell>
            </TableRow>
        </TableBody>
    );
}

export default TaskOther;

const useStyles = makeStyles({
    borderlessTableCell: {
        borderBottom: "none",
    },
});