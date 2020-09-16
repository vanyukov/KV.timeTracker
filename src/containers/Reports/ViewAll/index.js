import React from "react";
import withStore from "~/hocs/withStore";
import {ListGroup, InputGroup, FormControl} from "react-bootstrap";
import GoBack from "~/components/btn/GoBack";
import * as dateTime from "~/api/helpers/dateTime";
import Style from "./ViewAll.module.css"

function ViewAll(props){

    return(
        <>
            <h1>
                Все записи
                <GoBack className={"ml-2"}/>
            </h1>
            <ListGroup>
                {props.stores.TracksStore.items
                    .sort((a, b)=>b.date - a.date)
                    .map(track=>{
                        const elapsedTime = dateTime.timeDiffSplitted(track.startTime, track.active ? new Date : 0, track.elapsedTime)
                        return <ListGroup.Item className="m-0 p-0 border-0"
                            key={track.date}
                        >
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        {dateTime.getFormat("YYYY-MM-DD", track.date)}
                                    </InputGroup.Text>
                                    <InputGroup.Text className={Style.time}>
                                        {elapsedTime.hours} <small>h.</small> {elapsedTime.minutes} <small>m.</small>
                                    </InputGroup.Text>
                                    <InputGroup.Text className={Style.ticket}>
                                        {track.ticket}
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </ListGroup.Item>
                    })}
            </ListGroup>
        </>
    )

}

export default withStore(ViewAll);