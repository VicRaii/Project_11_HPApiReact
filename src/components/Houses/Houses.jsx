import { NavLink } from 'react-router-dom'
import './Houses.css'

const Houses = () => {
  return (
    <main className='main_page flex_className'>
      <h1 className='gradient-text'>Choose Your House</h1>
      <section className='container'>
        <NavLink className='house_Link' to='/GryffindorHouse'>
          <div className='houseFlag' id='Gryffindor'>
            <h2>Gryffindor</h2>
          </div>
        </NavLink>

        <NavLink className='house_Link' to='/HufflepuffHouse'>
          {' '}
          <div className='houseFlag' id='Hufflepuff'>
            <h2>Hufflepuff</h2>
          </div>
        </NavLink>

        <NavLink className='house_Link' to='/RavenclawHouse'>
          {' '}
          <div className='houseFlag' id='Ravenclaw'>
            <h2>Ravenclaw</h2>
          </div>
        </NavLink>

        <NavLink className='house_Link' to='/SlytherinHouse'>
          <div className='houseFlag' id='Slytherin'>
            <h2>Slytherin</h2>
          </div>
        </NavLink>
      </section>
    </main>
  )
}

export default Houses
