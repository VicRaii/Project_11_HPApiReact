import React from 'react'
import { ArrowLeft } from 'lucide-react'
import './BackButton.css'

const BackButton = ({ onClick }) => {
  return (
    <button className='back-button flex-className' onClick={onClick}>
      <ArrowLeft /> Home
    </button>
  )
}

export default BackButton
