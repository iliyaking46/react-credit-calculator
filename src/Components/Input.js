import React from "react";

const Input = ({onChange, placeholder, value = ''}) => (
    <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onKeyDown={e => onKeyDown(e)}
        onChange={e => onChange(e.target.value)}
    />
);

export default  Input;