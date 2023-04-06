import React, { useState } from "react";
import { DataTestId } from "../../constants/DataTestId";

import "./index.scss";

interface SearchBoxProps {
    id?: string;
    className?: string;
    placeholder?: string;
    onClear: () => void;
    onClick: (value: string) => void;
}

const SearchBox: React.FunctionComponent<SearchBoxProps> = (props) => {
    const { id = "searchbox", className = "", placeholder = "", onClear, onClick } = props;

    const [inputValue, setInput] = useState<string>("");
    const [isClear, setClear] = useState<boolean>(false);

    const getClearClassName = () => {
        return `material-icons search-box__clear-icon${isClear ? "--visible" : ""}`;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        if (!isClear) {
            setClear(true);
        }
        if (value.length === 0) {
            setClear(false);
        }
        setInput(value);
    }

    const handleClear = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setClear(false);
        setInput("");
        onClear();
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        onClick(inputValue);
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            e.preventDefault();
            onClick(inputValue);
        }
    }

    return <div className={`${className} search-box__wrapper`}>
        <div className="search-box__input-wrapper">
            <input
                id={id}
                placeholder={placeholder}
                type="search"
                className="search-box__input"
                value={inputValue}
                onChange={handleChange}
                onKeyPress={(e) => handleEnter(e)} />
            <span className={getClearClassName()} onClick={handleClear}>
                clear
            </span>
        </div>
        <span data-testid={DataTestId.SEARCH} className="material-icons search-box__search-icon" onClick={handleClick}>
            search
        </span>
    </div>
};

export default SearchBox;