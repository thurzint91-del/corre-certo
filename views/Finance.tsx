import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, ThumbsUp } from 'lucide-react';

export const Finance: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  useEffect(() => {
    const saved = localStorage.getItem('corre_finances');
    if (saved) setTransactions(JSON.parse(saved));
  }, []);

  const saveTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem('corre_finances', JSON.stringify(newTransactions));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !desc) return;

    const newTrans: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      description: desc,
      date: new Date().toLocaleDateString('pt-BR')
    };

    saveTransactions([newTrans, ...transactions]);
    setAmount('');
    setDesc('');
  };

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  const today = new Date().toLocaleDateString('pt-BR');
  const todayExpense = transactions
    .filter(t => t.type === 'expense' && t.date === today)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold brand-font text-white">Visão Financeira</h2>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Saldo Atual</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-500'}`}>
            R$ {balance.toFixed(2)}
          </p>
        </div>
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Entrou</p>
            <p className="text-xl font-bold text-green-500">+ R$ {income.toFixed(2)}</p>
          </div>
          <div className="p-2 bg-green-900/20 rounded-lg text-green-500"><TrendingUp size={20}/></div>
        </div>
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Saiu</p>
            <p className="text-xl font-bold text-red-500">- R$ {expense.toFixed(2)}</p>
          </div>
          <div className="p-2 bg-red-900/20 rounded-lg text-red-500"><TrendingDown size={20}/></div>
        </div>
      </div>

      {/* Mensagem Inteligente */}
      <div className={`p-4 rounded-xl flex items-start gap-3 border ${todayExpense > 100 ? 'bg-red-900/10 border-red-900/30' : 'bg-green-900/10 border-green-900/30'}`}>
        {todayExpense > 100 ? (
          <>
            <AlertTriangle className="text-red-500 shrink-0" />
            <div>
              <p className="font-bold text-red-500">Segura a onda!</p>
              <p className="text-zinc-400 text-sm">Você já gastou mais de 100 conto hoje. O dinheiro não aceita desaforo.</p>
            </div>
          </>
        ) : (
          <>
            <ThumbsUp className="text-green-500 shrink-0" />
            <div>
              <p className="font-bold text-green-500">Tá no controle.</p>
              <p className="text-zinc-400 text-sm">Gastos controlados hoje. Rico é quem guarda, não quem gasta.</p>
            </div>
          </>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleAdd} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-4">
        <div className="flex gap-2 p-1 bg-black rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${type === 'expense' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            GASTO
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${type === 'income' ? 'bg-green-600 text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            GANHO
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute left-3 top-3 text-zinc-500">R$</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0,00"
              className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded text-white focus:border-green-500 outline-none"
            />
          </div>
          <input
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Descrição (ex: Marmita, Freela)"
            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded text-white focus:border-green-500 outline-none"
          />
        </div>
        <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded font-bold transition-colors flex items-center justify-center gap-2">
          <DollarSign size={18} />
          REGISTRAR MOVIMENTO
        </button>
      </form>

      {/* Lista Recente */}
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-widest text-zinc-500 font-bold">Histórico Recente</h3>
        {transactions.slice(0, 5).map(t => (
          <div key={t.id} className="flex justify-between items-center py-3 border-b border-zinc-800 last:border-0">
            <div>
              <p className="text-white font-medium">{t.description}</p>
              <p className="text-zinc-600 text-xs">{t.date}</p>
            </div>
            <span className={`font-mono font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
              {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};