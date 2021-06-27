import React from 'react'

function SearchBar({setSearchTerm, searchTerm}) {

    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm({
            ...searchTerm,
            [e.target.name]: value
        });
    }

    return (
        <form>
            <input 
                type="text"
                placeholder="Search by name"
                name="name"
                value={searchTerm.name}
                className="search-bar"
                onChange={handleSearchInput}
                />
            <input 
                type="text" 
                placeHolder="Seach by tag"
                name="tag"
                value={searchTerm.tag}
                className="search-bar"
                onChange={handleSearchInput}
            />
        </form>
    )
}

export default SearchBar;
