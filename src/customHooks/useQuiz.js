import { useEffect, useReducer, useCallback } from 'react'

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
    case 'ANSWER_QUESTION': {
      const { questions, currentIndex, score } = state
      const currentQuestion = questions[currentIndex]
      const isCorrect = action.payload === currentQuestion.answer

      return {
        ...state,
        score: isCorrect ? score + currentQuestion.points : score,
        feedback: isCorrect
          ? '✅ Correct!'
          : `❌ Incorrect! The correct answer was: ${currentQuestion.answer}`,
        selectedAnswer: action.payload,
        showFeedback: true
      }
    }
    case 'NEXT_QUESTION':
      return state.currentIndex + 1 === state.questions.length
        ? { ...state, completed: true, showFeedback: false }
        : {
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
    const controller = new AbortController()
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/questions`, {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then((data) => dispatch({ type: 'SET_QUESTIONS', payload: data }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'SET_ERROR', payload: error.message })
        }
      })

    return () => controller.abort()
  }, [])

  const answerQuestion = useCallback((answer) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer })

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'NEXT_QUESTION' })
    }, 2500)

    return () => clearTimeout(timeoutId)
  }, [])

  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET_QUIZ' })
  }, [])

  return { ...state, answerQuestion, resetQuiz }
}
