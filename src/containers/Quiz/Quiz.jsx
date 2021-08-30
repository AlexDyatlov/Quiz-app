import React from 'react';

import classes from './Quiz.module.scss';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Что не является языком программирования?',
        rightAnswerId: 3,
        id: 1,
        answers: [
          {id: 1, text: 'C++'},
          {id: 2, text: 'Java'},
          {id: 3, text: 'HTML'},
          {id: 4, text: 'PHP'}
        ]
      },
      {
        question: 'В каком году появился ЯП JavaScript?',
        rightAnswerId: 1,
        id: 2,
        answers: [
          {id: 1, text: ' 1995'},
          {id: 2, text: ' 1991'},
          {id: 3, text: ' 1999'},
          {id: 4, text: ' 2009'}
        ]
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

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId ) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }


      this.setState({
        answerState: {[answerId]: 'success'},
        results
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
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      results: {}
    })
  }

  componentDidMount() {
    console.log('Quiz ID = ', this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Пройдите викторину</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz 
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
              : <ActiveQuiz 
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            /> }
        </div>
      </div>
    )
  }
}

export default Quiz;