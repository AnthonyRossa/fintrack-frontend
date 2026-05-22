import React, { useState } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import './PageLayout.css';

export default function PageLayout({ children, onLogout }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="page-layout">
      <Header onLogout={handleLogoutClick} />
      <Navigation />
      <main>{children}</main>
      <Footer />
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Confirmar saída"
        message="Tem certeza que deseja sair do FinTrack?"
        confirmButtonText="Sair"
        cancelButtonText="Cancelar"
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </div>
  );
}
