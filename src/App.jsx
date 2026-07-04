import { BrowserRouter } from 'react-router-dom'
import Header from './Components/Header/Header'
import Router from './Router/Router'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  )
}

export default App