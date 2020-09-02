import React, {useEffect, useState} from "react";
import ItemLine from "~/containers/Day/ItemLine";
import withStore from "~/hocs/withStore";
import {Container} from "react-bootstrap";
import ItemEditModal from "~/containers/ItemEditModal";
import tracks from "~/api/db/tracks";

function Day(props) {
    const [trackEdit, setTrackEdit] = useState(tracks.getNew());
    const [showPopup, setShowPopup] = useState(false);
    const openPopupTrackEdit = track => {
        setTrackEdit(track);
        setShowPopup(true);
    }
    return(
        <Container>
            {props.stores.TracksStore.tracksOfDay(props.match.params)
                .sort((a, b)=>b.date - a.date)
                .map(track=>{
                return <ItemLine
                    key={track.date}
                    track={track}
                    stop={()=>props.stores.TracksStore.stop(track.date)}
                    start={()=>props.stores.TracksStore.start(track)}
                    edit={()=>openPopupTrackEdit(track)}
                    delete={()=>props.stores.TracksStore.delete(track.date)}
                />
            })}

            <ItemEditModal
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                trackEdit={trackEdit}
                setTrackEdit={setTrackEdit}
            />
        </Container>
    )

}

export default withStore(Day);