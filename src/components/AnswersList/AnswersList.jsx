import React from 'react';

import classes from './AnswersList.module.scss';

import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = (props) => {
  return (
      <ul>
        { props.answers.map((answer, index) => {
          return (
            <AnswerItem
              key={`${answer}_${index}`}
              answer={answer}
              onAnswerClick={props.onAnswerClick}
              state={props.state ? props.state[answer.id] : null}
            />
          )
        }) }
      </ul>
  )
}

export default AnswersList;