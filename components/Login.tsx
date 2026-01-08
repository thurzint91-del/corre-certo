import React, { useState } from 'react';
import { User } from '../types';
import { Rocket, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const user: User = {
      name: name.trim(),
      points: parseInt(localStorage.getItem('corre_points') || '0'),
    };
    
    localStorage.setItem('corre_user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-green-600 p-4 rounded-full shadow-lg shadow-green-900/20">
              <Rocket size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold brand-font text-white tracking-tighter">
            CORRE <span className="text-green-500">CERTO</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            A ferramenta de quem não espera a sorte bater na porta.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-green-500 uppercase tracking-widest">
              Qual é o seu vulgo?
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-zinc-600"
            />
          </div>

          <button
            type="submit"
            className="w-full group bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95"
          >
            ACESSAR O SISTEMA
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center text-zinc-600 text-xs mt-8">
          SEM CADASTRO COMPLEXO. TUDO SALVO NO SEU DISPOSITIVO.
        </p>
      </div>
    </div>
  );
};