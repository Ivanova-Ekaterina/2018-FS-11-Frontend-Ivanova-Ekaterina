import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement;
    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className= 'InputElement'
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case 'textarea':
            inputElement = <textarea
                className= 'InputElement'
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed}>
      </textarea>;
            break;
        default:
            inputElement = <input
                className= 'InputElement'
                value={props.value}
                onChange={props.changed}
            />;
            break;
    }
    return (
        <div className='Input'>
            <div className="Label"> {props.label} </div>
            {inputElement}
        </div>
    );
};

export default input;