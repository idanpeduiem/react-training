import BasicEntity from "../../basicEntity/basicEntity";

class CalendarTask extends BasicEntity{
    estimatedTime: string;
    status: string;
    priority: string;

    constructor(id: string, title: string, description: string, estimatedTime: string, status: string, priority: string) {
        super(id, title, description);
        this.estimatedTime = estimatedTime;
        this.status = status;
        this.priority = priority;
    }

    getEstimatedTime = () => this.estimatedTime;

    setEstimatedTime = (estimatedTime: string) => this.estimatedTime = estimatedTime;

    getStatus = () => this.status;

    setStatus = (status: string) => this.status = status;

    getPriority = () => this.priority;

    setPriority = (priority: string) => this.priority = priority;
}

export default CalendarTask;