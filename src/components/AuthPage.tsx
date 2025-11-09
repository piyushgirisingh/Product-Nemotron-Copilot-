import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { signIn, signUp } from '../services/authService';
import { toast } from 'sonner';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await signIn(email, password);
        toast.success('Welcome back!');
        onAuthSuccess();
      } else {
        // Sign up
        if (!displayName.trim()) {
          toast.error('Please enter your full name');
          setLoading(false);
          return;
        }
        await signUp(email, password, displayName);
        toast.success('Account created successfully!');
        onAuthSuccess();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // User-friendly error messages
      if (error.message.includes('auth/email-already-in-use')) {
        toast.error('Email already in use');
      } else if (error.message.includes('auth/weak-password')) {
        toast.error('Password should be at least 6 characters');
      } else if (error.message.includes('auth/invalid-email')) {
        toast.error('Invalid email address');
      } else if (error.message.includes('auth/user-not-found')) {
        toast.error('No account found with this email');
      } else if (error.message.includes('auth/wrong-password')) {
        toast.error('Incorrect password');
      } else if (error.message.includes('auth/invalid-credential')) {
        toast.error('Invalid email or password');
      } else {
        toast.error(error.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1b3a] to-[#0a1628] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Title */}
      <h1 className="text-6xl font-bold text-white mb-6 relative z-10">
        Nemora
      </h1>
      <p className="text-xl text-white mb-12 relative z-10">
        Welcome to Nemora, your new nemotron powered product management tool!
      </p>

      {/* Login Card */}
      <div className="w-full max-w-3xl relative z-10">
        <div className="border-2 border-cyan-400 rounded-lg p-8 bg-[#0a1628]/50 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          <h2 className="text-2xl font-semibold text-white mb-8">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required={!isLogin}
                  className="w-full h-14 bg-transparent border-2 border-cyan-400 text-white placeholder:text-gray-400 rounded-lg focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-14 bg-transparent border-2 border-cyan-400 text-white placeholder:text-gray-400 rounded-lg focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-14 bg-transparent border-2 border-cyan-400 text-white placeholder:text-gray-400 rounded-lg focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-transparent border-2 border-cyan-400 hover:bg-cyan-400/10 text-white font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Logging in...' : 'Signing up...'}
                </span>
              ) : (
                <span>{isLogin ? 'Login' : 'Sign Up'}</span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setDisplayName('');
                  setEmail('');
                  setPassword('');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

