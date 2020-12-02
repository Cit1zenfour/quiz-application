import React, {Component} from "react";
import classes from './Quiz.module.css'
import MaterialQuiz from "../../components/MaterialQuiz/MaterialQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Столица Узбекистана:',
                answers: [
                    {text: 'Бишкек', id: 1},
                    {text: 'Ташкент', id: 2},
                    {text: 'Самарканд', id: 3},
                    {text: 'Бухара', id: 4},
                ],
                rightAnswer: 2
            },
            {
                id: 2,
                question: 'Сколько цветов на флаге Узбекистана?',
                answers: [
                    {text: '5', id: 1},
                    {text: '2', id: 2},
                    {text: '3', id: 3},
                    {text: '4', id: 4},
                ],
                rightAnswer: 3
            },
            {
                id: 3,
                question: 'Президент РФ:',
                answers: [
                    {text: 'Вдадимир Владимирович Путин', id: 1},
                    {text: 'Шавкат Мирзиёев', id: 2},
                    {text: 'Дмитрий Анатольевич Медведев', id: 3},
                    {text: 'Джозеф Робинетт Байден', id: 4},
                ],
                rightAnswer: 1
            },
            {
                id: 4,
                question: 'Сколько стран входят в СНГ?',
                answers: [
                    {text: '13', id: 1},
                    {text: '17', id: 2},
                    {text: '9', id: 3},
                    {text: '11', id: 4},
                ],
                rightAnswer: 3
            },
            {
                id: 5,
                question: 'В Европейский союз входят:',
                answers: [
                    {text: '25 государств', id: 1},
                    {text: '24 государств', id: 2},
                    {text: '29 государств', id: 3},
                    {text: '28 государств', id: 4},
                ],
                rightAnswer: 4
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }


        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswer === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 500)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 500)
        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion:0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <MaterialQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz