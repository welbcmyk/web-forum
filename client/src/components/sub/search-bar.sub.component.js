import React from "react";

function SearchBar(props) {
    const callSearchFunctionOnEnter = (e) => {
        if(e.key === 'Enter') {
            props.onKeyEnter();
        }
    }

    return (
        <div className="form-group">
            <input
                placeholder="Search"
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                onKeyDown={callSearchFunctionOnEnter}
                value={props.value}
            />
        </div>
    );
}

export default SearchBar;