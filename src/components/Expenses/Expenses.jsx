import React, { useState } from "react";
import "./Expenses.css";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    value: "",
    date: "",
    category: "",
    description: "",
  });

  const categories = [
    "Alimentação",
    "Saúde",
    "Moradia",
    "Transporte",
    "Entretenimento",
    "Educação",
    "Outros",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExpense = (e) => {
    e.preventDefault();

    if (
      !formData.value ||
      !formData.date ||
      !formData.category ||
      !formData.description
    ) {
      return;
    }

    if (formData.description.length > 60) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      value: parseFloat(formData.value),
      date: formData.date,
      category: formData.category,
      description: formData.description,
    };

    setExpenses((prev) => [...prev, newExpense]);

    setFormData({
      value: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <div className="expenses">
      <h2 className="expenses__title">Despesas</h2>
      <p className="expenses__description">
        Aqui você pode gerenciar suas despesas.
      </p>

      <form onSubmit={addExpense} className="expenses__form">
        <div className="expenses__form-group">
          <label className="expenses__form-label" htmlFor="value">
            Valor gasto:
          </label>
          <input
            className="expenses__form-input"
            type="number"
            autoComplete="off"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className="expenses__form-group">
          <label className="expenses__form-label" htmlFor="date">
            Data:
          </label>
          <input
            className="expenses__form-input"
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="expenses__form-group">
          <label className="expenses__form-label" htmlFor="category">
            Categoria:
          </label>
          <select
            className="expenses__form-input"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="expenses__form-group">
          <label className="expenses__form-label" htmlFor="description">
            Descrição:
          </label>
          <textarea
            className="expenses__form-input"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength="60"
            rows="3"
            required
          />
          <small className="expenses__form-note">
            {formData.description.length}/60 caracteres
          </small>
        </div>

        <button type="submit" className="expenses__form-button">
          Adicionar Despesa
        </button>
      </form>

      <div className="expenses__list">
        <h3 className="expenses__list-title">Despesas Registradas</h3>
        {expenses.length === 0 ? (
          <p className="expenses__list-desc">
            Nenhuma despesa registrada ainda.
          </p>
        ) : (
          <ul className="expenses__list-container">
            {expenses.map((expense) => (
              <li key={expense.id} className="expenses__item">
                <div className="expenses__item-info">
                  <span className="expenses__item-value">
                    R$ {expense.value.toFixed(2)}
                  </span>
                  <span className="expenses__item-date">
                    {new Date(expense.date).toLocaleDateString("pt-BR")}
                  </span>
                  <span className="expenses__item-category">
                    {expense.category}
                  </span>
                </div>
                <p className="expenses__item-description">
                  {expense.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
