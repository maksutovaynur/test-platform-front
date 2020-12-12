import React from "react";
import './style/App.sass';
import MainMenu from "./containers/Menu";
import Home from "./containers/Home";
import Contact from "./containers/Contact";
import QuizDoor from "./containers/QuizDoor";
import Quiz from "./containers/Quiz";
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <MainMenu />
      <Switch>
        <Route exact from="/" render={props => <Home {...props} />} />
        <Route exact path="/contact" render={props => <Contact {...props} />} />
        <Route exact path="/quiz" render={props => <QuizDoor {...props} />} />
        <Route exact path="/quiz/:quizId?" component={Quiz} />
      </Switch>
    </div>
  );
}

export default App;
