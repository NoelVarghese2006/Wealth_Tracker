
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import { ThemeProvider } from './components/ThemeProvider'
import MainPage from './pages/MainPage'
import DataPage from './pages/DataPage'
import ChartPage from './pages/ChartPage'
import AddPage from './pages/AddPage'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="top-0 right-0 p-0 m-0 flex flex-col items-start min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/main/data' element={<DataPage />} />
          <Route path='/main/charts' element={<ChartPage />} />
          <Route path='/main/add' element={<AddPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
