import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TournamentPage from './pages/TournamentPage';
import MembersPage from './pages/MembersPage';
import CalendarPage from './pages/CalendarPage';
import ContactPage from './pages/ContactPage';
import SignUpPage from './pages/SignUpPage';
import PrivacyPage from './pages/PrivacyPage';
import ImprintPage from './pages/ImprintPage';

function App() {
  return (
    <Router basename="/JUFO-Web">
      <div className="min-h-screen flex flex-col bg-dark-bg">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/turnier" element={<TournamentPage />} />
            <Route path="/mitglieder" element={<MembersPage />} />
            <Route path="/kalender" element={<CalendarPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/anmeldung" element={<SignUpPage />} />
            <Route path="/datenschutz" element={<PrivacyPage />} />
            <Route path="/impressum" element={<ImprintPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
