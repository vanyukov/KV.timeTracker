import React, {useEffect, useState} from "react";
import withStore from "~/hocs/withStore";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import Style from "~/containers/Header/WeekNav/WeekNav.module.css";
import {formatWeekDay, getCurrentWeekDay} from "~/api/helpers/dateTime";

const currentWeekDay = getCurrentWeekDay()

function WeekNav(props){

    return(
        <Nav defaultActiveKey="/home" as="ul">
            {[1, 2, 3, 4, 5, 6, 0].map(dayNumber=>{
                return (
                <Nav.Item as="li" key={dayNumber}>
                    <Link to="/" className={Style.nav_link + " nav-link " + (currentWeekDay==dayNumber ? " disabled " : '')} >
                        {formatWeekDay(dayNumber)}
                    </Link>
                </Nav.Item>
                )
            })}
        </Nav>
    )

}

export default withStore(WeekNav);