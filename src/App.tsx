import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import LandingPage from '@/features/landing/LandingPage';
import AktionenPage from '@/features/aktionen/AktionenPage';
import UeberUnsPage from '@/features/ueber-uns/UeberUnsPage';
import MitmachenPage from '@/features/mitmachen/MitmachenPage';
import KontaktPage from '@/features/kontakt/KontaktPage';
import { ImpressumPage, DatenschutzPage, BarrierefreiheitPage, FAQPage, TerminePage, TeamPage, ProtokollePage, PartnerPage, ContentRoadmapPage } from '@/features/info/InfoPages';

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
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aktionen" element={<AktionenPage />} />
          <Route path="/ueber-uns" element={<UeberUnsPage />} />
          <Route path="/mitmachen" element={<MitmachenPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />

          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/barrierefreiheit" element={<BarrierefreiheitPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/termine" element={<TerminePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/protokolle" element={<ProtokollePage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/content-roadmap" element={<ContentRoadmapPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
