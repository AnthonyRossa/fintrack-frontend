import React, { useMemo, useState } from "react";
import "./Reports.css";

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const groupByCategory = (items) =>
  items.reduce((acc, item) => {
    const key = item.category || "Outros";
    const value = Number(item.value) || 0;
    acc[key] = (acc[key] || 0) + value;
    return acc;
  }, {});

export default function Reports({ entries = [], expenses = [] }) {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const years = useMemo(() => {
    const yearSet = new Set([
      ...entries.map((item) => new Date(item.date).getFullYear()),
      ...expenses.map((item) => new Date(item.date).getFullYear()),
      selectedYear,
    ]);
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [entries, expenses, selectedYear]);

  const filterByMonth = (items) =>
    items.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getMonth() === Number(selectedMonth) &&
        date.getFullYear() === Number(selectedYear)
      );
    });

  const monthlyEntries = useMemo(
    () => filterByMonth(entries),
    [entries, selectedMonth, selectedYear],
  );

  const monthlyExpenses = useMemo(
    () => filterByMonth(expenses),
    [expenses, selectedMonth, selectedYear],
  );

  const entriesByCategory = useMemo(
    () => groupByCategory(monthlyEntries),
    [monthlyEntries],
  );

  const expensesByCategory = useMemo(
    () => groupByCategory(monthlyExpenses),
    [monthlyExpenses],
  );

  const totalEntries = Object.values(entriesByCategory).reduce(
    (sum, value) => sum + value,
    0,
  );
  const totalExpenses = Object.values(expensesByCategory).reduce(
    (sum, value) => sum + value,
    0,
  );
  const netResult = totalEntries - totalExpenses;

  const formatCurrency = (value) =>
    Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const renderCategoryRows = (items) =>
    Object.entries(items).map(([category, value]) => (
      <li key={category} className="reports__category-item">
        <span>{category}</span>
        <p >{formatCurrency(value)}</p>
      </li>
    ));

  return (
    <div className="reports">
      <div className="reports__header">
        <div>
          <h2 className="reports__header-title">Relatórios Mensais</h2>
          <p className="reports__header-description">
            Veja quanto foi ganho e gasto por área.
          </p>
        </div>
        <div className="reports__filters">
          <label className="reports__filters-label">
            Mês
            <select
              className="reports__filters-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {MONTHS.map((name, index) => (
                <option key={name} value={index}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="reports__filters-label">
            Ano
            <select
              className="reports__filters-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="reports__summary-grid">
        <section className="reports__box">
          <h3 className="reports__box-title">Ganhos por área</h3>
          {monthlyEntries.length === 0 ? (
            <p>Nenhum ganho registrado neste mês.</p>
          ) : (
            <ul className="reports__category-list">
              {renderCategoryRows(entriesByCategory)}
            </ul>
          )}
        </section>

        <section className="reports__box">
          <h3 className="reports__box-title">Gastos por área</h3>
          {monthlyExpenses.length === 0 ? (
            <p>Nenhuma despesa registrada neste mês.</p>
          ) : (
            <ul className="reports__category-list">
              {renderCategoryRows(expensesByCategory)}
            </ul>
          )}
        </section>
      </div>

      <footer className="reports__footer">
        <div className="reports__footer-div">
          <span className="reports__footer-span">Total ganho</span>
          <p className="reports__currency">{formatCurrency(totalEntries)}</p>
        </div>
        <div className="reports__footer-div">
          <span className="reports__footer-span">Total gasto</span>
          <p className="reports__currency">{formatCurrency(totalExpenses)}</p>
        </div>
        <div
          className={`reports__result ${netResult >= 0 ? "reports__result--positive" : "reports__result--negative"}`}
        >
          <span className="reports__footer-span">Resultado do mês</span>
          <p className="reports__currency">{formatCurrency(netResult)}</p>
        </div>
      </footer>
    </div>
  );
}
