import { Routes, Route } from 'react-router-dom'
import Houses from './components/Houses/Houses'
import VideoBG from './components/VideoBG/VideoBG'
import GryffindorHouse from './pages/GryffindorHouse/GryffindorHouse'
import HufflepuffHouse from './pages/HufflepuffHouse/HufflepuffHouse'
import RavenclawHouse from './pages/Ravenclawhouse/Ravenclawhouse'
import SlytherinHouse from './pages/SlytherinHouse/SlytherinHouse'

function App() {
  return (
    <>
      <div>
        <VideoBG />
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
