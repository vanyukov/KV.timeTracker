import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import withStore from '~/hocs/withStore';
import ElapsedTime from "~/components/ ElapsedTime";

function Header(props) {


    let today = new Date;
    const weekDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    const month = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября', 'октября', 'ноября', 'декабря'];
    today = `${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}, ${weekDays[today.getDay()]}`

    return(
        <Container>
            <Row>
                <header>
                    <Button
                        variant="success"
                        className="mr-2"
                        onClick ={props.stores.currentTrack.start}
                    >
                        New +
                    </Button>
                    {today}
                    <Button
                        className="ml-2"
                    >
                        Settings
                    </Button>
                </header>
            </Row>
        </Container>
    )
}

export default withStore(Header);