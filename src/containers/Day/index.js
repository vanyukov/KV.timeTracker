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
            <DayItem
                track={props.stores.currentTrack}
            />
            {props.stores.TracksStore.items.map(track=>{
                return <DayItem
                    track={track}
                />
            })}
        </Container>
    )

}

export default withStore(Day);