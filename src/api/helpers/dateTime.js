export function getDatePresentation(day=new Date) {
    const weekDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    const month = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября', 'октября', 'ноября', 'декабря'];
    return `${day.getDate()} ${month[day.getMonth()]} ${day.getFullYear()}, ${weekDays[day.getDay()]}`
}