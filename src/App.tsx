import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import LandingPage from '@/features/landing/LandingPage';
import AktionenPage from '@/features/aktionen/AktionenPage';
import UeberUnsPage from '@/features/ueber-uns/UeberUnsPage';
import MitmachenPage from '@/features/mitmachen/MitmachenPage';
import KontaktPage from '@/features/kontakt/KontaktPage';
import LoginPage from '@/features/auth/LoginPage';
import ToolsPage from '@/features/tools/ToolsPage';
import TurnierListPage from '@/features/tools/turnier/TurnierListPage';
import NewTurnierPage from '@/features/tools/turnier/NewTurnierPage';
import TurnierDetailPage from '@/features/tools/turnier/TurnierDetailPage';
import EventManagementPage from '@/features/tools/events/EventManagementPage';
import KalenderPage from '@/features/kalender/KalenderPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Protected({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/aktionen" element={<AktionenPage />} />
            <Route path="/ueber-uns" element={<UeberUnsPage />} />
            <Route path="/mitmachen" element={<MitmachenPage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Member-only: Tools */}
            <Route path="/tools" element={<Protected><ToolsPage /></Protected>} />
            <Route path="/tools/turnier" element={<Protected><TurnierListPage /></Protected>} />
            <Route path="/tools/turnier/neu" element={<Protected><NewTurnierPage /></Protected>} />
            <Route path="/tools/turnier/:id" element={<Protected><TurnierDetailPage /></Protected>} />
            <Route path="/tools/events" element={<Protected><EventManagementPage /></Protected>} />

            <Route path="/kalender" element={<Protected><KalenderPage /></Protected>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
