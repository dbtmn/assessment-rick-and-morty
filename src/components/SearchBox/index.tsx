import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
}

const SearchBox: React.FunctionComponent<SearchBoxProps> = (props) => {
    const { className = "", searchResult, placeholder = "", onChange } = props;
    const refSuggestionsMenu = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
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
        const value: string = e.target.value;
        setInput(value);
        setIsMenuOpen(true);
        onChange(value);
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

    const handleRoute = (id: number) => {
        navigate({
            pathname: '/character-detail',
            search: `?id=${id}`,
        });
    };

    return <div className={`${className} search-box__wrapper`}>
        <div className="search-box__input-wrapper">
            <input
                data-testid={DataTestId.SEARCH}
                id="search-bar"
                list="characters-list"
                placeholder={placeholder}
                type="text"
                className="search-box__input"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown} />
            <input
                type="text"
                id="search-bar-disabled"
                readOnly
                className="search-box__input"
                value={getShadowInput()}
            />
            <span className="material-icons search-box__search-icon">
                search
            </span>
            {isMenuOpen ? <div ref={refSuggestionsMenu} className="search-box__result-list" id="characters-list">
                {results.map((character) => <div key={`character-item-${character.id}`} className="search-box-result__item">
                    <div data-testid={DataTestId.NAVIGATE_CHARACTER_DETAIL} className="search-box-result__details" onClick={() => handleRoute(character.id)}>
                        {character.image && <div className="search-box-result__image">
                            <img src={character.image} />
                        </div>}
                        <div data-testid={DataTestId.NAME}>{character.name}</div></div>
                </div>
                )}
            </div> : null}
        </div>
    </div>
};

export default SearchBox;