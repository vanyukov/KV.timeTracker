import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import withStore from "~/hocs/withStore";
import {Container, Row, Col, Button, Form} from "react-bootstrap";

function DB(props) {
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }

    return(
        <Container>
            <h1 className={"mt-2"}>
                Операции с DB
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
                    </Col>
                </Row>
            </Form>


        </Container>
    )

}
export default withStore(DB);