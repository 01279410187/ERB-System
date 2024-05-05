import React from 'react'
import './Button.scss'
import { useNavigate } from 'react-router-dom'

function Button(props) {

    const navigate = useNavigate()

    console.log(props)
    return (
        <>
            <button
                className="category-btn"
                onClick={() => {
                    navigate(props.routes);
                }}
            >
                {props.title}
            </button>

        </>

    )
}

export default Button