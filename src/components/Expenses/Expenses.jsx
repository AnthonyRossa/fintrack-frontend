import React, { useState } from "react";
import "./Expenses.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default function Expenses({ expenses, setExpenses, onAddExpense, onDeleteExpense }) {
  const [formData, setFormData] = useState({
    value: "",
    date: "",
    category: "",
    description: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

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

  const addExpense = async (e) => {
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

    const expenseData = {
      description: formData.description,
      amount: parseFloat(formData.value),
      date: formData.date,
      category: formData.category,
    };

    await onAddExpense(expenseData);

    setFormData({
      value: "",
      date: "",
      category: "",
      description: "",
    });
  };

  const handleDeleteClick = (expenseId) => {
    setExpenseToDelete(expenseId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      onDeleteExpense(expenseToDelete);
      setIsDeleteModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
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
            step="0.01"
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
              <li key={expense._id || expense.id} className="expenses__item">
                <div className="expenses__item-info">
                  <span className="expenses__item-value">
                    R$ {Number(expense.amount).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
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
                <button
                  className="expenses__item-delete"
                  onClick={() => handleDeleteClick(expense._id)}
                  title="Deletar despesa"
                >
                  ✕ Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Deletar Despesa"
        message="Tem certeza que deseja deletar esta despesa? Esta ação não pode ser desfeita."
        confirmButtonText="Deletar"
        cancelButtonText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
