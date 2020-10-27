import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import withStore from "~/hocs/withStore";
import {Container, Row, Col, Button, Form} from "react-bootstrap";

function UtzJobTypes(props) {
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }

    const loadDefault = ()=>props.stores.UtzJobTypes.loadDefault()

    return(
        <Container>
            <h1 className={"mt-2"}>
                Типы работ УТЗ
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
                            value={'Type'}
                            type="text"
                            disabled={true}
                        />
                    </Col>
                    <Col sm={3}>
                    </Col>
                </Row>
                {props.stores.UtzJobTypes.items.map(item=>{

                    return <Form.Group as={Row} controlId={"formHorizontal" + item.key} key={item.key}>
                        <Col >
                            <Form.Control
                                value={item.type}
                                as={"textarea"}
                                onChange={(event)=>{props.stores.UtzJobTypes.changeUtzJobType(item.key, 'type', event.target.value)}}
                                type="text"
                            />
                        </Col>
                        <Col sm={3}>
                            <Button
                                variant="primary"
                                size="sm"
                                className={"mr-2"}
                                onClick={()=>props.stores.UtzJobTypes.saveUtzJobType(item)}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={()=>props.stores.UtzJobTypes.deleteUtzJobType(item)}
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
                            onClick={()=>props.stores.UtzJobTypes.newUtzJobType()}
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
export default withStore(UtzJobTypes);