import React, { useState, useContext } from "react";
import { IndividualContext } from "../App";

function History(props) {
  const { userData, setUserData } = useContext(IndividualContext);
  const [history, setHistory] = useState([]);

  function mapHistory() {
    if (userData.history) {
      setHistory(userData.history);
      return history.map(el => <div>Comp</div>);
    } else {
      return "Nothing here";
    }
  }

  return <div>{mapHistory()}</div>;
}

export default History;
