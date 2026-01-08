import React, { useState, useEffect } from 'react';
import { CommunityPost, User } from '../types';
import { MessageSquare, Heart, Send } from 'lucide-react';

interface CommunityProps {
  user: User;
}

const ADVICE = [
  "Dinheiro na mão é vendaval. Invista em ferramenta, não em luxo.",
  "Se ninguém te apoia, apoie a si mesmo e cale a boca de geral com resultado.",
  "Saúde mental também é dizer 'não'.",
  "O segredo é a constância. Todo dia um pouco.",
  "Não conte seus planos antes de acontecer.",
];

export const Community: React.FC<CommunityProps> = ({ user }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [content, setContent] = useState('');
  const [dailyAdvice, setDailyAdvice] = useState(ADVICE[0]);

  useEffect(() => {
    // Rotate advice randomly on mount
    setDailyAdvice(ADVICE[Math.floor(Math.random() * ADVICE.length)]);

    const saved = localStorage.getItem('corre_community');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      const initial: CommunityPost[] = [
        { id: '1', author: 'Anonimo_ZL', content: 'Hoje completei 4h de foco. A meta é dobrar.', likes: 12, timestamp: Date.now() },
        { id: '2', author: 'DevCorre', content: 'Consegui meu primeiro freela galera! Não desistam.', likes: 45, timestamp: Date.now() - 100000 },
      ];
      setPosts(initial);
      localStorage.setItem('corre_community', JSON.stringify(initial));
    }
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: user.name,
      content: content,
      likes: 0,
      timestamp: Date.now()
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('corre_community', JSON.stringify(updated));
    setContent('');
  };

  const handleLike = (id: string) => {
    const updated = posts.map(p => {
      if (p.id === id) return { ...p, likes: p.likes + 1 };
      return p;
    });
    setPosts(updated);
    localStorage.setItem('corre_community', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      {/* Conselho do Dia */}
      <div className="bg-gradient-to-br from-green-900 to-black p-6 rounded-2xl border border-green-800/30 shadow-lg">
        <h3 className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Visão do Dia</h3>
        <p className="text-xl md:text-2xl text-white font-serif italic">"{dailyAdvice}"</p>
      </div>

      {/* Desabafo */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <MessageSquare size={18} className="text-zinc-500" /> Mural da Comunidade
        </h3>
        <form onSubmit={handlePost} className="relative">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Manda o papo... (Desabafo, conquista ou dica)"
            className="w-full bg-black border border-zinc-800 rounded-lg p-3 pr-12 text-white resize-none focus:border-green-600 outline-none h-24"
            maxLength={280}
          />
          <button 
            type="submit"
            className="absolute bottom-3 right-3 text-green-600 hover:text-green-500 disabled:opacity-50"
            disabled={!content.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-green-500">@{post.author}</span>
              <span className="text-xs text-zinc-600">{new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
            <p className="text-zinc-300 mb-3">{post.content}</p>
            <button 
              onClick={() => handleLike(post.id)}
              className="flex items-center gap-1 text-zinc-500 hover:text-red-500 transition-colors text-sm"
            >
              <Heart size={16} /> {post.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};