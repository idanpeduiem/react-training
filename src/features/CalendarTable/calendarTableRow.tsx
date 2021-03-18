import React, {FC, ReactElement} from 'react';
import {
    Box,
    Collapse,
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from "@material-ui/icons/Delete";
import store from "../../app/store";
import {removeEvent} from '../event/EventStore/EventSlice';
import {removeTask} from '../task/TaskStore/TaskSlice';
import CalendarEvent from "../event/CalendarEvent/CalendarEvent";
import CalendarTask from "../task/CalendarTasks/CalendarTask";
import EditIcon from "@material-ui/icons/Edit";
import BasicEntity from "../basicEntity/basicEntity";
import {Link} from "react-router-dom";

interface CalendarTableRowProps {
    item: BasicEntity,
    typeIcon: ReactElement,
    priorityIcon: ReactElement | undefined,
    other: ReactElement,
    collapseBody: ReactElement,
    setEditItem: React.Dispatch<React.SetStateAction<BasicEntity | undefined>>
}

const CalendarTableRow: FC<CalendarTableRowProps> = ({
                                                         item,
                                                         typeIcon,
                                                         priorityIcon,
                                                         other,
                                                         collapseBody,
                                                         setEditItem
                                                     }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const removeItem = () => {
        if (item instanceof CalendarEvent) {
            store.dispatch(removeEvent(item));
        } else if (item instanceof CalendarTask) {
            store.dispatch(removeTask(item));
        }
    };
    return (
        <>
            <TableBody>
                <TableRow>
                    <TableCell align="center">
                        {typeIcon}
                    </TableCell>
                    <TableCell align="center">
                        {priorityIcon}
                    </TableCell>
                    <TableCell align="center">
                        <Typography>{item.getTitle()}</Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.sideBorderTableCell}>
                        <Table size="small">
                            {other}
                        </Table>
                    </TableCell>
                    <TableCell align="center">
                        <Link to="/edit">
                            <Tooltip title="Edit" arrow>
                                <IconButton onClick={() => setEditItem(item)}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Tooltip title="Delete" arrow>
                            <IconButton onClick={() => removeItem()}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="More Info" arrow>
                            <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.tableCell} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box>
                                <Table>
                                    <TableBody>
                                        {collapseBody}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </TableBody>
        </>
    );
};

export default CalendarTableRow;

const useStyles = makeStyles({
    tableCell: {
        paddingBottom: 0,
        paddingTop: 0
    },
    sideBorderTableCell: {
        borderBottom: "none",
        borderRight: "1px solid lightGrey",
        borderLeft: "1px solid lightGrey"
    }
});