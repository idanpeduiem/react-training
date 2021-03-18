import BasicEntity from "../basicEntity/basicEntity";
import CalendarEvent from "../event/CalendarEvent/CalendarEvent";
import CalendarTask from "../task/CalendarTasks/CalendarTask";
import CalendarCompletedTask from "../task/CalendarTasks/CalendarCompletedTask";
import CalendarUrgentTask from "../task/CalendarTasks/CalendarUrgentTask";

enum FilterEnum {
    NO_FILTER,
    EVENTS_ONLY,
    TASKS_ONLY,
    UNCOMPLETED_TASKS,
    HIGH_PRIORITY_TASKS
}

type funcType = <T extends BasicEntity>(entity: T) => boolean;

const NoFilter: funcType = <T extends BasicEntity>(entity: T): boolean => {
    return true;
}

const FilterByTypeEvent: funcType = <T extends BasicEntity>(entity: T): boolean => {
    return (entity instanceof CalendarEvent);
}

const FilterByTypeTask: funcType = <T extends BasicEntity>(entity: T): boolean => {
    return (entity instanceof CalendarTask);
}

const FilterByUncompletedTask: funcType = <T extends BasicEntity>(entity: T): boolean => {
    return (entity instanceof CalendarTask && (!(entity instanceof CalendarCompletedTask)));
}

const FilterByHighPriorityTask: funcType = <T extends BasicEntity>(entity: T): boolean => {
    return (entity instanceof CalendarUrgentTask);
}

const filterMap: Map<FilterEnum, funcType> = new Map();
filterMap.set(FilterEnum.NO_FILTER, NoFilter);
filterMap.set(FilterEnum.EVENTS_ONLY, FilterByTypeEvent);
filterMap.set(FilterEnum.TASKS_ONLY, FilterByTypeTask);
filterMap.set(FilterEnum.UNCOMPLETED_TASKS, FilterByUncompletedTask);
filterMap.set(FilterEnum.HIGH_PRIORITY_TASKS, FilterByHighPriorityTask);

export {FilterEnum, filterMap, NoFilter, FilterByTypeEvent, FilterByTypeTask};