import React, { useState } from "react";
import "./Entries.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default function Entries({ entries, onAddEntry, onDeleteEntry }) {
  const [formData, setFormData] = useState({
    value: "",
    date: "",
    category: "",
    description: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const categories = [
    "Salário",
    "Freelance",
    "Investimentos",
    "Presentes",
    "Outros",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEntry = async (e) => {
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

    const entryData = {
      description: formData.description,
      amount: parseFloat(formData.value),
      date: formData.date,
      category: formData.category,
    };

    await onAddEntry(entryData);

    setFormData({
      value: "",
      date: "",
      category: "",
      description: "",
    });
  };

  const handleDeleteClick = (entryId) => {
    setEntryToDelete(entryId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (entryToDelete) {
      onDeleteEntry(entryToDelete);
      setIsDeleteModalOpen(false);
      setEntryToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEntryToDelete(null);
  };

  return (
    <div className="entries">
      <h2 className="entries__title">Gerenciar Entradas</h2>
      <p className="entries__description">
        Aqui você pode gerenciar suas entradas.
      </p>

      <form onSubmit={addEntry} className="entries__form">
        <div className="entries__form-group">
          <label className="entries__form-label" htmlFor="value">
            Valor recebido:
          </label>
          <input
            className="entries__form-input"
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

        <div className="entries__form-group">
          <label className="entries__form-label" htmlFor="date">
            Data:
          </label>
          <input
            className="entries__form-input"
            type="date"
            id="date"
            placeholder=""
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="entries__form-group">
          <label className="entries__form-label" htmlFor="category">
            Categoria:
          </label>
          <select
            className="entries__form-input"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="entries__form-group">
          <label className="entries__form-label" htmlFor="description">
            Descrição:
          </label>
          <textarea
            className="entries__form-input"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength="60"
            required
          />
          <small className="entries__form-note">
            {formData.description.length}/60 caracteres{" "}
          </small>
        </div>

        <button type="submit" className="entries__form-button">
          Adicionar Entrada
        </button>
      </form>

      <div className="entries__list">
        <h3 className="entries__list-title">Entradas Registradas</h3>
        {entries.length === 0 ? (
          <p className="entries__list-desc">
            Nenhuma entrada registrada ainda.
          </p>
        ) : (
          <ul className="entries__list-container">
            {entries.map((entry) => (
              <li key={entry._id || entry.id} className="entries__item">
                <div className="entries__item-info">
                  <span className="entries__item-value">
                    R$ {Number(entry.amount).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="entries__item-date">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                  <span className="entries__item-category">
                    {entry.category}
                  </span>
                </div>
                <p className="entries__item-description">{entry.description}</p>
                <button
                  className="entries__item-delete"
                  onClick={() => handleDeleteClick(entry._id)}
                  title="Deletar entrada"
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
        title="Deletar Entrada"
        message="Tem certeza que deseja deletar esta entrada? Esta ação não pode ser desfeita."
        confirmButtonText="Deletar"
        cancelButtonText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
