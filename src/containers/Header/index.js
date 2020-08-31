import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import withStore from '~/hocs/withStore';
import {getDatePresentation} from '~/api/helpers/dateTime';
import ItemEditModal from "~/containers/ItemEditModal";
import tracks from "~/api/db/tracks";
function Header(props) {
    const [trackEdit, setTrackEdit] = useState(tracks.getNew());
    const [showPopup, setShowPopup] = useState(false);
    const createNewTrack = () => {
        const track =tracks.getNew();
        props.stores.TracksStore.start(track);
        setTrackEdit(track);
        setShowPopup(true);
    }

    return(
        <Container>
            <Row>
                <header>
                    <Button
                        variant="success"
                        className="mr-2"
                        onClick ={createNewTrack}
                    >
                        New +
                    </Button>

                    { getDatePresentation() }

                    <Button
                        className="ml-2"
                    >
                        Settings
                    </Button>
                </header>
            </Row>
            <ItemEditModal
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                trackEdit={trackEdit}
                setTrackEdit={setTrackEdit}
            />
        </Container>
    )
}

export default withStore(Header);