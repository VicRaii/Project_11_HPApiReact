import React, { useState, useEffect } from 'react'

function Question({ question, onAnswer, selectedAnswer }) {
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    setIsAnswered(false)
  }, [question])

  if (!question) return <p>Loading question...</p>

  const handleAnswer = (selectedOption) => {
    if (isAnswered) return
    setIsAnswered(true)
    onAnswer(selectedOption)
  }

  const getButtonClass = (option) => {
    if (!isAnswered) return ''
    if (option === question.answer) return 'correct'
    if (option === selectedAnswer && option !== question.answer)
      return 'incorrect'
    return ''
  }

  return (
    <div>
      <p className='question-info'>
        Level: {question.level} | +{question.points} points
      </p>
      <h2 className='question-text'>{question.question}</h2>
      <div className='options-container'>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
            className={getButtonClass(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Question
