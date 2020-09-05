import React, {useEffect, useState} from "react";
import withStore from "~/hocs/withStore";
import {Nav} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import Style from "~/containers/Header/WeekNav/WeekNav.module.css";
import * as dateTime from "~/api/helpers/dateTime";

const currentWeekDay = dateTime.getCurrentWeekDay()

function WeekNav(props){

    const pathname = props.location.pathname != '/' ? props.location.pathname : dateTime.getFormat('/yyyy/M/D')

    return(
        <Nav variant="pills" as="ul" className={"mt-2 mb-1"} defaultActiveKey="/">
            {[1, 2, 3, 4, 5, 6, 7].map(dayNumber=>{
                const date = dateTime.getClosestWeekDay(dayNumber)
                const parseDate = dateTime.parseDate(date)
                const linkDay = `/${parseDate.year}/${parseDate.month + 1}/${parseDate.date}`
                const isActiveDate = pathname == linkDay
                return (
                <Nav.Item as="li" key={dayNumber}>
                    <Link to={ linkDay }
                          className={Style.nav_link
                          + " nav-link "
                          + (currentWeekDay==dayNumber ? Style.nav_link_today : '')
                          + (isActiveDate ? ' disabled ' : '')}
                    >
                        {dateTime.getFormat('dd', date)}
                    </Link>
                </Nav.Item>
                )
            })}
        </Nav>
    )

}

export default withRouter(withStore(WeekNav));