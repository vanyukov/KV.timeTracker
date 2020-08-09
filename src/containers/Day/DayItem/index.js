import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import withStore from '~/hocs/withStore';
import ElapsedTime from "~/components/ ElapsedTime";

function DayItem(props) {

    const [timeStart, setTimeStart] = useState(null);
    const [timeDelay, setTimeDelay] = useState(null);
    const [timeIdInterval, setIdInterval] = useState(0);
    useEffect(()=>{
        if (props.track.active){
            setTimeStart(new Date( props.track.startTime - props.track.elapsedTime));
            setTimeDelay(new Date);
            setIdInterval(
                setInterval(()=>{
                    setTimeDelay(new Date);
                }, 200)
            );
        } else {
            clearInterval(timeIdInterval);
        };

        return () => {
            clearInterval(timeIdInterval);
        };

    },[props.track.active]);

    return(
        <Row>
            <ElapsedTime
                startTime={timeStart}
                endTime={timeDelay}
                elapsedTime = {0}
            />

            {props.track.ticket}

            {!props.track.active &&
            <Button
                onClick ={props.track.start}
                className="ml-2"
            >
                Start
            </Button>}

            {props.track.active &&
            <Button
                onClick ={props.track.stop}
                className="ml-2"
            >
                Stop
            </Button>}

            <Button
                variant="secondary"
                className="ml-2"
            >
                Edit
            </Button>
        </Row>
    )
}

export default withStore(DayItem);