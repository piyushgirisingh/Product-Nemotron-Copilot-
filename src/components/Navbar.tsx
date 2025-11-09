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
          <p className="text-2xl sm:text-3xl md:text-4xl mt-4 text-[var(--lc-text)] mx-auto text-center" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 'clamp(1.5rem, 4vw, 2.75rem)', maxWidth: '90%', textAlign: 'center' }}>
            Welcome to Nemora, your new nemotron powered product management tool!
          </p>
        </>
      )}
      {!isLoggedIn && (
        <div className="mt-12 w-full max-w-md">
          <div className="rounded-lg border border-[var(--lc-border)] bg-[var(--lc-surface-soft)] shadow-lg p-8">
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
                    className="bg-[var(--lc-surface)] border-[var(--lc-border)] text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:border-[var(--lc-accent)] h-11"
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
                    className="bg-[var(--lc-surface)] border-[var(--lc-border)] text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:border-[var(--lc-accent)] h-11"
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
