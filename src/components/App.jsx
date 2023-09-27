import React from "react";
import './app.less';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
import Main from "./main/Main";
import Card from "./card/card";
import Error from "./main/error/Error";

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.repos.count);

  function onCountClick() {
    dispatch(setCount(5));
  }

  return (
    <div className="app">
      <div className="count-t">
        React is working!
        <button onClick={()=>onCountClick()}> COUNT </button>
        <span>{count}</span>
      </div>
      <BrowserRouter>
        <div className="container">
          <div className="main">
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/card/:username/:reponame" component={Card}/>
              <Route path="/error" component={Error}/>
              <Redirect to="/"></Redirect>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>     
  );
};

export default App;
