import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import USMap from "./USMap";
import State from "./State";

function App() {
  const [currState, setCurrState] = useState(null)
  

  return (
    <Switch>
      <Route path='/map'>
        <USMap currState={currState} setCurrState={setCurrState} />
      </Route>
      <Route path={`/${currState}`}>
        <State state={currState} />
      </Route>
    </Switch>
  )
}

export default App;
