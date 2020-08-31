import React from "react";
import style from './ElapsedTime.module.css'

export default function ElapsedTime(props) {
    const elapsedTime = timeDiffSplited(props.startTime, props.endTime, props.elapsedTime);

    return(<span className={style.timer + ' mr-2'}>
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