import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import BoardWrite from '../Pages/BoardWrite'
import BoardView from '../Pages/BoardView'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/write' element={<BoardWrite />} />
        <Route path='/board/:id' element={<BoardView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router