import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import withStore from "~/hocs/withStore";
import {Container, Row, Col, Button, Form, Alert, ButtonGroup, FormFile} from "react-bootstrap";
import {saveData} from "~/api/files"
import * as dateTime from "~/api/helpers/dateTime";

function DB(props) {
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }
    const [msgClear, setMsgClear] = useState('');
    const [msgLoad, setMsgLoad] = useState({variant:'', msg:''});

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
                        <Button onClick={()=>{
                            props.stores.dbStore.exportToJsonString()
                                .then(res=>{
                                    saveData(res, 'indexedDB.TimeTracks.' + dateTime.getFormat("YYYY-MM-DD") + '.txt')
                                })
                        }}>
                            Save DB
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className={"mb-2"}>
                        <ButtonGroup>
                            <Button
                                variant="outline-primary"
                                type={"file"}
                                onClick={()=>{
                                    props.stores.dbStore.importFromJsonString()
                                        .then(res=>{
                                            setMsgLoad({variant: 'success', msg: 'База данных загружена'})
                                        })
                                        .catch(res=>{
                                            setMsgLoad({variant: 'danger', msg: 'Ошибка загрузки БД'})
                                        })
                                }}
                            >
                                Load DB
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className={"ml-2"}>
                            {msgClear && <Alert variant='success' className={"m-0"}>
                                {msgLoad.msg}
                            </Alert>}
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className={"mb-2"}>
                        <ButtonGroup>
                            <Button
                                variant="outline-danger"
                                onClick={()=>{
                                    props.stores.dbStore.clearDatabase()
                                        .then(res=>{
                                            setMsgClear('База данных очищена')
                                        })
                                }}
                            >
                                Clear DB
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup className={"ml-2"}>
                            {msgClear && <Alert variant='success' className={"m-0"}>
                                {msgClear}
                            </Alert>}
                        </ButtonGroup>
                    </Col>
                </Row>
            </Form>


        </Container>
    )

}
export default withStore(DB);