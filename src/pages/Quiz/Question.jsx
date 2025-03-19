import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading/Loading'

function Question({ question, onAnswer, selectedAnswer }) {
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    setIsAnswered(false)
  }, [question])

  if (!question)
    return (
      <Loading>
        <p>Loading question...</p>
      </Loading>
    )

  const handleAnswer = (selectedOption) => {
    if (isAnswered) return
    setIsAnswered(true)
    onAnswer(selectedOption)
  }

  const getFeedbackMessage = () => {
    if (!isAnswered) return ''
    return selectedAnswer === question.answer
      ? `✅ Correct! Well done! +${question.points} points`
      : `❌ Incorrect! The correct answer was: ${question.answer}`
  }

  return (
    <div className='flex-className '>
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
              isAnswered && option === question.answer ? 'correct' : ''
            } ${isAnswered && option !== question.answer ? 'incorrect' : ''}`}
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
          {getFeedbackMessage()}
        </p>
      )}
    </div>
  )
}

export default Question
