import React from "react";
import {API_URL} from "../config";
import "../style/Quiz.sass";


async function getQuizData(quizId) {
    const coro = fetch(API_URL + '/quizquestions/' + quizId, {
        method: "GET"
    })
    const resp = (await coro);
    const data = resp.json();
    console.log(`Resp: ${JSON.stringify(data)}`);
    return data;
}


function Question (props) {
    const {number, question_text, options} = props;
    return (<div>
        <h2>#{number}</h2>
        <div dangerouslySetInnerHTML={{__html: question_text}}/>
        <div>{
            Object.keys(options).map(k => {
                const o = options[k];
                return (<div className="q-option">
                    <div className="symb">{k}{")"}</div>
                    <div dangerouslySetInnerHTML={{__html: o}}/>
                </div>)
            })
        }</div>

    </div>)
}


class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
        const urlParams = this.props.match.params;
        const { quizId } = urlParams;

        getQuizData(quizId).then((result) => {
            this.setState({questions: result})
        });
    }
    componentDidMount() {
    }

    render() {
        // const urlParams = this.props.match.params;
        // const { quizId } = urlParams;
        // const searchParams = new URLSearchParams(this.props.location.search);
        const {questions} = this.state;

        return (<div>
            {questions.map((k, i) => (<Question key={i} number={i + 1} {...k}/>))}
        </div>);
    }
};

export default Quiz;
