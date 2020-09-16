import React from "react";
import {useHistory} from "react-router-dom";
import { Button} from "react-bootstrap";

function GoBack(props) {
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }

    return(
        <Button
            variant="outline-secondary"
            size="sm"
            className={props.className}
            onClick={goBack}
        >go back</Button>
    )

}
export default GoBack;