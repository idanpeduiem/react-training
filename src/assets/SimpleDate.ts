const getSimpleTime = (date: Date) => {
    let minutes = date.getMinutes().toString();
    if (date.getMinutes() < 10) {
        minutes = "0" + minutes;
    }
    let month = (date.getMonth() + 1).toString();
    if (parseInt(month) < 10) {
        month = "0" + month;
    }
    let day = date.getDate().toString();
    if (parseInt(day) < 10) {
        day = "0" + day;
    }
    let hours = date.getHours().toString();
    if (parseInt(hours) < 10) {
        hours = "0" + hours;
    }
    return date.getFullYear() +
        "/" + (month) +
        "/" + day +
        " " + (hours) +
        ":" + minutes;
}

export const getISOTime = (date: Date) => {
    let minutes = date.getMinutes().toString();
    if (date.getMinutes() < 10) {
        minutes = "0" + minutes;
    }
    let month = (date.getMonth() + 1).toString();
    if (parseInt(month) < 10) {
        month = "0" + month;
    }
    let day = date.getDate().toString();
    if (parseInt(day) < 10) {
        day = "0" + day;
    }
    let hours = date.getHours().toString();
    if (parseInt(hours) < 10) {
        hours = "0" + hours;
    }
    return date.getFullYear() +
        "-" + (month) +
        "-" + day +
        "T" + (hours) +
        ":" + minutes;
}

export default getSimpleTime;