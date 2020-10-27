import React, {useEffect, useState} from "react";
import {Button, OverlayTrigger, Form, Row, Tooltip} from "react-bootstrap";
import withStore from '~/hocs/withStore';
import ElapsedTime from "~/components/ ElapsedTime";
import Style from "./ItemLine.module.css"
import gitLabLogo from "~/components/gitLab-logo"

function ItemLine(props) {

    const [timeStart, setTimeStart] = useState(null);
    const [timeDelay, setTimeDelay] = useState(null);
    const [timeIdInterval, setIdInterval] = useState(0);

    const jiraUrl = props.stores.Settings.getSetting('jiraUrl');
    const gitRepositoryUrl = props.stores.Settings.getSetting('gitRepositoryUrl');

    useEffect(()=>{
        if (props.track.active){
            setTimeStart(new Date( props.track.startTime));
            setTimeDelay(new Date);
            setIdInterval(
                setInterval(()=>{
                    setTimeDelay(new Date);
                }, 1000)
            );
        } else {
            setTimeDelay(null);
            clearInterval(timeIdInterval);
        };

        return () => {
            clearInterval(timeIdInterval);
        };

    },[props.track.active, props.track.startTime, props.track.elapsedTime]);

    return(
        <OverlayTrigger placement='bottom' overlay={
            <Tooltip
                id={"tooltip-" + props.track.ticket}
                className={props.track.ticketTitle ? "" : " d-none "}
            >
                {props.track.ticketTitle}
            </Tooltip>
        }>
            <Row className={Style.row + " mt-2 mb-2 " + (props.track.active ? Style.row_active : props.track.ticket == props.stores.chromeStore.getFieldFromJira('ticket') ? Style.row_current : '')}>
                <Form.Group className={"ml-1 mb-0 d-flex flex-column"}>
                    <ElapsedTime
                        startTime={timeStart}
                        endTime={timeDelay}
                        elapsedTime = {props.track.elapsedTime}
                    />
                    <span className={Style.ticket} >
                    {props.track.ticket || props.track.ticketTitle}
                </span>
                </Form.Group>

                <span className={Style.jira+ " text-center"}>
                    {props.track.ticket && <a href={jiraUrl + "/browse/" + props.track.ticket}
                        target={'_blank'}
                    >
                        <img className={Style.jira_img} src="/img/jira-logo.png"/>
                        <br/>
                        Jira
                    </a>}
                </span>

                <span className={Style.commits+ " text-center"}>
                 {props.track.branch && <a href={gitRepositoryUrl + "/commits/" + (props.track.branch)}
                     target={'_blank'}
                 >
                     {gitLabLogo()}
                     <br/>
                     Commits
                 </a>}
               </span>

                <span className={Style.branch+ " text-center"}>
                    {props.track.branch && <a href={gitRepositoryUrl + "/-/tree/" + (props.track.branch)}
                        target={'_blank'}
                    >
                        {gitLabLogo()}
                        <br/>
                        Branch
                    </a>}
                </span>

                <Form.Group className={"ml-1 mb-0"}>
                    {props.showSaveJira && <Button
                        variant={props.track.savedJira ? "outline-secondary" : "primary"}
                        onClick={props.saveJira}
                        className="ml-2"
                    >
                        save Jira
                    </Button>}
                    {!props.showSaveJira && <Form.Check
                        type="checkbox"
                        label="saved Jira"
                        checked={props.track.savedJira}
                        disabled/>}

                    {props.showSaveUTZ && <Button
                        variant={props.track.savedUTZ ? "outline-secondary" : "primary"}
                        onClick={props.saveUTZ}
                        className="ml-2"
                    >
                        save UTZ
                    </Button>}
                    {!props.showSaveUTZ && <Form.Check
                        type="checkbox"
                        label="saved UTZ"
                        checked={props.track.savedUTZ}
                        disabled />
                    }
                </Form.Group>

                {!props.track.active &&
                <Button
                    onClick ={props.start}
                    className="ml-2"
                >
                    Start
                </Button>}

                {props.track.active &&
                <Button
                    onClick ={props.stop}
                    className="ml-2"
                    variant="danger"
                >
                    Stop
                </Button>}

                <Button
                    variant="secondary"
                    className="ml-2"
                    onClick ={props.edit}
                >
                    Edit
                </Button>

                <Button
                    variant="secondary"
                    className="ml-2"
                    onClick ={props.delete}
                >
                    Delete
                </Button>
            </Row>
        </OverlayTrigger>
    )
}

export default withStore(ItemLine);