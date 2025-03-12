import { useEffect, useReducer } from 'react'

const INITIAL_STATE = {
  questions: [],
  currentIndex: 0,
  score: 0,
  isLoading: true,
  error: null,
  completed: false
}

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, isLoading: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'ANSWER_QUESTION':
      const isCorrect =
        action.payload === state.questions[state.currentIndex].correctAnswer
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentIndex: state.currentIndex + 1,
        completed: state.currentIndex + 1 === state.questions.length
      }
    default:
      return state
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_STATE)

  useEffect(() => {
    fetch('https://project-11-hp-api-react-backend.vercel.app/api/v1/questions')
      .then((res) => {
        if (!res.ok) throw new Error('Error loading questions')
        return res.json()
      })
      .then((data) => dispatch({ type: 'SET_QUESTIONS', payload: data }))
      .catch((error) => dispatch({ type: 'SET_ERROR', payload: error.message }))
  }, [])
  function answerQuestion(answer) {
    dispatch({ type: 'ANSWER_QUESTION', payload: answer })
  }
  return { ...state, answerQuestion }
}
