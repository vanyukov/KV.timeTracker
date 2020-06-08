import React from 'react';
import {Button} from "react-bootstrap";

export default function BtnMinus (props) {
    return (
        <Button variant="secondary"
                className="btn-minus"
                onClick={props.onClick}
        >
            -
        </Button>
    )
}