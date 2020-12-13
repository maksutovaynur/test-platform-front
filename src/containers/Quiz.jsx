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

function putAnswer(quiz_id, question_key, answer) {
    localStorage.setItem(`${quiz_id}/${question_key}`, answer);
}

function getAnswer(quiz_id, question_key) {
    return localStorage.getItem(`${quiz_id}/${question_key}`) || undefined;
}

function Question (props) {
    const {number, question_text, question_group_text, options,
        setAnswer, answerGiven, question_key} = props;
    return (<div className="question">
        <h2>#{number}</h2>
        <div className="q-group" dangerouslySetInnerHTML={{__html: question_group_text}}/>
        <div dangerouslySetInnerHTML={{__html: question_text}}/>
        <div>{
            Object.keys(options).map(k => {
                const o = options[k];
                var selected = false;
                if (answerGiven === k) selected = true;
                const qClass = "q-option" + (selected ? " q-option-selected" : "");
                return (<div className={qClass} onClick={() => setAnswer(question_key, k)}>
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
            this.setState({questions: result}, this.fixQuestions)
        });
    }
    componentDidMount() {
    }

    fixQuestions = () => {
        const urlParams = this.props.match.params;
        const { quizId } = urlParams;
        this.setState(({questions}) => {
            const newQuestions = questions.map(q => ({
                ...q,
                answerGiven: getAnswer(quizId, q.question_key)
            }))
            return {questions: newQuestions}
        })
    }

    setAnswer = (qk, a) => {
        const urlParams = this.props.match.params;
        const { quizId } = urlParams;
        putAnswer(quizId, qk, a);
        this.setState({[`Q${qk}`]: a}, this.fixQuestions);
    }

    render() {
        // const urlParams = this.props.match.params;
        // const { quizId } = urlParams;
        // const searchParams = new URLSearchParams(this.props.location.search);
        const {questions} = this.state;
        const urlParams = this.props.match.params;
        const { quizId } = urlParams;

        return (<div>
            <h1>{quizId}</h1>
            {questions.map((k, i) => (<Question
                key={i}
                setAnswer={this.setAnswer}
                number={i + 1} {...k}
            />))}
        </div>);
    }
};

export default Quiz;
