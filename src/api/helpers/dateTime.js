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