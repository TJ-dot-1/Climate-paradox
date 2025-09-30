import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Stories from './pages/Stories'
import Petition from './pages/Petition'
import Data from './pages/Data'
import About from './pages/About'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/petition" element={<Petition />} />
            <Route path="/data" element={<Data />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App