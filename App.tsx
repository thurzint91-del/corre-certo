import React, { useState, useEffect } from 'react';
import { ViewState, User } from './types';
import { Login } from './components/Login';
import { Home } from './views/Home';
import { Mural } from './views/Mural';
import { Finance } from './views/Finance';
import { Focus } from './views/Focus';
import { Education } from './views/Education';
import { Community } from './views/Community';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('corre_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('corre_user');
    setUser(null);
    setCurrentView('HOME');
  };

  const updatePoints = (points: number) => {
    if (!user) return;
    const updatedUser = { ...user, points: user.points + points };
    setUser(updatedUser);
    localStorage.setItem('corre_user', JSON.stringify(updatedUser));
    // Also update global points storage
    const currentPoints = parseInt(localStorage.getItem('corre_points') || '0');
    localStorage.setItem('corre_points', (currentPoints + points).toString());
  };

  if (loading) return <div className="min-h-screen bg-black" />;

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-green-500 selection:text-black">
      <div className="max-w-md mx-auto min-h-screen flex flex-col bg-black md:border-x md:border-zinc-900 shadow-2xl">
        {/* Header Navigation */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-4 py-4 flex items-center justify-between">
          {currentView !== 'HOME' ? (
            <button 
              onClick={() => setCurrentView('HOME')}
              className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={20} /> <span className="text-sm font-bold">Voltar</span>
            </button>
          ) : (
             <div className="w-6"></div> // Spacer
          )}
          
          <h1 className="brand-font font-bold text-lg tracking-wider">
            CORRE <span className="text-green-500">CERTO</span>
          </h1>
          
          <div className="w-6"></div> // Spacer
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 pb-20">
          {currentView === 'HOME' && (
            <Home 
              user={user} 
              onChangeView={setCurrentView} 
              onLogout={handleLogout}
            />
          )}
          {currentView === 'MURAL' && <Mural />}
          {currentView === 'FINANCE' && <Finance />}
          {currentView === 'FOCUS' && <Focus onComplete={updatePoints} />}
          {currentView === 'EDUCATION' && <Education onStartFocus={() => setCurrentView('FOCUS')} />}
          {currentView === 'COMMUNITY' && <Community user={user} />}
        </main>
      </div>
    </div>
  );
}