import React from 'react'

export default function FloatingButton(props) {
    return (
        <button
            className="float"
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}
