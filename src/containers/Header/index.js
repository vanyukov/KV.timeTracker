import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import withStore from '~/hocs/withStore';
import {getDatePresentation} from '~/api/helpers/dateTime';
import ItemEditModal from "~/containers/ItemEditModal";
import tracks from "~/api/db/tracks";
import {Link} from "react-router-dom";
import Style from "./Header.module.css"
import WeekNav from "~/containers/Header/WeekNav";

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
                    <Link to="/" className={"mr-2"}>
                        <img src="/img/logo.png" className={Style.logo_img }/>
                    </Link>
                    <Button
                        variant="success"
                        className="mr-2"
                        onClick ={createNewTrack}
                    >
                        New +
                    </Button>

                    { getDatePresentation() }

                    <Link to="/settings" className={"btn btn-secondary ml-2"}>Settings</Link>
                </header>
            </Row>

            <WeekNav/>

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