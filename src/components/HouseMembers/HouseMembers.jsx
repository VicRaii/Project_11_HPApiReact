import { useEffect, useState } from 'react'
import './HouseMembers.css'

const HouseMembers = ({ houseName }) => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('https://hp-api.herokuapp.com/api/characters')
      .then((res) => res.json())
      .then((res) => {
        setCharacters(res.filter((character) => character.house === houseName))
      })
  }, [houseName])

  return (
    <section className={`house ${houseName.toLowerCase()} flex_className`}>
      <h1>{houseName} Members</h1>
      <div
        className={`house_container ${houseName.toLowerCase()}_container flex_className`}
      >
        {characters
          .filter((character) => character.image || !character.alive)
          .map((character) => (
            <ul
              key={character.id}
              className={`house_card ${houseName.toLowerCase()}_card flex_className`}
            >
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
          ))}
      </div>
    </section>
  )
}

export default HouseMembers
