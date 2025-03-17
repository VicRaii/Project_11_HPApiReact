import QuizCompleted from '../../components/QuizCompleted/QuizCompleted'
import { useQuiz } from '../../customHooks/useQuiz'
import Question from './Question'
import { useEffect } from 'react'
import { toast } from 'sonner'
import './Quiz.css'

const Quiz = () => {
  const {
    questions,
    currentIndex,
    score,
    completed,
    answerQuestion,
    isLoading,
    error,
    feedback,
    selectedAnswer,
    resetQuiz
  } = useQuiz()

  useEffect(() => {
    if (feedback) {
      toast(feedback, { position: 'top-center', duration: 2000 })
    }
  }, [feedback])

  if (isLoading) return <p className='loading'>Loading questions...</p>
  if (error) return <p className='error'>Error: {error}</p>
  if (completed) return <QuizCompleted score={score} onRestart={resetQuiz} />

  return (
    <div className='quiz-container'>
      <h2 className='text3D'>Harry Potter Quiz</h2>
      <p className='score'>Score: {score}</p>
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>

      <Question
        key={currentIndex}
        question={questions[currentIndex]}
        onAnswer={answerQuestion}
        selectedAnswer={selectedAnswer}
      />
    </div>
  )
}

export default Quiz
