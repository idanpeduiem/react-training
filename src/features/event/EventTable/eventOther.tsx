import React, {FC} from 'react';
import {makeStyles, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import CalendarEvent from "../CalendarEvent/CalendarEvent";

interface  EventOtherProps {
    event: CalendarEvent,
}

const EventOther: FC<EventOtherProps> = ({event}) => {
    const classes = useStyles();
    return (
        <TableBody>
            <TableRow>
                <TableCell align="center" className={classes.borderlessTableCell}>
                    <Typography>From:&nbsp;{event.getSimpleBeginningTime()}</Typography>
                </TableCell>
                <TableCell align="center" className={classes.borderlessTableCell}>
                    <Typography>Until:&nbsp;{event.getSimpleEndingTime()}</Typography>
                </TableCell>
            </TableRow>
        </TableBody>);
}

export default EventOther;

const useStyles = makeStyles({
    sideBorderTableCell: {
        borderBottom: "none",
        borderRight: "1px solid lightGrey",
        borderLeft: "1px solid lightGrey"
    },
    borderlessTableCell: {
        borderBottom: "none",
    },
});