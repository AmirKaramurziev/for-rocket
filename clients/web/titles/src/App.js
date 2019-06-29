import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './views/login/login';
import RegisterPage from './views/register/regist';
import Header from './views/header/header';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Header}/>
          <Route path= "/login" component={LoginPage}/>
          <Route path="/regist" component={RegisterPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
