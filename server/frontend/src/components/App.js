import React, {createContext, useState} from 'react';
import {render} from "react-dom";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./HomePage";
import {Context} from "../Context"
import ApexChart from "./ApexChart";

export default function App() {
  const [context, setContext] = useState();
  return (
      <Router>
        <Switch>
          <Context.Provider value={[context, setContext]}>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/chart" component={ApexChart}/>
          </Context.Provider>
        </Switch>
      </Router>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);