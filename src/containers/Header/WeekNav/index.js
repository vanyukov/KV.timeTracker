import React, {useEffect, useState} from "react";
import withStore from "~/hocs/withStore";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import Style from "~/containers/Header/WeekNav/WeekNav.module.css";
import * as dateTime from "~/api/helpers/dateTime";

const currentWeekDay = dateTime.getCurrentWeekDay()

function WeekNav(props){

    return(
        <Nav variant="pills" as="ul" className={"mt-2 mb-1"} defaultActiveKey="/">
            {[1, 2, 3, 4, 5, 6, 7].map(dayNumber=>{
                const date = dateTime.getClosestWeekDay(dayNumber)
                const parseDate = dateTime.parseDate(date)
                return (
                <Nav.Item as="li" key={dayNumber}>
                    <Link to={"/" + parseDate.year + "/" + (parseDate.month + 1) + "/" + parseDate.date  }
                          className={Style.nav_link + " nav-link " + (currentWeekDay==dayNumber ? " active " : '')}
                    >
                        {date.format('dd')}
                    </Link>
                </Nav.Item>
                )
            })}
        </Nav>
    )

}

export default withStore(WeekNav);