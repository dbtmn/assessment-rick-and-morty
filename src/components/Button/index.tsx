import React from "react"

import "./index.scss";

interface ButtonProps {
    dataTestId?: string;
    className?: string;
    children?: React.ReactNode;
    onClick: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const { className = "", dataTestId, children, onClick } = props;

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        onClick();
    };

    return <div className={`${className} button__wrapper`}>
        <button
            data-testid={dataTestId}
            onClick={handleClick}
        >{children}</button>
    </div>
}

export default Button;