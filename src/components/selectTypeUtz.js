import React from "react";
import {Col, Form} from "react-bootstrap";
import withStore from "~/hocs/withStore";

function SelectTypeUtz (props){
    return(
        <Form.Control
            as="select"
            value={props.idUTZ}
            onChange={ event =>{ props.changeTypeUTZ(props.keyComment, event.target.value ) }}
        >
            <option key={0} value={0}></option>
            {props.stores.UtzJobTypes.items.map(item=>
                <option key={item.id} value={item.id}>{item.type}</option>
            )}
        </Form.Control>

    )
}

export default withStore(SelectTypeUtz);