import CalendarTask from "../CalendarTasks/CalendarTask";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const getTaskPriorityIcon = (task: CalendarTask) => {
    if(task.getPriority() === 'High') {
        return <ArrowDropUpIcon fontSize="large"/>
    } else if(task.getPriority() === 'Low') {
        return  <ArrowDropDownIcon fontSize="large"/>
    }
};

export default getTaskPriorityIcon;