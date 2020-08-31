import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import withStore from "~/hocs/withStore";
import {Container, Row, Col, Button, Form} from "react-bootstrap";

function Settings(props) {
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }

    const changeSetting = (name, value) =>{
        props.stores.Settings.changeSetting(name, value)
    }

    const loadDefault = ()=>props.stores.Settings.loadDefault()

    useEffect(() => {
        return () => {
            props.stores.Settings.loadSettings();
        };
    },[]);

    return(
        <Container>
            <h1 className={"mt-2"}>
                Settings
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className={"ml-3"}
                    onClick={goBack}
                >go back</Button>
            </h1>
            <Form className={"mb-2"}>
                {props.stores.Settings.items.map(item=>{
                    return <Form.Group as={Row} controlId="formHorizontalEmail" key={item.name}>
                        <Form.Label column sm={2}>
                            {item.name}
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                value={item.value}
                                onChange={(event)=>{changeSetting(item.name,  event.target.value)}}
                                type="text"
                            />
                        </Col>
                    </Form.Group>
                })}
                <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={loadDefault}
                >
                    load default
                </Button>
            </Form>


        </Container>
    )

}
export default withStore(Settings);