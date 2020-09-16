import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import withStore from "~/hocs/withStore";
import {Container, Row, Col, Button, Form, ListGroup} from "react-bootstrap";
import GoBack from "~/components/btn/GoBack";

function Reports(props) {
    return(
        <Container>
            <Row>
                <Col xs={4}>
                    <h1 className={"mt-2"}>
                        Reports
                        <GoBack className={"ml-2"}/>
                    </h1>
                    <ListGroup>
                        <ListGroup.Item>
                            <Link to={"/reports/ViewAll"}>
                                ViewAll
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )

}
export default withStore(Reports);