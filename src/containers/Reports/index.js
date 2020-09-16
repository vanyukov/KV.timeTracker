import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import withStore from "~/hocs/withStore";
import {Container, Row, Col, Button, Form, ListGroup} from "react-bootstrap";

function Reports(props) {
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }

    return(
        <Container>
            <h1 className={"mt-2"}>
                Reports
                <Button
                    variant="outline-secondary"
                    size="sm"
                    className={"ml-3"}
                    onClick={goBack}
                >go back</Button>
            </h1>
            <ListGroup>
                <ListGroup.Item>
                    <Link to={"/reports/ViewAll"}>
                        ViewAll
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>

        </Container>
    )

}
export default withStore(Reports);