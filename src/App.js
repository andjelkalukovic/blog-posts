import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Home from './components/Layout/Home';
import Login from './components/Auth/Login';
import Error from './components/Layout/Error';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {user ? <Route exact path='/'><Home /></Route> :
          <Route path='/'><Login /></Route>}
        <Route path='*'><Error /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
