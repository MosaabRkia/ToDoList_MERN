// import {useState , useEffect,react} from 'react';
import { Switch ,Route } from "react-router-dom";
import './App.css';
import LoadPage from "./Components/LoadPage";
import SignUp from './Components/SignUp';
import TaskAdd from './Components/TaskAdd'

export default function App() {
  return (
    <div className="App">
      <Switch>
<Route exact path="/">
  <SignUp />
</Route>
<Route exact path='/TaskAdd'>
<TaskAdd />
</Route>
<Route path="/LoadPage">
<LoadPage />
</Route>
      </Switch>
    </div>
  );
}


