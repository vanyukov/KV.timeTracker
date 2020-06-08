import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import withStore from '~/hocs/withStore';
import ElapsedTime from "~/components/ ElapsedTime";

function Header(props) {

    let btnAction = null;
    if (props.stores.currentTrack.active){
        btnAction =
            <Button
                className="mr-2"
                onClick ={props.stores.currentTrack.stop}
            >
                stop
            </Button>;
    } else {
        btnAction =
            <Button
                className="mr-2"
                onClick ={props.stores.currentTrack.start}
            >
                start
            </Button>;
    }

    const [timeStart, setTimeStart] = useState(null);
    const [timeDelay, setTimeDelay] = useState(null);
    const [timeIdInterval, setIdInterval] = useState(0);
    useEffect(()=>{
        if (props.stores.currentTrack.active){
            setTimeStart(new Date(new Date - props.stores.currentTrack.elapsedTime));
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

    },[props.stores.currentTrack.active]);


    return(
        <Container>
            <Row>
                <header>
                    {btnAction}
                    {(props.stores.currentTrack.active
                    || props.stores.currentTrack.elapsedTime > 0)
                        &&
                        <ElapsedTime
                            startTime={timeStart}
                            endTime={timeDelay}
                            elapsedTime = {0}
                        />
                    }
                </header>
            </Row>
        </Container>
    )
}

export default withStore(Header);