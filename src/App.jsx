import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { AssessmentsPage } from './pages/AssessmentsPage'
import { HomePage } from './pages/HomePage'
import { RankingsPage } from './pages/RankingsPage'
import { ContactUsPage } from './pages/ContactUsPage'


function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App