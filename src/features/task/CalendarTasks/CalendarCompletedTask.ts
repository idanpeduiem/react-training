import CalendarTask from "./CalendarTask";
import getSimpleTime from "../../../assets/SimpleDate";

class CalendarCompletedTask extends CalendarTask {
    review: string;
    timeSpent: string;
    untilDate: Date;

    constructor(id: string, title: string, description: string, estimatedTime: string, priority: string, review: string, timeSpent: string, untilDate: string) {
        super(id, title, description, estimatedTime, "Close", priority);
        this.review = review;
        this.timeSpent = timeSpent;
        this.untilDate = new Date(untilDate);
    }

    getReview = () => this.review;

    setReview = (review: string) => this.review = review;

    getTimeSpent = () => this.timeSpent;

    setTimeSpent = (timeSpent: string) => this.timeSpent = timeSpent;

    getUntilDate = () => this.untilDate;

    getSimpleUntilDate = () => getSimpleTime(this.untilDate);

    setUntilDate = (untilDate: Date) => this.untilDate = untilDate;
}

export default CalendarCompletedTask;