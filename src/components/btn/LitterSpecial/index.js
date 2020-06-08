import React from 'react';

export default function LitterSpecial (props) {
    return (
        <span className={"litter-special " + props.className}>
            {props.letter}
        </span>
    )
}