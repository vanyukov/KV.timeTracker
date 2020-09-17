import React, {useState} from "react";
import {Button, Container, Row, Col} from "react-bootstrap";
import withStore from '~/hocs/withStore';
import {getDatePresentation} from '~/api/helpers/dateTime';
import ItemEditModal from "~/containers/ItemEditModal";
import tracks from "~/api/db/tracks";
import {Link, withRouter} from "react-router-dom";
import Style from "./Header.module.css"
import WeekNav from "~/containers/Header/WeekNav";
import * as navigation from "~/api/helpers/navigation"

function Header(props) {
    const [trackEdit, setTrackEdit] = useState(tracks.getNew());
    const [showPopup, setShowPopup] = useState(false);
    const createNewTrack = () => {
        props.stores.TracksStore
            .fillNewTrack( tracks.getNew() )
            .then(trackFilled=> {
                props.stores.TracksStore.start(trackFilled);
                setTrackEdit(trackFilled)
                setShowPopup(true);
            });
    }

    return(
        <Container>
            <Row>
                <Col>
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

                        { getDatePresentation(navigation.isYearInUrl() ? window.location.pathname : undefined) }

                        <Link to="/settings" className={"btn btn-secondary ml-2"}>Settings</Link>
                        <Link to="/reports" className={"btn btn-secondary ml-2"}>Reports</Link>
                    </header>
                </Col>
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

export default withRouter(withStore(Header));