import React, { useRef, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { DataTestId } from "../../constants/DataTestId";
import { Character } from "../../store/characters/types";

import "./index.scss";

interface SearchBoxProps {
    id?: string;
    className?: string;
    searchResult: Character[];
    placeholder?: string;
    onChange: (value: string) => void;
    onClick: (value: string) => void;
}

const SearchBox: React.FunctionComponent<SearchBoxProps> = (props) => {
    const { className = "", searchResult, placeholder = "", onChange, onClick } = props;
    const refSuggestionsMenu = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const results = searchResult.slice(0, 6);

    const [inputValue, setInput] = useState<string>("");

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (isMenuOpen && refSuggestionsMenu.current && !refSuggestionsMenu.current.contains(e.target as HTMLDivElement)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(results);
        const value: string = e.target.value;
        setInput(value);
        setIsMenuOpen(true);
        onChange(value);
    }

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

    const getShadowInput = () => {
        if (isEmpty(results) || !isMenuOpen) {
            return "";
        } else {
            if (results[0].name.startsWith(inputValue)) {
                return results[0].name;
            } else {
                return "";
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const shadowInput: HTMLInputElement = document.querySelector("#search-bar-disabled") as HTMLInputElement || null;

        if (e.code === "ArrowRight") {
            setInput(shadowInput.value);
            onChange(shadowInput.value);
        }
    };

    return <div className={`${className} search-box__wrapper`}>
        <div className="search-box__input-wrapper">
            <input
                id="search-bar"
                list="characters-list"
                placeholder={placeholder}
                type="text"
                className="search-box__input"
                value={inputValue}
                onChange={handleChange}
                onKeyPress={(e) => handleEnter(e)}
                onKeyDown={handleKeyDown} />
            <input
                type="text"
                id="search-bar-disabled"
                readOnly
                className="search-box__input"
                value={getShadowInput()}
            />
            <span data-testid={DataTestId.SEARCH} className="material-icons search-box__search-icon" onClick={handleClick}>
                search
            </span>
            {isMenuOpen ? <div ref={refSuggestionsMenu} className="search-box__result-list" id="characters-list">
                {results.map((character) => <div key={`character-item-${character.id}`} className="search-box-result__item">
                    <div className="search-box-result__details">
                        {character.image && <div className="search-box-result__image">
                            <img src={character.image} />
                        </div>}
                        <div>{character.name}</div></div>
                </div>
                )}
            </div> : null}
        </div>
    </div>
};

export default SearchBox;