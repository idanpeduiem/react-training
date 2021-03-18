import getSimpleTime from "../../../assets/SimpleDate";
import BasicEntity from "../../basicEntity/basicEntity";

class CalendarEvent extends BasicEntity {
    beginningTime: Date;
    endingTime: Date;
    color: string;
    invitedGuests: string[];
    notificationTime: Date;

    constructor(id: string, title: string, description: string, beginningTime: string, endingTime: string, color: string, invitedGuests: string[], notificationTime: string) {
        super(id, title, description);
        this.beginningTime = new Date(beginningTime);
        this.endingTime = new Date(endingTime);
        this.color = color;
        this.invitedGuests = invitedGuests;
        this.notificationTime = new Date(notificationTime);
    }

    getBeginningTime = () => this.beginningTime;

    getSimpleBeginningTime = () => getSimpleTime(this.beginningTime);

    setBeginningTime = (beginningTime: Date) => this.beginningTime = beginningTime;

    getEndingTime = () => this.endingTime;

    getSimpleEndingTime = () => getSimpleTime(this.endingTime);

    setEndingTime = (endingTime: Date) => this.endingTime = endingTime;

    getColor = () => this.color;

    setColor = (color: string) => this.color = color;

    getInvitedGuests = () => this.invitedGuests;

    getInvitedGuestsStringList = () => {
        return this.invitedGuests.map((guest: string) => {
            if (guest === this.invitedGuests[this.invitedGuests.length - 1]) {
                return guest.toString();
            }
            return guest.toString() + ", "
        });
    };

    setInvitedGuests = (invitedGuests: string[]) => this.invitedGuests = invitedGuests;

    getNotificationTime = () => this.notificationTime;

    getSimpleNotificationTime = () => getSimpleTime(this.notificationTime);

    setNotificationTime = (notificationTime: Date) => this.notificationTime = notificationTime;
}

export default CalendarEvent;