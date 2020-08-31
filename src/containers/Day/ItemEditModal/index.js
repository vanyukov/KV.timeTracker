import React, {useEffect, useState} from "react";
import {Button, Container, Modal} from "react-bootstrap";
import {getDatePresentation} from "~/api/helpers/dateTime";

export default function ItemEditModal(props){
    return (
        <Modal show={props.showPopup} onHide={props.closePopup}>
            <Modal.Header closeButton>
                <Modal.Title>
                    { getDatePresentation(props.trackEdit.date) }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.trackEdit.ticket}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closePopup}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.saveTrackEdit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}