import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import withStore from '~/hocs/withStore';
import {getDatePresentation} from '~/api/helpers/dateTime';
function Header(props) {
    return(
        <Container>
            <Row>
                <header>
                    <Button
                        variant="success"
                        className="mr-2"
                        onClick ={()=>props.stores.TracksStore.start()}
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
        </Container>
    )
}

export default withStore(Header);