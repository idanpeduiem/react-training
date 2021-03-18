import React, {FC} from 'react';
import {Avatar, makeStyles, styled, TableCell, TableRow, Typography} from "@material-ui/core";
import CalendarEvent from "../CalendarEvent/CalendarEvent";

interface EventCollapseBodyProps {
    event: CalendarEvent,
}

const EventCollapseBody: FC<EventCollapseBodyProps> = ({event}) => {
    const classes = useStyles();
    const ColoredAvatar = styled(Avatar)({
        backgroundColor: event.getColor()
    });
    const getInvitedGuests = () => {
        if (event.getInvitedGuests().length === 0) {
            return "[None   ]";
        } else {
            return event.getInvitedGuestsStringList();
        }
    }
    return (
        <TableRow>
            <TableCell className={classes.borderlessTableCell}>
                <Typography>Description:&nbsp;{event.getDescription()}</Typography>
            </TableCell>
            <TableCell className={classes.sideBorderTableCell}>
                <Typography>Color:</Typography>
                <ColoredAvatar> </ColoredAvatar>
            </TableCell>
            <TableCell className={classes.sideBorderTableCell}>
                <Typography>Invited Guests:&nbsp;{getInvitedGuests()}</Typography>
            </TableCell>
            <TableCell className={classes.borderlessTableCell}>
                <Typography>Notification
                    Time:&nbsp;{event.getSimpleNotificationTime()}</Typography>
            </TableCell>
        </TableRow>
    );
}

export default EventCollapseBody;

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