import { useEffect, useReducer } from 'react'

const INITIAL_STATE = {
  questions: [],
  currentIndex: 0,
  score: 0,
  isLoading: true,
  error: null,
  completed: false,
  feedback: '',
  selectedAnswer: null,
  showFeedback: false
}

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, isLoading: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'ANSWER_QUESTION':
      const currentQuestion = state.questions[state.currentIndex]
      const isCorrect = action.payload === currentQuestion.answer
      return {
        ...state,
        score: isCorrect ? state.score + currentQuestion.points : state.score,
        feedback: isCorrect
          ? '✅ Correct!'
          : `❌ Incorrect! The correct answer was: ${currentQuestion.answer}`,
        selectedAnswer: action.payload,
        showFeedback: true
      }
    case 'NEXT_QUESTION':
      if (state.currentIndex + 1 === state.questions.length) {
        return { ...state, completed: true, showFeedback: false }
      }
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        feedback: '',
        selectedAnswer: null,
        showFeedback: false
      }
    case 'RESET_QUIZ':
      return { ...INITIAL_STATE, questions: state.questions, isLoading: false }
    default:
      return state
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE)

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/questions')
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then((data) => dispatch({ type: 'SET_QUESTIONS', payload: data }))
      .catch((error) => dispatch({ type: 'SET_ERROR', payload: error.message }))
  }, [])

  function answerQuestion(answer) {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer })
    setTimeout(() => {
      dispatch({ type: 'NEXT_QUESTION' })
    }, 2500)
  }

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' })
  }

  return { ...state, answerQuestion, resetQuiz }
}
