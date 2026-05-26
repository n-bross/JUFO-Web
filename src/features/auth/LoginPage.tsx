import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from ?? '/tools';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const ok = login(password);
      setLoading(false);
      if (ok) {
        navigate(from, { replace: true });
      } else {
        setError('Falsches Passwort. Bitte wende dich an einen Vorstand.');
        setPassword('');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-yellow rounded-full -z-10" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-lilac rounded-full -z-10 opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-[2rem] border-2 border-black shadow-[8px_8px_0_#000] p-8">
          <div className="flex flex-col items-center gap-3 mb-8">
            <Logo size={52} />
            <div className="text-center">
              <h1 className="text-2xl font-extrabold">Mitglieder-Login</h1>
              <p className="text-sm text-black/50 mt-1">Nur für Jufo-Mitglieder</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider">
                Passwort
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  className="w-full border-2 border-black rounded-xl pl-10 pr-10 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                  aria-label="Passwort anzeigen"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full"
              disabled={loading || !password}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Wird geprüft...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Einloggen
                </span>
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-black/40 mt-6">
            Du bist kein Mitglied?{' '}
            <a href="/mitmachen" className="underline font-semibold text-black/60">
              Jetzt bewerben
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
