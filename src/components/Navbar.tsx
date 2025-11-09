import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ShinyText from './ShinyText';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface NavbarProps {
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export function Navbar({ onLogin, onLogout, isLoggedIn }: NavbarProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <header className={`w-full border-b border-[var(--lc-border)] bg-[var(--lc-bg)] relative ${isLoggedIn ? 'py-4' : 'flex flex-col items-center justify-center py-8'}`}>
      {isLoggedIn && (
        <div className="flex items-center h-full px-8">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-[var(--lc-text)] hover:bg-[var(--lc-surface)]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>
      )}
      {!isLoggedIn && (
        <>
          <ShinyText
            text="Nemora"
            disabled={false}
            speed={3}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[0.18em]"
          />
          <p className="text-lg sm:text-xl md:text-2xl mt-4 text-[var(--lc-text)] mx-auto text-center" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', maxWidth: '90%', textAlign: 'center' }}>
            Welcome to Nemora, your new nemotron powered product management tool!
          </p>
        </>
      )}
      {!isLoggedIn && (
        <div className="w-full max-w-md" style={{ marginTop: '96px' }}>
          <div className="rounded-lg border-2 border-blue-400 bg-[var(--lc-surface-soft)] shadow-lg p-8" style={{ borderColor: '#60a5fa' }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-[var(--lc-text)] text-center mb-2">Login</h3>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--lc-text)]">Email address</label>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="!bg-blue-400/10 !border-2 !border-blue-400 w-full rounded-md px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:!border-blue-500 focus:!bg-blue-400/15 h-11"
                    style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)', borderColor: '#60a5fa', borderWidth: '2px' }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--lc-text)]">Password</label>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="!bg-blue-400/10 !border-2 !border-blue-400 w-full rounded-md px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:!border-blue-500 focus:!bg-blue-400/15 h-11"
                    style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)', borderColor: '#60a5fa', borderWidth: '2px' }}
                    required
                  />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full h-11 mt-2">
                Login
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
