import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import React from 'react'
import './WelcomeScreen.css'

const WelcomeScreen = ({ onStart }) => {
  const [animateExit, setAnimateExit] = useState(false)

  const handleStart = useCallback(() => {
    setAnimateExit(true)
    setTimeout(onStart, 1900)
  }, [onStart])

  return (
    <motion.div
      className='welcome-screen'
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
          onClick={handleStart}
        >
          Start 🧙‍♂️
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default React.memo(WelcomeScreen)
