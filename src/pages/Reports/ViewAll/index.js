import React, {useState} from "react";
import withStore from "~/hocs/withStore";
import {ListGroup, InputGroup, FormControl, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import GoBack from "~/components/btn/GoBack";
import * as dateTime from "~/api/helpers/dateTime";
import Style from "./ViewAll.module.css"
import tracks from "~/api/db/tracks";
import ItemEditModal from "~/pages/ItemEditModal";
import Button from "react-bootstrap/Button";

function ViewAll(props){
    const [trackEdit, setTrackEdit] = useState(tracks.getNew());
    const [showPopup, setShowPopup] = useState(false);
    const openPopupTrackEdit = track => {
        setTrackEdit(track);
        setShowPopup(true);
    }

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
                                        <Link to={dateTime.getFormat("/YYYY/MM/DD", track.date)}>
                                            {dateTime.getFormat("YYYY-MM-DD", track.date)}
                                        </Link>
                                    </InputGroup.Text>
                                    <InputGroup.Text className={Style.time}>
                                        {elapsedTime.hours} <small>h.</small> {elapsedTime.minutes} <small>m.</small>
                                    </InputGroup.Text>
                                    <Button
                                        variant="outline-primary"
                                        className={Style.ticket}
                                        onClick={()=>{openPopupTrackEdit(track)}}
                                    >{track.ticket}</Button>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </ListGroup.Item>
                    })}
            </ListGroup>

            <ItemEditModal
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                trackEdit={trackEdit}
                setTrackEdit={setTrackEdit}
            />
        </>
    )

}

export default withStore(ViewAll);