import React from 'react';
import {Switch,Route} from 'react-router-dom'
// import Header from './components/Header'
import Blog from './components/Blog'
function App() {
  return (
    <Switch>
      <Route path='/' component={Blog} exact />
    </Switch>
  );
}

export default App;
