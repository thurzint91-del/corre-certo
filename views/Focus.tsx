import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Trophy, Brain } from 'lucide-react';
import { User } from '../types';

interface FocusProps {
  onComplete: (points: number) => void;
}

const PHRASES = [
  "O topo é solitário, mas a vista é linda.",
  "Foco no progresso, não na perfeição.",
  "Desliga o ruído, liga o trabalho.",
  "Quem quer arruma um jeito, quem não quer arruma uma desculpa.",
  "Disciplina é liberdade.",
  "Construindo o império, tijolo por tijolo."
];

export const Focus: React.FC<FocusProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<25 | 50 | 60>(25);
  const [phrase, setPhrase] = useState(PHRASES[0]);
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      const interval = window.setInterval(() => {
        setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
      }, 60000); // Change phrase every minute
      return () => clearInterval(interval);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsActive(false);
      finishSession();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const finishSession = () => {
    const pointsEarned = mode === 25 ? 10 : mode === 50 ? 25 : 40;
    alert(`Boa! Você completou o ciclo e ganhou ${pointsEarned} pontos de foco.`);
    onComplete(pointsEarned);
    resetTimer();
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode * 60);
  };

  const changeMode = (m: 25 | 50 | 60) => {
    setMode(m);
    setIsActive(false);
    setTimeLeft(m * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold brand-font text-white flex items-center justify-center gap-2">
          <Brain className="text-green-500" /> MODO CAVERNA
        </h2>
        <p className="text-zinc-500">Esquece o mundo lá fora.</p>
      </div>

      {isActive && (
        <div className="w-full bg-red-900/20 border border-red-900/50 p-3 rounded-lg text-center animate-pulse">
          <p className="text-red-400 font-bold text-sm uppercase">🚫 Proibido Redes Sociais</p>
        </div>
      )}

      <div className="relative">
        {/* Timer Circle */}
        <div className={`w-64 h-64 rounded-full border-8 flex items-center justify-center transition-colors duration-500 ${isActive ? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-zinc-800'}`}>
          <span className="text-6xl font-mono font-bold text-white tracking-wider">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="h-12 flex items-center justify-center">
        {isActive ? (
          <p className="text-zinc-300 italic text-center px-4 animate-fade-in">"{phrase}"</p>
        ) : (
          <div className="flex gap-2">
            {[25, 50, 60].map((m) => (
              <button
                key={m}
                onClick={() => changeMode(m as any)}
                className={`px-4 py-1 rounded-full text-sm font-bold border transition-all ${mode === m ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-700 hover:border-zinc-500'}`}
              >
                {m}min
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 w-full max-w-xs">
        {!isActive ? (
          <button onClick={toggleTimer} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20">
            <Play size={20} fill="currentColor" /> INICIAR
          </button>
        ) : (
          <button onClick={toggleTimer} className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
            <Pause size={20} fill="currentColor" /> PAUSAR
          </button>
        )}
        <button onClick={resetTimer} className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-all">
          <Square size={20} />
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 w-full">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-500" />
          <div>
            <p className="text-white font-bold text-sm">Sistema de Recompensa</p>
            <p className="text-zinc-500 text-xs">Complete ciclos para ganhar respeito (e pontos).</p>
          </div>
        </div>
      </div>
    </div>
  );
};