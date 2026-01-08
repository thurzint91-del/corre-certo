import React from 'react';
import { ViewState, User } from '../types';
import { Briefcase, Wallet, Target, Unplug, Users, LogOut } from 'lucide-react';

interface HomeProps {
  user: User;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
}

export const Home: React.FC<HomeProps> = ({ user, onChangeView, onLogout }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 rounded-2xl border border-zinc-800 shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold brand-font text-white">
              Salve, <span className="text-green-500">{user.name}</span>!
            </h2>
            <p className="text-zinc-400 mt-2 text-lg">
              "Enquanto geral perde tempo, você faz o corre."
            </p>
          </div>
          <button onClick={onLogout} className="text-zinc-500 hover:text-red-500 transition-colors">
            <LogOut size={24} />
          </button>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full text-sm text-green-400 border border-green-900/50">
          <Target size={16} />
          <span>Foco Acumulado: {user.points} pts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MenuButton 
          icon={<Briefcase size={28} />}
          title="Mural de Corre"
          desc="Oportunidades e serviços"
          onClick={() => onChangeView('MURAL')}
          color="bg-blue-600"
        />
        <MenuButton 
          icon={<Wallet size={28} />}
          title="Organizar Vida"
          desc="Controle financeiro real"
          onClick={() => onChangeView('FINANCE')}
          color="bg-green-600"
        />
        <MenuButton 
          icon={<Target size={28} />}
          title="Modo Foco"
          desc="Pomodoro de respeito"
          onClick={() => onChangeView('FOCUS')}
          color="bg-purple-600"
        />
        <MenuButton 
          icon={<Unplug size={28} />}
          title="Menos TikTok"
          desc="Saia da matrix agora"
          onClick={() => onChangeView('EDUCATION')}
          color="bg-red-600"
          highlight
        />
        <MenuButton 
          icon={<Users size={28} />}
          title="Comunidade"
          desc="Troca de visão"
          onClick={() => onChangeView('COMMUNITY')}
          color="bg-zinc-700"
          fullWidth
        />
      </div>
    </div>
  );
};

interface MenuButtonProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
  color: string;
  highlight?: boolean;
  fullWidth?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, title, desc, onClick, color, highlight, fullWidth }) => (
  <button 
    onClick={onClick}
    className={`
      ${fullWidth ? 'md:col-span-2' : ''}
      relative overflow-hidden group p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-all duration-300 text-left
      ${highlight ? 'ring-1 ring-red-500/50' : ''}
    `}
  >
    <div className={`
      absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rounded-full blur-2xl opacity-20
      ${color.replace('bg-', 'bg-')} 
    `} />
    
    <div className="flex items-center gap-4 relative z-10">
      <div className={`p-3 rounded-lg text-white ${color} shadow-lg`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white brand-font">{title}</h3>
        <p className="text-zinc-400 text-sm mt-1">{desc}</p>
      </div>
    </div>
  </button>
);