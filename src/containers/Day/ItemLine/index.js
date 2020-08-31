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
            setTimeStart(new Date( props.track.startTime));
            setTimeDelay(new Date);
            setIdInterval(
                setInterval(()=>{
                    setTimeDelay(new Date);
                }, 200)
            );
        } else {
            setTimeDelay(null);
            clearInterval(timeIdInterval);
        };

        return () => {
            clearInterval(timeIdInterval);
        };

    },[props.track.active]);

    return(
        <Row className="mt-2">
            <ElapsedTime
                startTime={timeStart}
                endTime={timeDelay}
                elapsedTime = {props.track.elapsedTime}
            />

            {props.track.ticket}

            {!props.track.active &&
            <Button
                onClick ={props.start}
                className="ml-2"
            >
                Start
            </Button>}

            {props.track.active &&
            <Button
                onClick ={props.stop}
                className="ml-2"
            >
                Stop
            </Button>}

            <Button
                variant="secondary"
                className="ml-2"
                onClick ={props.edit}
            >
                Edit
            </Button>

            <Button
                variant="secondary"
                className="ml-2"
                onClick ={props.delete}
            >
                Delete
            </Button>
        </Row>
    )
}

export default withStore(DayItem);