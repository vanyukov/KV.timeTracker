import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import withStore from "~/hocs/withStore";
import {Container, Row, Col, Button, Form} from "react-bootstrap";

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
        </Container>
    )

}
export default withStore(Reports);