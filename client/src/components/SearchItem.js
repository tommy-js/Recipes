import React, { useState } from "react";
import "../app.scss";

function SearchItem(props) {
  const [inputVal, setInputVal] = useState(0);

  function drop() {
    props.removeItem(props.id);
  }

  function updateInput(e) {
    let numberVal = Number(e.target.value);
    if (typeof numberVal === "number") {
      setInputVal(numberVal);
    }
  }

  return (
    <div>
      <p>{props.name}</p>
      <label>Set maximum number</label>
      <br />
      <input
        className="search_maximum_number"
        type="text"
        placeholder="#"
        maxLength="2"
        onChange={e => updateInput(e)}
      />
      <button onClick={drop}>X</button>
    </div>
  );
}
export default SearchItem;
