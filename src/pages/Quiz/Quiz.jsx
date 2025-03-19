import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import QuizCompleted from '../../components/QuizCompleted/QuizCompleted'
import { useQuiz } from '../../customHooks/useQuiz'
import Question from './Question'
import Loading from '../../components/Loading/Loading'
import './Quiz.css'

const Quiz = () => {
  const navigate = useNavigate()
  const [showWelcome, setShowWelcome] = useState(true)
  const [animateExit, setAnimateExit] = useState(false)

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
        <motion.div
          className={`welcome-screen ${animateExit ? 'closing' : ''}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='welcome-half left'
            animate={animateExit ? { x: '-100vw' } : { x: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <h1 className='text3D'>Welcome to the Potterhead Quiz ⚡</h1>
          </motion.div>

          <motion.div
            className='welcome-half right'
            animate={animateExit ? { x: '100vw' } : { x: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <p className='welcome-text'>
              Show how much you know about the magical world of Harry Potter.
            </p>
            <motion.button
              className='start-button'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setAnimateExit(true)
                setTimeout(() => setShowWelcome(false), 2400)
              }}
            >
              Start 🧙‍♂️
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <button
            className='back-button flex-className'
            onClick={() => navigate('/')}
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

//! COMPONETIZAR Y COMPROBAR RE-RENDERIZACIONES INNECESARIAS
