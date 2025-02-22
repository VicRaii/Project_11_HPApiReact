import { Routes, Route } from 'react-router-dom'
import Houses from './components/Houses/Houses'
import VideoBG from './components/VideoBG/VideoBG'
import GryffindorHouse from './pages/GryffindorHouse/GryffindorHouse'
import HufflepuffHouse from './pages/HufflepuffHouse/HufflepuffHouse'
import RavenclawHouse from './pages/RavenclawHouse/RavenclawHouse'
import SlytherinHouse from './pages/SlytherinHouse/SlytherinHouse'

function App() {
  return (
    <>
      <VideoBG />
      <div>
        <Routes>
          <Route path='/' element={<Houses />} />
          <Route path='/GryffindorHouse' element={<GryffindorHouse />} />
          <Route path='/HufflepuffHouse' element={<HufflepuffHouse />} />
          <Route path='/RavenclawHouse' element={<RavenclawHouse />} />
          <Route path='/SlytherinHouse' element={<SlytherinHouse />} />
        </Routes>
      </div>
    </>
  )
}

export default App
