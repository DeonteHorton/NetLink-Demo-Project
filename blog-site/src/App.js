import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogSingle from './components/BlogSingle'
import MyBlogs from './components/YourPost'
import MyBlogSingle from './components/YourPostSingle'
import Login from './components/Login'
import Signup from './components/Signup'
import Post from './components/CreateBlog'
import {StateProvider} from './components/helper/globalState'

function App() {
  // Once the user logs in, their username is stored in the globalState
  const globalState = {
    user:{
      loggedIn:false,
      username:undefined
    }
  }
  // Used the reducer as a dispatch
  const reducer = (state,action) =>{
    switch (action.type) {
      case 'changeUser':
        
        return {
          ...state,
          user:action.newUser
        }
    
      default:
        return state
    }
  }

  return (
    <StateProvider globalState={globalState} reducer={reducer}>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/blog/:id' component={BlogSingle} exact/>
        <Route path='/blog' component={Blog} />
        <Route path='/yourBlogs/:id' component={MyBlogSingle} exact/>
        <Route path='/yourBlogs' component={MyBlogs} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/createPost' component={Post} />
      </Switch>
    </StateProvider>
  );
}

export default App;
