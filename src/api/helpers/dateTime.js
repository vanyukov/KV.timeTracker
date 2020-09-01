import moment from 'moment';
moment.locale('ru');

export function getDatePresentation(date=new Date) {
    const weekDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    const month = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября', 'октября', 'ноября', 'декабря'];
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}, ${weekDays[date.getDay()]}`
}

export function formatWeekDay(dayNumber){
    return moment().day(dayNumber).format('dd')
}

export function getCurrentWeekDay(date = new Date){
    return moment(date).day()
}