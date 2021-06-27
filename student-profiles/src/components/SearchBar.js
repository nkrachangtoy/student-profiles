import React from 'react'

function SearchBar({placeHolder, inputName, handleSearchInput}) {
    return (
        <form>
            <input 
                type="text"
                placeholder={placeHolder}
                name={inputName}
                className="search-bar"
                onChange={handleSearchInput}
                />
        </form>
    )
}

export default SearchBar;
