import { useEffect, useState } from 'react'
import { FaSyncAlt } from 'react-icons/fa'
import './HouseMembers.css'

const HouseMembers = ({ houseName }) => {
  const [characters, setCharacters] = useState([])
  const [flippedCards, setFlippedCards] = useState({})
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    fetch('https://hp-api.herokuapp.com/api/characters')
      .then((res) => res.json())
      .then((res) => {
        setCharacters(res.filter((character) => character.house === houseName))
      })

    setTimeout(() => setShowHint(false), 4000)
  }, [houseName])

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <section className={`house ${houseName.toLowerCase()} flex_className`}>
      <h1>{houseName} Members</h1>
      <div
        className={`house_container ${houseName.toLowerCase()}_container flex_className`}
      >
        {characters
          .filter((character) => character.image || !character.alive)
          .map((character) => (
            <div
              key={character.id}
              className={`house_card ${houseName.toLowerCase()}_card ${
                showHint ? 'shake' : ''
              }`}
              onClick={() => toggleFlip(character.id)}
            >
              <div
                className={`card_inner ${
                  flippedCards[character.id] ? 'flipped' : ''
                }`}
              >
                <div className='card_front'>
                  <ul>
                    <li>
                      <h1>{character.name}</h1>
                    </li>
                    <li className='img_container'>
                      <img
                        src={
                          character.alive ? character.image : '/assets/RIP.jpg'
                        }
                        alt={character.name}
                      />
                    </li>
                  </ul>
                  <div className='flip_icon'>
                    <FaSyncAlt />
                  </div>
                  {showHint && (
                    <div className='hint'>¡Haz clic para ver más!</div>
                  )}
                </div>
                <div className='card_back'>
                  <h2>{character.alternate_names[0]}</h2>
                  <h4>Date of Birth: {character.dateOfBirth}</h4>
                  <h4>Ancestry: {character.ancestry}</h4>
                  {/* <h4>
                    Wand: Wood: {character.wand.wood}, Core:{' '}
                    {character.wand.core}, Length: {character.wand.length}
                  </h4> */}

                  <p>Actor: {character.actor}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default HouseMembers
