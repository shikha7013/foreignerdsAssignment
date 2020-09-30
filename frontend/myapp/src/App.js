import React from 'react';
import './App.css';
import Login from './components/LoginPage'
import {Switch,Route,Redirect} from 'react-router-dom'
import Register from './components/RegisterPage';
import PageNotFound from './components/Pagenotfound'

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" exact>
          <Login></Login>
        </Route>
        <Route path="/register" exact>
          <Register></Register>
        </Route>
        <Redirect from ="/" to="/login" exact>
        </Redirect>
        <Route >
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
    </React.Fragment>
  );
}


export default App;
