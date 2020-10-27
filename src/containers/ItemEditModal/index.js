import React, {useEffect, useState} from "react";
import {Button, Form, Modal, Row, Col} from "react-bootstrap";
import {getDatePresentation} from "~/api/helpers/dateTime";
import withStore from "~/hocs/withStore";
import tracks from "~/api/db/tracks";
import * as dateTime from "~/api/helpers/dateTime";
import SelectTypeUtz from "~/components/selectTypeUtz";

function ItemEditModal(props){

    const closePopup = ()=>props.setShowPopup(false)

    // SAVE TRACK
    const saveTrackEdit = () => {
        closePopup();
        props.stores.TracksStore.update(props.trackEdit);
        props.setTrackEdit(tracks.getNew());
    }
    const changeTrackEdit = (field, value) =>{
        props.setTrackEdit({
            ...props.trackEdit,
            [field]: value
        })
    }

    const editElapsedTime = (elapsedTime)=> changeTrackEdit('elapsedTime', elapsedTime)
    const setComment = (text)=>changeTrackEdit('comment', text)

    const fillTrack = () => {
        props.stores.TracksStore
            .fillNewTrack( props.trackEdit )
            .then(props.setTrackEdit);
    }

    const changeIdUTZ = (keyComment, keyUtz) => changeTrackEdit('typeUTZ', keyUtz)

    // TIME

    const getElapsedTimeFormat = ()=>{
        const elapsedTime = dateTime.timeDiffSplitted(
            props.trackEdit.startTime,
            props.trackEdit.active ? new Date : 0,
            props.trackEdit.elapsedTime
        )
        return elapsedTime.hours + ':' + elapsedTime.minutes
    }

    const [elapsedTimeFormat, setElapsedTimeFormat] = useState(getElapsedTimeFormat());

    useEffect(()=>{
        setElapsedTimeFormat(getElapsedTimeFormat())
    }, [props.trackEdit.startTime, props.showPopup])

    const changeElapsedTimeFormat = (e)=>{
        const newVal = e.target.value.match(/\d{0,2}:[0-5]{0,1}\d{0,1}/)
        if(!newVal){
            return null
        }
        setElapsedTimeFormat(newVal)
    }

    const onBlurElapsedTimeFormat = (e)=>{
        const time = e.target.value.split(':')
        const elapsedTime = (+time[0] * 60 + (+time[1])) * 60 * 1000
        if (props.trackEdit.active){
            props.setTrackEdit({
                ...props.trackEdit,
                startTime: (new Date(Date.now() - elapsedTime)),
                elapsedTime: 0,
            })
        } else {
            editElapsedTime(elapsedTime)
        }
    }

    //

    return (
        <Modal show={props.showPopup} onHide={closePopup}>
            <Modal.Header closeButton>
                <Modal.Title className={"h5"}>
                    { getDatePresentation(props.trackEdit.date) }
                    <Button variant="primary"
                            className={"ml-3"}
                            onClick={saveTrackEdit}
                    >
                        Save
                    </Button>
                    {props.stores.chromeStore.isJiraTab
                    &&
                    <Button variant="outline-primary"
                            className={"ml-1"}
                            onClick={fillTrack}
                    >
                        fill
                    </Button>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDate"  as={Row} >
                        <Form.Label column sm="3">
                            Дата
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={dateTime.getFormat("YYYY-MM-DD", props.trackEdit.date)}
                                disabled
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formTime"  as={Row} >
                        <Form.Label column sm="3">
                            Прошло
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={elapsedTimeFormat}
                                onChange={changeElapsedTimeFormat}
                                onBlur={onBlurElapsedTimeFormat}
                                placeholder="0:00"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formTicket"  as={Row} >
                        <Form.Label column sm="3">
                            Ticket
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={props.trackEdit.ticket}
                                placeholder="Ticket"
                                onChange={event=>changeTrackEdit('ticket', event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formTicketTitle"  as={Row} >
                        <Form.Label column sm="3">
                            Задача
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={props.trackEdit.ticketTitle}
                                placeholder="Ticket Title"
                                onChange={event=>changeTrackEdit('ticketTitle', event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formBranch"  as={Row} >
                        <Form.Label column sm="3">
                            Branch
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={props.trackEdit.branch}
                                placeholder="Branch"
                                onChange={event=>changeTrackEdit('branch', event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formEpic"  as={Row} >
                        <Form.Label column sm="3">
                            Epic
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={props.trackEdit.epic}
                                placeholder="Epic"
                                onChange={event=>changeTrackEdit('epic', event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="formComment"  as={Row} >
                        <Form.Label column sm="3">
                            Комментарий
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="textarea" rows="3"
                                value={props.trackEdit.comment}
                                placeholder="Comment"
                                onChange={event=>changeTrackEdit('comment', event.target.value)}
                            />
                            {props.stores.Comments.items.map(comment=><Button variant="outline-primary"
                                                                              className={"mr-2 mt-1"}
                                                                              onClick={()=>{setComment(comment.text)}}
                                                                              key={comment.key}
                            >
                                {comment.preview}
                            </Button>)}
                        </Col>
                    </Form.Group>
                    <SelectTypeUtz
                        typeUTZ={props.trackEdit.typeUTZ}
                        keyComment={''}
                        changeIdUTZ={changeIdUTZ}
                    />
                    <Form.Group controlId="formCheckbox" >
                        <Form.Check
                            sm="3"
                            inline
                            label="Внеурочка"
                            type="checkbox"
                            id="inline-checkbox-overtime"
                            checked={props.trackEdit.overtime}
                            onChange={event=>changeTrackEdit('overtime', event.target.checked)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCheckbox" >
                        <Form.Check
                            sm="3"
                            inline
                            label="Сохранено в Jira"
                            type="checkbox"
                            id="inline-checkbox-jira"
                            checked={props.trackEdit.savedJira}
                            onChange={event=>changeTrackEdit('savedJira', event.target.checked)}
                        />
                        <Form.Check
                            sm="3"
                            inline
                            label="Сохранено в УТЗ"
                            type="checkbox"
                            id="inline-checkbox-UTZ"
                            checked={props.trackEdit.savedUTZ}
                            onChange={event=>changeTrackEdit('savedUTZ', event.target.checked)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}
export default withStore(ItemEditModal);