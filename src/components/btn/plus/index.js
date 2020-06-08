import React from 'react';
import {Button} from "react-bootstrap";

export default function BtnPlus (props) {
    return (
        <Button variant="primary"
                className="btn-plus"
                onClick={props.onClick}
        >
            +
        </Button>
    )
}