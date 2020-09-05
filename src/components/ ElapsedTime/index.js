import React from "react";
import style from './ElapsedTime.module.css'
import * as dateTime from "~/api/helpers/dateTime";

export default function ElapsedTime(props) {
    const elapsedTime = dateTime.timeDiffSplitted(props.startTime, props.endTime, props.elapsedTime);

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

