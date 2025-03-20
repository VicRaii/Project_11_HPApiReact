import React, { useMemo } from 'react'
import Loading from '../Loading/Loading'
import './Question.css'

function Question({ question, onAnswer, selectedAnswer }) {
  if (!question)
    return (
      <Loading>
        <p>Loading question...</p>
      </Loading>
    )

  const isAnswered = selectedAnswer !== null

  const handleAnswer = (selectedOption) => {
    if (!isAnswered) onAnswer(selectedOption)
  }

  const feedbackMessage = useMemo(() => {
    if (!isAnswered) return ''
    return selectedAnswer === question.answer
      ? `✅ Correct! Well done! +${question.points} points`
      : `❌ Incorrect! The correct answer was: ${question.answer}`
  }, [selectedAnswer, question.answer, question.points])

  return (
    <div className='flex-className'>
      <p className='question-info'>Level {question.level}</p>
      <p className='question-info'>Value: +{question.points} points</p>
      <h2 className='question-text'>{question.question}</h2>
      <div className='options-container'>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
            className={`quiz-option ${
              isAnswered
                ? option === question.answer
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <p
          className={`feedback-message ${
            selectedAnswer === question.answer ? 'correct' : 'incorrect'
          }`}
        >
          {feedbackMessage}
        </p>
      )}
    </div>
  )
}

export default React.memo(Question)
