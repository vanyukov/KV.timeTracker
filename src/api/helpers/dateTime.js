import moment from 'moment';
moment.locale('ru');

export function getDatePresentation(date=new Date) {
    return  moment(date).format("LL") + ', ' + moment(date).format('dddd')
}

export function getClosestWeekDay(dayNumber){
    return moment().day(dayNumber)
}

export function getCurrentWeekDay(date = new Date){
    return moment(date).day()
}

export function getCountMonthDay(date = new Date){
    return [31,30,29,28].find(day=> moment(date).date(day).date() == day)
}

export function getDayStart(date = new Date){
    return moment(date).hour(0);
}

export function parseDate(date = new Date){
    return {
        millisecond: moment(date).millisecond(),
        second: moment(date).second(),
        minute: moment(date).minute(),
        hour: moment(date).hour(),
        date: moment(date).date(),
        dayOfYear: moment(date).dayOfYear(),
        weekday: moment(date).weekday(),
        month: moment(date).month(),
        year: moment(date).year(),
    }
}

export function getMoment(date = new Date){
    return moment(date)
}

export function getFormat(format, date = new Date){
    return getMoment(date).format(format);
}

export function timeDiffSplitted(timeStart, timeEnd = 0, elapsedTime = 0) {
    const secondsDiff =  Math.floor((
        (timeEnd > timeStart ? timeEnd - timeStart : 0) + elapsedTime
    ) / 1000);
    const timeSplit = {};
    timeSplit.hours = Math.floor(secondsDiff / 3600 );
    timeSplit.minutes = Math.floor((secondsDiff - timeSplit.hours * 3600 ) / 60 );
    timeSplit.seconds = Math.floor(secondsDiff - timeSplit.hours * 3600 - timeSplit.minutes * 60 );

    timeSplit.minutes = ('' + timeSplit.minutes).padStart(2, "0")
    timeSplit.seconds = ('' + timeSplit.seconds).padStart(2, "0")

    return timeSplit;
}
