import React from 'react';
import { ViewState } from '../types';
import { AlertOctagon, BrainCircuit, Battery, Zap, Clock } from 'lucide-react';

interface EducationProps {
  onStartFocus: () => void;
}

export const Education: React.FC<EducationProps> = ({ onStartFocus }) => {
  return (
    <div className="space-y-8 pb-8">
      <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="bg-red-600 p-3 rounded-lg shadow-lg shadow-red-900/40">
            <AlertOctagon size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold brand-font text-white uppercase leading-none mb-2">
              A Armadilha da Dopamina
            </h2>
            <p className="text-red-200 leading-relaxed">
              Eles desenharam o app pra você não sair nunca mais. Recupere sua mente.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-green-500 flex items-center gap-2">
            <BrainCircuit size={20} /> O que acontece no seu cérebro
          </h3>
          <div className="bg-zinc-900 p-5 rounded-xl border-l-4 border-green-600 space-y-3">
            <p className="text-zinc-300">
              <strong className="text-white">Prazer Rápido:</strong> Cada like, cada vídeo de 15 segundos libera dopamina barata. Seu cérebro vicia nisso igual droga.
            </p>
            <p className="text-zinc-300">
              <strong className="text-white">Tédio Mortal:</strong> Depois de 1 hora no TikTok, estudar ou trabalhar parece a coisa mais chata do mundo. Sua tolerância ao esforço morre.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Battery size={20} /> A Matemática do Prejuízo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 opacity-60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-500 font-bold">REDES SOCIAIS</span>
                <Clock size={16} className="text-red-500" />
              </div>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li>❌ 2h/dia jogadas fora</li>
                <li>❌ Ansiedade e comparação</li>
                <li>❌ Memória fraca</li>
                <li>❌ Sono ruim</li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-4 rounded-xl border border-green-600 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-green-500 blur-3xl opacity-10"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-500 font-bold">MODO CORRE</span>
                <Zap size={16} className="text-green-500" />
              </div>
              <ul className="text-sm text-white space-y-2 font-medium">
                <li>✔️ Aprende uma habilidade nova</li>
                <li>✔️ Faz dinheiro extra</li>
                <li>✔️ Mente blindada</li>
                <li>✔️ Dorme com a consciência limpa</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center space-y-6">
          <p className="text-lg italic text-zinc-400">
            "Você quer ser consumidor de conteúdo ou criador do seu destino?"
          </p>
          <button 
            onClick={onStartFocus}
            className="w-full bg-white hover:bg-zinc-200 text-black font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-1"
          >
            ATIVAR MODO CORRE AGORA
          </button>
        </div>
      </div>
    </div>
  );
};