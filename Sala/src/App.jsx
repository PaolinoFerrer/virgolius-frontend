import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import ClassifichePage from './pages/ClassifichePage.jsx'
import CercaPiattiPage from './pages/CercaPiattiPage.jsx'
import FoodBloggerPage from './pages/FoodBloggerPage.jsx'
import InfoPage from './pages/InfoPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classifiche" element={<ClassifichePage />} />
          <Route path="/cerca-piatti" element={<CercaPiattiPage />} />
          <Route path="/foodblogger" element={<FoodBloggerPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
