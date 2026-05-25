import React from "react";
import TransactionManager from "../TransactionManager/TransactionManager";

export default function Expenses({ expenses, onAddExpense, onDeleteExpense }) {
  const categories = [
    "Alimentação",
    "Saúde",
    "Moradia",
    "Transporte",
    "Entretenimento",
    "Educação",
    "Outros",
  ];

  return (
    <TransactionManager
      items={expenses}
      categories={categories}
      title="Despesas"
      subtitle="Aqui você pode gerenciar suas despesas."
      amountLabel="Valor gasto:"
      dateLabel="Data:"
      categoryLabel="Categoria:"
      descriptionLabel="Descrição:"
      submitButtonText="Adicionar Despesa"
      emptyListMessage="Nenhuma despesa registrada ainda."
      listTitle="Despesas Registradas"
      deleteTitle="Deletar Despesa"
      deleteMessage="Tem certeza que deseja deletar esta despesa? Esta ação não pode ser desfeita."
      deleteButtonText="✕ Deletar"
      onAdd={onAddExpense}
      onDelete={onDeleteExpense}
      mode="expenses"
    />
  );
}
