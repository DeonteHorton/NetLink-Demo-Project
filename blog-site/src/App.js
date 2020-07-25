import React from 'react';
import {Switch,Route} from 'react-router-dom'
// import Header from './components/Header'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogSingle from './components/BlogSingle'
import Login from './components/Login'
import Signup from './components/Signup'
import Post from './components/CreateBlog'

function App() {
  return (
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/blog/:id' component={BlogSingle} exact/>
      <Route path='/blog' component={Blog} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/createPost' component={Post} />
    </Switch>
  );
}

export default App;
