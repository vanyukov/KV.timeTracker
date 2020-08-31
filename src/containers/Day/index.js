import React, {useEffect, useState} from "react";
import ItemLine from "~/containers/Day/ItemLine";
import withStore from "~/hocs/withStore";
import {Container} from "react-bootstrap";
import ItemEditModal from "~/containers/Day/ItemEditModal";
import tracks from "~/api/db/tracks";

function Day(props) {
    const [trackEdit, setTrackEdit] = useState(tracks.getNew());
    const [showPopup, setShowPopup] = useState(false);
    const openPopupTrackEdit = track => {
        setTrackEdit(track);
        setShowPopup(true);
    }
    const closePopup = () => setShowPopup(false);
    const saveTrackEdit = () => {
        closePopup();
        props.stores.TracksStore.update(trackEdit);
        setTrackEdit(tracks.getNew());
    }
    const changeTrackEdit = (field, value) =>{
        setTrackEdit({
            ...trackEdit,
            [field]: value
        })
    }

    return(
        <Container>
            {props.stores.TracksStore.items.map(track=>{
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
                closePopup={closePopup}
                trackEdit={trackEdit}
                saveTrackEdit={saveTrackEdit}
                changeTrackEdit={changeTrackEdit}
            />
        </Container>
    )

}

export default withStore(Day);