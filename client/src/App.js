import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Intern} from './Intern';
import {Client} from './Client';
import {Navigation} from './Navigation'

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          Company Managment Service
        </h3>

        <Navigation/>

        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/department' component={Department} exact/>
          <Route path='/employee' component={Employee} exact/>
          <Route path='/intern' component={Intern} exact/>
          <Route path='/client' component={Client} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
