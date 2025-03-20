import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import QuizCompleted from '../../components/QuizCompleted/QuizCompleted'
import { useQuiz } from '../../customHooks/useQuiz'
import Question from '../../components/QuestionCard/Question'
import Loading from '../../components/Loading/Loading'
import WelcomeScreen from '../../components/WelcomeScreen/WelcomeScreen'
import './Quiz.css'

const Quiz = () => {
  const navigate = useNavigate()
  const [showWelcome, setShowWelcome] = useState(true)

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

  const handleNavigate = useCallback(() => navigate('/'), [navigate])

  const handleStartQuiz = useCallback(() => setShowWelcome(false), [])

  useEffect(() => {
    if (feedback) {
      toast(feedback, { position: 'top-center', duration: 2000 })
    }
  }, [feedback])

  if (isLoading)
    return (
      <Loading>
        <p>Loading question...</p>
      </Loading>
    )

  if (error) return <p className='error'>Error: {error}</p>

  if (completed) return <QuizCompleted score={score} onRestart={resetQuiz} />

  return (
    <div className='quiz-container flex-className'>
      {showWelcome ? (
        <WelcomeScreen onStart={handleStartQuiz} />
      ) : (
        <>
          <button
            className='back-button flex-className'
            onClick={handleNavigate}
          >
            <ArrowLeft /> Back
          </button>
          <h2 className='text3D'>Potterhead Quiz</h2>
          <p className='score'>Score: {score}</p>
          <p className='question-info'>
            Question {currentIndex + 1} of {questions.length}
          </p>
          <Question
            key={currentIndex}
            question={questions[currentIndex]}
            onAnswer={answerQuestion}
            selectedAnswer={selectedAnswer}
          />
        </>
      )}
    </div>
  )
}

export default Quiz
