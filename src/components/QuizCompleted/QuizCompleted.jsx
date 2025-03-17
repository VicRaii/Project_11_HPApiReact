import React from 'react'
import Confetti from 'react-confetti'
import './QuizCompleted.css'

function QuizCompleted({ score, onRestart }) {
  return (
    <div className='quiz-completed flex_className'>
      <Confetti />
      <h1>Congrats !</h1>
      <h2>Quiz completed !</h2>
      <p>
        Your final Score is: <span>{score}</span> Bertie Botts Beans
      </p>
      <button className='restart-button' onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  )
}

export default QuizCompleted
