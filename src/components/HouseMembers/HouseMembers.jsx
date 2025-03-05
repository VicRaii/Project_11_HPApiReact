import { useEffect, useState } from 'react'
import './HouseMembers.css'
import CharacterCard from '../CharacterCard/CharacterCard'
import Loading from '../Loading/Loading'

const HouseMembers = ({ houseName }) => {
  const [characters, setCharacters] = useState([])
  const [showHint, setShowHint] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      'https://project-11-hp-api-react-backend.vercel.app/api/v1/characters'
    )
      .then((res) => res.json())
      .then((res) => {
        const updatedCharacters = res
          .filter((character) => character.house === houseName)
          .map((character, index) => ({
            ...character,
            id: character.id || `${houseName}-${index}`
          }))

        setCharacters(updatedCharacters)
        setLoading(false)
      })

    setTimeout(() => setShowHint(false), 5000)
  }, [houseName])

  if (loading) {
    return <Loading />
  }

  return (
    <section className={`house ${houseName.toLowerCase()} flex_className`}>
      <h1>{houseName} Members</h1>
      <div
        className={`house_container ${houseName.toLowerCase()}_container flex_className`}
      >
        {characters
          .filter((character) => character.image)
          .map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              showHint={showHint}
            />
          ))}
      </div>
    </section>
  )
}

export default HouseMembers
