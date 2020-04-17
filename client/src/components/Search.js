import React, { useState, useEffect } from "react";
import SearchItem from "./SearchItem";
import "../app.scss";

function Search() {
  const [searchParam, setSearchParam] = useState("");
  const [items, setItem] = useState([]);
  const [updater, setUpdater] = useState(false);

  const obj = [
    {
      name: "shrimp",
      id: 0
    },
    {
      name: "apple",
      id: 1
    },
    {
      name: "pear",
      id: 2
    },
    {
      name: "lettuce",
      id: 3
    }
  ];

  function searchObj(searchVal) {
    let searchedObj = obj.find(el => el.name === searchVal);
    if (searchedObj) {
      setItem(prev => [...prev, { name: searchVal, id: searchedObj.id }]);
      setSearchParam("");
      console.log(items);
    } else {
      return null;
    }
  }

  function removeItem(id) {
    let findObj = items.find(el => el.id === id);
    let found = items.indexOf(findObj);
    items.splice(found, 1);
    setItem(items);
    setUpdater(!updater);
  }

  function submittedItem(e) {
    e.preventDefault();
    searchObj(searchParam);
  }

  return (
    <div className="side_searchbar">
      <form onSubmit={submittedItem}>
        <input
          className="item_searchbar"
          type="text"
          placeholder="search"
          value={searchParam}
          onChange={e => setSearchParam(e.target.value)}
        />
        <button>Add</button>
      </form>
      <div>
        {items.map(el => (
          <SearchItem
            key={Math.floor(10000 * Math.random())}
            removeItem={removeItem}
            name={el.name}
            id={el.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
