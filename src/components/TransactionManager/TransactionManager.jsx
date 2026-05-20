import React, { useState } from "react";
import "./TransactionManager.css";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

export default function TransactionManager({
  items = [],
  categories = [],
  title,
  subtitle,
  amountLabel,
  dateLabel,
  categoryLabel,
  descriptionLabel,
  submitButtonText,
  emptyListMessage,
  listTitle,
  deleteTitle,
  deleteMessage,
  deleteButtonText,
  onAdd,
  onDelete,
  mode = "default",
}) {
  const [formData, setFormData] = useState({
    value: "",
    date: "",
    category: "",
    description: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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

    const itemData = {
      description: formData.description,
      amount: parseFloat(formData.value),
      date: formData.date,
      category: formData.category,
    };

    await onAdd(itemData);

    setFormData({
      value: "",
      date: "",
      category: "",
      description: "",
    });
  };

  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const formatCurrency = (amount) =>
    `R$ ${Number(amount).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR");

  return (
    <div className={`transaction-manager transaction-manager--${mode}`}>
      <h2 className="transaction-manager__title">{title}</h2>
      <p className="transaction-manager__description">{subtitle}</p>

      <form onSubmit={handleSubmit} className="transaction-manager__form">
        <div className="transaction-manager__form-group">
          <label className="transaction-manager__form-label" htmlFor="value">
            {amountLabel}
          </label>
          <input
            className="transaction-manager__form-input"
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

        <div className="transaction-manager__form-group">
          <label className="transaction-manager__form-label" htmlFor="date">
            {dateLabel}
          </label>
          <input
            className="transaction-manager__form-input"
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="transaction-manager__form-group">
          <label className="transaction-manager__form-label" htmlFor="category">
            {categoryLabel}
          </label>
          <select
            className="transaction-manager__form-input"
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

        <div className="transaction-manager__form-group">
          <label className="transaction-manager__form-label" htmlFor="description">
            {descriptionLabel}
          </label>
          <textarea
            className="transaction-manager__form-input"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength="60"
            rows="3"
            required
          />
          <small className="transaction-manager__form-note">
            {formData.description.length}/60 caracteres
          </small>
        </div>

        <button type="submit" className="transaction-manager__form-button">
          {submitButtonText}
        </button>
      </form>

      <div className="transaction-manager__list">
        <h3 className="transaction-manager__list-title">{listTitle}</h3>
        {items.length === 0 ? (
          <p className="transaction-manager__list-desc">{emptyListMessage}</p>
        ) : (
          <ul className="transaction-manager__list-container">
            {items.map((item) => {
              const itemId = item._id || item.id;
              return (
                <li key={itemId} className="transaction-manager__item">
                  <div className="transaction-manager__item-info">
                    <span className="transaction-manager__item-value">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="transaction-manager__item-date">
                      {formatDate(item.date)}
                    </span>
                    <span className="transaction-manager__item-category">
                      {item.category}
                    </span>
                  </div>
                  <p className="transaction-manager__item-description">
                    {item.description}
                  </p>
                  <button
                    className="transaction-manager__item-delete"
                    onClick={() => handleDeleteClick(itemId)}
                    title={deleteTitle}
                  >
                    {deleteButtonText}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title={deleteTitle}
        message={deleteMessage}
        confirmButtonText="Deletar"
        cancelButtonText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
