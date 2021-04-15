import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Home from './components/Layout/Home';
import Login from './components/Auth/Login';
import Error from './components/Layout/Error';
import Post from './components/Posts/Post';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/signin'><Login /></Route>
        <Route path='/:id' children={<Post />}></Route>
        <Route path='*'><Error /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
