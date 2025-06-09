
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import Navbar from './components/Navbar'

function App() {

  return (
      <div className="top-0 right-0 p-0 m-0 flex flex-col items-start min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </div>
  )
}

export default App
