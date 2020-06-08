import React from "react";
import style from './ElapsedTime.module.css'

export default function ElapsedTime(props) {
    const elapsedTime = timeDiffSplited(props.startTime, props.endTime, props.elapsedTime);

    return(<span className={style.timer}>
         <span className={style.timer_hours}>
             {elapsedTime.hours} ч.
         </span>
         <span className={style.timer_minutes}>
              {elapsedTime.minutes} м.
         </span>
         <span className={style.timer_seconds}>
             {elapsedTime.seconds} с.
         </span>
    </span>)
}

function timeDiffSplited(timeStart, timeEnd = 0, elapsedTime = 0) {
    const hourDiff = (timeEnd > timeStart ? timeEnd - timeStart : 0) + elapsedTime; //in ms
    const hDiff = hourDiff / 3600 / 1000;
    const minDiff = hourDiff/ 60 / 1000;
    const secDiff = hourDiff / 1000;
    const humanReadable = {};

    humanReadable.hours = Math.floor(hDiff);
    humanReadable.minutes = Math.floor(minDiff - 60 * humanReadable.hours );
    humanReadable.seconds = Math.floor(secDiff - 60 * humanReadable.hours  - 60 * humanReadable.minutes );

    return humanReadable;
}