import { useCallback, useMemo } from 'react'

const QuestionCard = ({ question, onAnswer, selectedAnswer }) => {
  const handleAnswer = useCallback(
    (option) => {
      if (selectedAnswer === null) onAnswer(option)
    },
    [onAnswer, selectedAnswer]
  )

  return (
    <div className='question-container'>
      <p className='question-info'>
        Level {question.level} | Value: +{question.points} points
      </p>
      <h2 className='question-text'>{question.question}</h2>
      <div className='options-container'>
        {question.options.map((option, index) => {
          const buttonClass = useMemo(() => {
            if (selectedAnswer === option) {
              return option === question.answer ? 'correct' : 'incorrect'
            }
            return ''
          }, [selectedAnswer, question.answer, option])

          return (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`quiz-option ${buttonClass}`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(QuestionCard)
