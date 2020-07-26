import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogSingle from './components/BlogSingle'
import Login from './components/Login'
import Signup from './components/Signup'
import Post from './components/CreateBlog'
import {StateProvider} from './components/helper/globalState'

function App() {

  const globalState = {
    user:{
      loggedIn:false,
      username:''
    }
  }

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
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/createPost' component={Post} />
      </Switch>
    </StateProvider>
  );
}

export default App;
