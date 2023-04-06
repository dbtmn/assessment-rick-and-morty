import React, { useState, useEffect } from "react";

import "./index.scss";

interface InputProps {
    id?: string;
    className?: string;
    placeholder?: string;
    isClear: boolean;
    onChange: (value: string) => void;
}

const InputBox: React.FunctionComponent<InputProps> = (props) => {
    const { id = "inputbox", className = "", placeholder = "", isClear, onChange } = props;

    const [inputValue, setInput] = useState<string>("");

    useEffect(() => {
        if (isClear) {
            setInput("");
        }
    }, [isClear]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value as string);
        onChange(e.target.value as string);
    }

    return <div className={`${className} input-box__wrapper`}>
        <input id={id} placeholder={placeholder} value={inputValue} onChange={handleChange} />
    </div>
}

export default InputBox;