import React from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListCreditCardComponent from './components/ListCreditCardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateCreditCardComponent from './components/CreateCreditCardComponent';

import ViewCreditCardComponent from './components/ViewCreditCardComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListCreditCardComponent}></Route>
                          <Route path = "/creditcard" component = {ListCreditCardComponent}></Route>
                          <Route path = "/add-creditcard/:id" component = {CreateCreditCardComponent}></Route>
                          <Route path = "/view-creditcard/:id" component = {ViewCreditCardComponent}></Route>
                          {/* <Route path = "/update-creditcard/:id" component = {UpdateCreditCardComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
