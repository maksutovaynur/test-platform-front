import React from "react";
import {useLocation} from "react-router-dom";

const Quiz = (props) => {
  const urlParams = props.match.params;
  const searchParams = new URLSearchParams(useLocation().search);
  const { quizId } = urlParams;
  return (<div>
    This is the 'Quiz' with quizId='{quizId}'.
    <br/>
    Code = {searchParams.get("code")}
    <br/>
    All others: {JSON.stringify(props)}
  </div>);
};

export default Quiz;
