import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './HouseMembers.css'
import CharacterCard from '../CharacterCard/CharacterCard'
import Loading from '../Loading/Loading'
import { ArrowLeft } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL

const HouseMembers = ({ houseName }) => {
  const [characters, setCharacters] = useState([])
  const [showHint, setShowHint] = useState(true)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let endpoint = ''

    if (location.pathname.includes('/characters')) {
      endpoint = `${API_BASE_URL}/api/v1/characters`
    } else if (location.pathname.includes('/questions')) {
      endpoint = `${API_BASE_URL}/api/v1/questions`
    } else {
      return
    }

    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        const updatedData = res
          .filter((item) => item.house === houseName) // Filtrar por casa
          .map((item, index) => ({
            ...item,
            id: item.id || `${houseName}-${index}`
          }))

        setCharacters(updatedData)
        setLoading(false)
      })
      .catch((error) => console.error('Error fetching data:', error))

    const hintTimeout = setTimeout(() => setShowHint(false), 5000)

    return () => clearTimeout(hintTimeout) // Cleanup
  }, [houseName, location.pathname]) // Se ejecuta cuando cambia `houseName` o la ruta

  if (loading) {
    return <Loading />
  }

  return (
    <section className={`house ${houseName.toLowerCase()} flex_className`}>
      <h1>{houseName} Members</h1>
      <button
        className='back-button flex-className'
        onClick={() => navigate('/')}
      >
        <ArrowLeft /> Back
      </button>
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
