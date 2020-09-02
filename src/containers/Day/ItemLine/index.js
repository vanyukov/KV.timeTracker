import React, {useEffect, useState} from "react";
import {Button, Container, Form, Row} from "react-bootstrap";
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

    },[props.track.active]);

    return(
        <Row className={Style.row + " mt-2 mb-2"}>
            <Form.Group className={"ml-1 mb-0"}>
                <ElapsedTime
                    startTime={timeStart}
                    endTime={timeDelay}
                    elapsedTime = {props.track.elapsedTime}
                />
                <br/>
                <span className={Style.ticket} >
                    {props.track.ticket}
                </span>
            </Form.Group>

            <a href={jiraUrl+"/browse/" + props.track.ticket}
               className={Style.jira_link + " text-center"}
               target={'_blank'}
            >
                <img className={Style.jira_img} src="/public/img/jira-logo.png" />
                <br/>
                Jira
            </a>

            <a href={gitRepositoryUrl+"/commits/" + props.track.ticket}
               className={Style.git_link + " text-center ml-1"}
               target={'_blank'}
            >
                {gitLabLogo()}
                <br/>
                Commits
            </a>

            <a href={gitRepositoryUrl+"/-/tree/" + props.track.ticket}
               className={Style.git_link + " text-center ml-1"}
               target={'_blank'}
            >
                {gitLabLogo()}
                <br/>
                Branch
            </a>

            <Form.Group className={"ml-1 mb-0"}>
                <Form.Check
                    type="checkbox"
                    label="saved Jira"
                    checked={props.track.savedJira}
                    disabled />
                <Form.Check
                    type="checkbox"
                    label="saved UTZ"
                    checked={props.track.savedUTZ}
                    disabled />
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
    )
}

export default withStore(ItemLine);