import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { AssessmentsPage } from './pages/AssessmentsPage'
import { HomePage } from './pages/HomePage'
import { RankingsPage } from './pages/RankingsPage'
import { ContactUsPage } from './pages/ContactUsPage'
import { Footer } from './components/Footer'
import { SideBar } from './components/SideBar'
import { AssessmentDetailPage } from './pages/AssessmentDetailPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { AttemptPage } from './pages/AttemptPage'
import { ProfilePage } from './pages/ProfilePage'
import { LostPasswordPage } from './pages/LostPasswordPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <SideBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessments" element={<AssessmentsPage />} />
            <Route path="/assessments/:id" element={<AssessmentDetailPage />} />
            <Route path="/attempts/:id" element={<AttemptPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/lostpassword" element={<LostPasswordPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App