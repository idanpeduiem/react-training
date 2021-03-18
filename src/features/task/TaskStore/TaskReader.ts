import mock from '../../../assets/mock.json'
import CalendarTask from "../CalendarTasks/CalendarTask";
import CalendarCompletedTask from "../CalendarTasks/CalendarCompletedTask";
import CalendarUrgentTask from "../CalendarTasks/CalendarUrgentTask";

class TaskReader {
    tasks: CalendarTask[];

    constructor() {
        this.tasks = initTasks();
    }

    getTasks = () => this.tasks;
}

const initTasks = () => {
    const tasks = readTasksFromJson();
    let calendarTasks: CalendarTask[] = [];
    tasks.forEach(task => {
        if (task.status === 'Close') {
            calendarTasks.push(new CalendarCompletedTask(task.id, task.title, task.description, task.estimatedTime, task.priority, task.review!, task.timeSpent!, task.untilDate!));
        } else if (task.priority === 'High') {
            calendarTasks.push(new CalendarUrgentTask(task.id, task.title, task.description, task.estimatedTime, task.status, task.untilDate!));
        } else {
            calendarTasks.push(new CalendarTask(task.id, task.title, task.description, task.estimatedTime, task.status, task.priority));
        }
    });
    return calendarTasks;
};

const readTasksFromJson = () => {
    return mock.tasks;
};

const taskReader = new TaskReader();

export default taskReader;