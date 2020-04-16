import React, { useState } from "react";

function SearchItem(props) {
  const [active, setActive] = useState(true);

  function drop() {
    setActive(false);
    props.removeItem(props.id);
  }

  return (
    <div>
      <p>{props.name}</p>
      <button onClick={drop}>X</button>
    </div>
  );
}
export default SearchItem;
