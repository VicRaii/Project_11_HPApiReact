import { useQuiz } from '../../customHooks/useQuiz'
import Question from './Question'
import './Quiz.css'

const Quiz = () => {
  const {
    questions,
    currenIndex,
    score,
    completed,
    answerQuestion,
    isLoading,
    error
  } = useQuiz()

  if (isLoading) return <p>Loading questions...</p>
  if (error) return <p>Error: {error}</p>
  if (completed)
    return (
      <p>
        ¡Quiz completed! Score: {score}/{questions.length}
      </p>
    )

  return (
    <div>
      <h2>Harry Potter Quiz</h2>
      <Question question={questions[currenIndex]} onAnswer={answerQuestion} />
    </div>
  )
}

export default Quiz
