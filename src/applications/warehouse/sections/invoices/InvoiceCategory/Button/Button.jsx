import React from 'react';
import './Button.scss';

function Button(props) {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.categoryType);
        }
    };

    return (
        <button className="category-btn" onClick={handleClick}>
            {props.title}
        </button>
    );
}

export default Button;
