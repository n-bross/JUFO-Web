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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/aktionen" element={<AktionenPage />} />
            <Route path="/ueber-uns" element={<UeberUnsPage />} />
            <Route path="/mitmachen" element={<MitmachenPage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Protected member routes – filled by later feature branches */}
            <Route
              path="/tools/*"
              element={
                <ProtectedRoute>
                  <div className="pt-24 text-center text-black/40 font-medium">
                    Tools werden geladen…
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/kalender"
              element={
                <ProtectedRoute>
                  <div className="pt-24 text-center text-black/40 font-medium">
                    Kalender wird geladen…
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
