import React from 'react';
import styles from './styles.module.css';

const input = (props) => {
    let inputElement;
    switch (props.elementType) {
        case 'input':
            inputElement = <input
                type={props.type}
                className= {styles.InputElement}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case 'textarea':
            inputElement = <textarea
                className= {styles.InputElement}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed}>
      </textarea>;
            break;
        default:
            inputElement = <input
                className= {styles.InputElement}
                value={props.value}
                onChange={props.changed}
            />;
            break;
    }
    return (
        <div className={styles.Input}>
            <div className={styles.Label}> {props.label} </div>
            {inputElement}
        </div>
    );
};

export default input;