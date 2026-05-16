import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import './PageLayout.css';

export default function PageLayout({ children, onLogout }) {
  return (
    <div className="page-layout">
      <Header onLogout={onLogout} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}