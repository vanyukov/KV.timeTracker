import React, {useEffect, useState} from "react";
import withStore from "~/hocs/withStore";
import {Container, Nav} from "react-bootstrap";
import * as dateTime from "~/api/helpers/dateTime";
import {Link, withRouter} from "react-router-dom";
import Style from "./Month.module.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Month(props) {
    const days = [];
    for (let i = 1; i <= dateTime.getCountMonthDay(); i++){
        days.push(i)
    }

    return(
        <Container className={"border-top"}>
            <Row>
                <Col sm={7}>
                    <Nav variant="pills" as="ul" className={"mt-2 mb-1"} defaultActiveKey="/">
                        {days.map(day=>{ return (
                            <Nav.Item as="li" key={day}>
                                <Link to={ '/' + props.match.params.year + '/' + props.match.params.month +  '/' + day }
                                      className={" nav-link " + Style.day}
                                >
                                    {day}
                                </Link>
                            </Nav.Item>
                        )
                        })}
                    </Nav>

                </Col>
            </Row>
        </Container>
    )

}

export default withRouter(withStore(Month));