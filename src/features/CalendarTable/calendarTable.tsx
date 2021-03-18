import React, {FC} from 'react';
import CalendarEvent from "../event/CalendarEvent/CalendarEvent";
import CalendarTableRow from "./calendarTableRow";
import NotificationsIcon from "@material-ui/icons/Notifications";
import RemoveIcon from "@material-ui/icons/Remove";
import EventOther from "../event/EventTable/eventOther";
import CalendarTask from "../task/CalendarTasks/CalendarTask";
import getTaskTypeIcon from "../task/TaskIcon/taskTypeIcon";
import getTaskPriorityIcon from "../task/TaskIcon/taskPriorityIcon";
import TaskOther from "../task/TaskTable/taskOther";
import TaskCollapseBody from "../task/TaskTable/taskCollapseBody";
import {useSelector} from "react-redux";
import {selectEvents} from "../event/EventStore/EventSlice";
import {selectTasks} from "../task/TaskStore/TaskSlice";
import {makeStyles, Paper, Table, TableContainer} from "@material-ui/core";
import CalendarTableHead from "./calendarTableHead";
import BasicEntity from "../basicEntity/basicEntity";
import {FilterEnum, filterMap, NoFilter} from "../tableFilters/filters";
import EventCollapseBody from "../event/EventTable/eventCollapseBody";

interface CalendarTableProps {
    filter: FilterEnum,
    searchFilter: string,
    setEditItem: React.Dispatch<React.SetStateAction<BasicEntity | undefined>>
}

type DataType = CalendarEvent | CalendarTask

const CalendarTable: FC<CalendarTableProps> = ({filter, searchFilter, setEditItem}) => {
    const classes = useStyles();
    const head = ['Type', 'Priority', 'Title', 'Other', 'Actions'];
    const events: CalendarEvent[] = useSelector(selectEvents);
    const tasks: CalendarTask[] = useSelector(selectTasks);
    const allData: DataType[] = [...events, ...tasks];

    const searchFilterText = <T extends BasicEntity>(entity: T): boolean => {
        return entity.getTitle().toLowerCase().includes(searchFilter);
    }

    const getFilteredData = (): DataType[] => {
        const filterFunc = filterMap.get(filter) || NoFilter;
        return allData.filter(filterFunc).filter(searchFilterText);
    };

    const getEventRow = (event: CalendarEvent, index: number) => {
        return <CalendarTableRow key={index} item={event} typeIcon={<NotificationsIcon/>} setEditItem={setEditItem}
                                 priorityIcon={<RemoveIcon/>}
                                 other={<EventOther event={event}/>}
                                 collapseBody={<EventCollapseBody event={event}/>}/>
    }

    const getTaskRow = (task: CalendarTask, index: number) => {
        return <CalendarTableRow key={index} item={task} typeIcon={getTaskTypeIcon(task)} setEditItem={setEditItem}
                                 priorityIcon={getTaskPriorityIcon(task)}
                                 other={<TaskOther task={task}/>}
                                 collapseBody={<TaskCollapseBody task={task}/>}/>
    }

    return (
        <TableContainer component={Paper} className={classes.table}>
            <Table>
                <CalendarTableHead head={head}/>
                {getFilteredData().map((entity, index) => {
                    if (entity instanceof CalendarEvent) {
                        return getEventRow(entity, index);
                    }
                    return getTaskRow(entity, index);
                })}
            </Table>
        </TableContainer>
    )
}

export default CalendarTable;

const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});