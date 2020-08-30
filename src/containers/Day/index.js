import React, {useEffect} from "react";
import DayItem from "~/containers/Day/DayItem";
import withStore from "~/hocs/withStore";
import {Container} from "react-bootstrap";

function Day(props) {

    let today = new Date;
    if (props.match.params.day){
        today = new Date(props.match.params.year, props.match.params.month, props.match.params.day)
    };

    return(
        <Container>
            {props.stores.TracksStore.items.map(track=>{
                return <DayItem
                    key={track.date}
                    track={track}
                    stop={()=>props.stores.TracksStore.stop(track.date)}
                    delete={()=>props.stores.TracksStore.delete(track.date)}
                />
            })}
        </Container>
    )

}

export default withStore(Day);