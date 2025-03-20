import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

const QuizHeader = ({ score }) => {
  const navigate = useNavigate()

  const handleBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <div className='quiz-header'>
      <button className='back-button' onClick={handleBack}>
        <ArrowLeft /> Back
      </button>
      <h2 className='text3D'>Potterhead Quiz</h2>
      <p className='score'>Score: {score}</p>
    </div>
  )
}

export default React.memo(QuizHeader)
