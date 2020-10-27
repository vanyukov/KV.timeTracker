import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import withStore from "~/hocs/withStore";
import {Container, Row, Col, Button, Form, InputGroup} from "react-bootstrap";

function Comments(props) {
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }

    const loadDefault = ()=>props.stores.Comments.loadDefault()

    return(
        <Container>
            <h1 className={"mt-2"}>
                Сохраненные комментарии
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className={"ml-3"}
                    onClick={goBack}
                >go back</Button>
            </h1>
            <Form className={"mb-2"}>
                <Row>
                    <Col className={"mb-2"}>
                        <Form.Control
                            value={'text'}
                            type="text"
                            disabled={true}
                        />
                    </Col>
                    <Col >
                        <Form.Control
                            value={'preview'}
                            type="text"
                            disabled={true}
                        />
                    </Col>
                    <Col sm={3}>
                        <Form.Control
                            value={'Тип работ УТЗ'}
                            type="text"
                            disabled={true}
                        />
                    </Col>
                    <Col sm={3}>
                    </Col>
                </Row>
                {props.stores.Comments.items.map(item=>{

                    return <Form.Group as={Row} controlId="formHorizontalEmail" key={item.key}>
                        <Col >
                            <Form.Control
                                value={item.text}
                                as={"textarea"}
                                onChange={(event)=>{props.stores.Comments.changeComment(item.key, 'text', event.target.value)}}
                                type="text"
                            />
                        </Col>
                        <Col >
                            <Form.Control
                                value={item.preview}
                                onChange={(event)=>{props.stores.Comments.changeComment(item.key, 'preview', event.target.value)}}
                                type="text"
                            />
                        </Col>
                        <Col sm={3}>
                            <Form.Control
                                as="select"
                                value={item.idUTZ}
                                onChange={(event)=>{props.stores.Comments.changeComment(item.key, 'idUTZ', event.target.value)}}
                            >
                                {props.stores.UtzJobTypes.items.map(item=><option key={item.key} value={item.key}>{item.type}</option>)}
                            </Form.Control>
                        </Col>
                        <Col sm={3}>
                            <Button
                                variant="primary"
                                size="sm"
                                className={"mr-2"}
                                onClick={()=>props.stores.Comments.saveComment(item)}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={()=>props.stores.Comments.deleteComment(item)}
                            >
                                del
                            </Button>

                        </Col>
                    </Form.Group>
                })}
                <Row className={"mb-2"}>
                    <Col>
                        <Button
                            variant="success"
                            size="sm"
                            onClick={()=>props.stores.Comments.newComment()}
                        >
                            New +
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={loadDefault}
                    >
                        load default
                    </Button>
                </Row>
            </Form>


        </Container>
    )

}
export default withStore(Comments);