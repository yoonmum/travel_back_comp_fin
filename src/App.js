import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from './Search.js';
import Trip from './Trip.js';
import ScrollToTop from './ScrollToTop.js';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Search />
          </Route>
          <Route path="/trip" >
            <Trip />
          </Route>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
