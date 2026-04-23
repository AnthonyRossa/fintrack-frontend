import React from 'react';
import './Main.css';

export default function Main({ entries = [], expenses = [] }) {
  const totalEntries = entries.reduce((sum, entry) => sum + (entry?.value || 0), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense?.value || 0), 0);
  const balance = totalEntries - totalExpenses;
  const formattedBalance = balance.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="home">
        <h2 className="home__title">Olá, (username)!</h2>
        <h3 className="home__balance-title" >Saldo atual:</h3>
      <h3 className="home__balance">{formattedBalance}</h3>
    </div>
  );
}
