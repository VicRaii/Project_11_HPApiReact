import './CharacterDetails.css'
const CharacterDetails = ({ character }) => {
  return (
    <div className='flex_className'>
      <h2>{character.alternate_names || 'No alternate name'}</h2>
      <h4>Date of Birth: {character.dateOfBirth || 'Unknown'}</h4>
      <h4>Ancestry: {character.ancestry || 'Unknown'}</h4>
      <p>Actor: {character.actor || 'Unknown'}</p>
    </div>
  )
}

export default CharacterDetails
