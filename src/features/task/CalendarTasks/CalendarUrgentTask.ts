import CalendarTask from "./CalendarTask";
import getSimpleTime from "../../../assets/SimpleDate";

class CalendarUrgentTask extends CalendarTask {
    untilDate: Date;

    constructor(id: string, title: string, description: string, estimatedTime: string, status: string, untilDate: string) {
        super(id, title, description, estimatedTime, status, 'High');
        this.untilDate = new Date(untilDate);
    }

    getUntilDate = () => this.untilDate;

    getSimpleUntilDate = () => getSimpleTime(this.untilDate);

    setUntilDate = (untilDate: Date) => this.untilDate = untilDate;
}

export default CalendarUrgentTask;