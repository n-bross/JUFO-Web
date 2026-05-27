import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import LandingPage from '@/features/landing/LandingPage';
import AktionenPage from '@/features/aktionen/AktionenPage';
import UeberUnsPage from '@/features/ueber-uns/UeberUnsPage';
import MitmachenPage from '@/features/mitmachen/MitmachenPage';
import KontaktPage from '@/features/kontakt/KontaktPage';
import GaleriePage from '@/features/galerie/GaleriePage';
import NewsPage from '@/features/news/NewsPage';
import NewsDetailPage from '@/features/news/NewsDetailPage';
import AdminPostsPage from '@/features/admin/posts/AdminPostsPage';

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
          <Route path="/galerie" element={<GaleriePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/admin/posts" element={<AdminPostsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
