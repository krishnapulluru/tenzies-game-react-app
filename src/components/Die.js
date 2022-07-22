import React from "react";

export default function Die(props) {
    return (
        <div
            onClick={props.hold}
            className={`dies ${props.value.isHeld ? "dice-held" : ""}`}
        >
            <h2>{props.value.value}</h2>
        </div>
    );
}
