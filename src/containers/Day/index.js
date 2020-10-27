import React, {useEffect, useState} from "react";
import ItemLine from "~/containers/Day/ItemLine";
import withStore from "~/hocs/withStore";
import {Container, Form} from "react-bootstrap";
import ItemEditModal from "~/containers/ItemEditModal";
import tracks from "~/api/db/tracks";
import ElapsedTime from "~/components/ ElapsedTime";
import * as dateTime from "~/api/helpers/dateTime";

function Day(props) {
    const [trackEdit, setTrackEdit] = useState(tracks.getNew());
    const [showPopup, setShowPopup] = useState(false);
    const [utzDay, setUtzDay] = useState(null);
    const openPopupTrackEdit = track => {
        setTrackEdit(track);
        setShowPopup(true);
    }
    const tabJiraTicket = props.stores.chromeStore.isJiraTab && props.stores.chromeStore.getFieldFromJira('ticket');

    useEffect(()=>{

        if (props.stores.chromeStore.isUtzTab){
            props.stores.chromeStore.getFieldFromUtz('date')
                .then(result=>{
                    if (result){
                        setUtzDay(result[0])
                    }
                })
        }

    },[props.stores.chromeStore.isUtzTab])

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
                    saveJira={()=>props.stores.chromeStore.saveJira(track)}
                    showSaveJira={tabJiraTicket == track.ticket && track.ticket}
                    showSaveUTZ={utzDay == dateTime.getFormat("DD.MM.YYYY",track.date)}
                    saveUTZ={()=>props.stores.chromeStore.saveUTZ(track)}
                />
            })}

            <div className="d-flex justify-content-start">
                <span className={"mr-1"}>Итого: </span>
                <ElapsedTime
                    startTime={0}
                    endTime={0}
                    elapsedTime = {props.stores.TracksStore
                        .tracksOfDay(props.match.params)
                        .reduce(
                                ((sum, track)=>sum+=(track.elapsedTime +
                                    (track.active ? (new Date - track.startTime) : 0)
                                )), 0
                            )
                        }
                />

            </div>

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