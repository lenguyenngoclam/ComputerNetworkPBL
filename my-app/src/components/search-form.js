import React from "react";
import { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";

function SearchForm() {
    const { setSearchTerms } = useGlobalContext();
    const searchRef = useRef('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const searchChange = (event) => {
        setSearchTerms(searchRef.current.value);
    }

    useEffect(() => {
        searchRef.current.focus();
    }, []);

    return (
        <section className="section search">
            <form className="search-form" onClick={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Enter the cocktail name</label>
                    <input type="text" id="name" name="name" onChange={searchChange} ref={searchRef} />
                </div>
            </form>
        </section>
    );
}

export default SearchForm;