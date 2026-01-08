import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { Plus, Trash2, Phone, Search } from 'lucide-react';

export const Mural: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', description: '', contact: '' });

  useEffect(() => {
    const savedJobs = localStorage.getItem('corre_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      // Seed data if empty
      const initialJobs: Job[] = [
        { id: '1', title: 'Faço Faxina', description: 'Limpeza pesada ou leve. Região central.', contact: '11 99999-0000', createdAt: Date.now() },
        { id: '2', title: 'Formatação de PC', description: 'Instalo Windows e Office. Preço camarada.', contact: '11 98888-1111', createdAt: Date.now() },
        { id: '3', title: 'Passeio com cães', description: 'Manhã e tarde. Amo bichos.', contact: '@dogwalker_zL', createdAt: Date.now() },
      ];
      setJobs(initialJobs);
      localStorage.setItem('corre_jobs', JSON.stringify(initialJobs));
    }
  }, []);

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title || !newJob.contact) return;

    const job: Job = {
      id: Date.now().toString(),
      title: newJob.title,
      description: newJob.description,
      contact: newJob.contact,
      createdAt: Date.now()
    };

    const updatedJobs = [job, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem('corre_jobs', JSON.stringify(updatedJobs));
    setNewJob({ title: '', description: '', contact: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const updated = jobs.filter(j => j.id !== id);
    setJobs(updated);
    localStorage.setItem('corre_jobs', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold brand-font text-white">Mural de Corre</h2>
          <p className="text-zinc-400 text-sm">Divulgue seu talento ou ache um corre.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-900/40 transition-all"
        >
          <Plus size={24} className={showForm ? 'rotate-45 transition-transform' : 'transition-transform'} />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddJob} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-4 animate-slide-down">
          <input
            type="text"
            placeholder="O que você faz? (Ex: Conserto Celular)"
            value={newJob.title}
            onChange={e => setNewJob({...newJob, title: e.target.value})}
            className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-green-500 outline-none"
            required
          />
          <textarea
            placeholder="Detalhes (preço, região, horário...)"
            value={newJob.description}
            onChange={e => setNewJob({...newJob, description: e.target.value})}
            className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-green-500 outline-none h-24"
          />
          <input
            type="text"
            placeholder="Seu contato (Zap ou Insta)"
            value={newJob.contact}
            onChange={e => setNewJob({...newJob, contact: e.target.value})}
            className="w-full bg-black border border-zinc-800 rounded p-3 text-white focus:border-green-500 outline-none"
            required
          />
          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded hover:bg-zinc-200 transition-colors">
            PUBLICAR NO MURAL
          </button>
        </form>
      )}

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-10 text-zinc-500">
            <Search className="mx-auto mb-2 opacity-50" size={40} />
            <p>Nenhum corre encontrado. Seja o primeiro!</p>
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl hover:border-zinc-700 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{job.title}</h3>
                <button 
                  onClick={() => handleDelete(job.id)}
                  className="text-zinc-700 hover:text-red-500 p-1"
                  title="Remover anúncio"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-zinc-400 mb-4 text-sm leading-relaxed">{job.description}</p>
              <div className="flex items-center gap-2 text-green-500 text-sm font-medium bg-green-900/10 py-2 px-3 rounded-lg border border-green-900/30 w-fit">
                <Phone size={14} />
                {job.contact}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};