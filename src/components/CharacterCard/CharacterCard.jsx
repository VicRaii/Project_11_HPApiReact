import { useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import './CharacterCard.css'
import CharacterDetails from '../CharacterDetails/CharacterDetails'

const CharacterCard = ({ character, showHint }) => {
  const [flipped, setFlipped] = useState(false)

  const toggleFlip = () => setFlipped(!flipped)

  return (
    <div
      className={`house_card ${showHint ? 'shake' : ''}`}
      onClick={toggleFlip}
    >
      <div className={`card_inner ${flipped ? 'flipped' : ''}`}>
        <div className='card_front'>
          <ul>
            <li>
              <h1>{character.name}</h1>
            </li>
            <li className='img_container'>
              <img
                src={character.alive ? character.image : '/assets/RIP.jpg'}
                alt={character.name}
              />
            </li>
          </ul>
          <div className='flip_icon'>
            <FaSyncAlt />
          </div>
          {showHint && <div className='hint'>Click to see more info</div>}
        </div>

        <div className='card_back flex_className'>
          <CharacterDetails character={character} />
        </div>
      </div>
    </div>
  )
}

export default CharacterCard
