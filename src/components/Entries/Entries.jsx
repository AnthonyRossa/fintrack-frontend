import React from "react";
import TransactionManager from "../TransactionManager/TransactionManager";

export default function Entries({ entries, onAddEntry, onDeleteEntry }) {
  const categories = [
    "Salário",
    "Freelance",
    "Investimentos",
    "Presentes",
    "Outros",
  ];

  return (
    <TransactionManager
      items={entries}
      categories={categories}
      title="Gerenciar Entradas"
      subtitle="Aqui você pode gerenciar suas entradas."
      amountLabel="Valor recebido:"
      dateLabel="Data:"
      categoryLabel="Categoria:"
      descriptionLabel="Descrição:"
      submitButtonText="Adicionar Entrada"
      emptyListMessage="Nenhuma entrada registrada ainda."
      listTitle="Entradas Registradas"
      deleteTitle="Deletar Entrada"
      deleteMessage="Tem certeza que deseja deletar esta entrada? Esta ação não pode ser desfeita."
      deleteButtonText="✕ Deletar"
      onAdd={onAddEntry}
      onDelete={onDeleteEntry}
      mode="entries"
    />
  );
}
