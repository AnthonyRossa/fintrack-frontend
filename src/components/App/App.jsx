import React, { useState, useEffect } from "react";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Expenses from "../Expenses/Expenses";
import Entries from "../Entries/Entries";
import Reports from "../Reports/Reports";
import ExchangeRates from "../ExchangeRates/ExchangeRates";
import Footer from "../Footer/Footer";
import PageLayout from "../PageLayout/PageLayout";
import api from "../../utils/api";
import * as auth from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { removeToken } from "../../utils/token";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [tooltipSuccess, setTooltipSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setTokenState] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async ({ name, email, password }) => {
    auth
      .register(name, email, password)
      .then(() => {
        setTooltipSuccess(true);
        setTooltipMessage("Vitória! Você agora está registrado. Você será redirecionado para a página de login.");
        setShowInfoTooltip(true);

        setTimeout(() => {
          setShowInfoTooltip(false);
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setTooltipSuccess(false);
        setTooltipMessage("Ops, algo deu errado! Por favor, tente novamente.");
        setShowInfoTooltip(true);
        console.error(error);
      });
  };

  const handleLogin = async ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setTokenState(data.token);
          localStorage.setItem("jwt", data.token);
          return auth.checkToken(data.token);
        }
        return Promise.reject("Token não recebido");
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          setTooltipSuccess(true);
          setTooltipMessage("Login realizado com sucesso. Você será redirecionado em breve.");
          setShowInfoTooltip(true);
          return api.getUserInfo();
        }
      })
      .then((fullUserData) => {
        if (fullUserData) {
          setCurrentUser((prevUser) => ({ ...prevUser, ...fullUserData }));
          return Promise.all([api.getEntries(), api.getExpenses()]);
        }
      })
      .then(([entriesData, expensesData]) => {
        if (entriesData && expensesData) {
          setEntries(entriesData);
          setExpenses(expensesData);
          setTimeout(() => {
            setIsLoggedIn(true);
            setShowInfoTooltip(false);
            navigate("/main");
          }, 2000);
        }
      })
      .catch((error) => {
        setTooltipSuccess(false);
        setTooltipMessage("Erro no login. Verifique suas credenciais.");
        setShowInfoTooltip(true);
        setIsLoggedIn(false);
        removeToken();
        setTokenState(null);
        console.error(error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
          setTokenState(token);

          return api.getUserInfo();
        })
        .then((fullUserData) => {
          setCurrentUser((prevUser) => ({ ...prevUser, ...fullUserData }));
          return Promise.all([api.getEntries(), api.getExpenses()]);
        })
        .then(([entriesData, expensesData]) => {
          setEntries(entriesData);
          setExpenses(expensesData);
        })
        .catch((error) => {
          console.error(error);
          removeToken();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleAddEntry = async (entryData) => {
    try {
      const newEntry = await api.createEntry(entryData);
      setEntries((prev) => [newEntry, ...prev]);
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const newExpense = await api.createExpense(expenseData);
      setExpenses((prev) => [newExpense, ...prev]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await api.deleteEntry(entryId);
      setEntries((prev) => prev.filter((entry) => entry._id !== entryId));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await api.deleteExpense(expenseId);
      setExpenses((prev) => prev.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setTokenState(null);
    setCurrentUser({});
    setEntries([]);
    setExpenses([]);
    navigate("/login");
  };

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/main" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/main" replace />
              ) : (
                <div className="page">
                  <Login
                    handleLogin={handleLogin}
                    infoMessage={tooltipMessage}
                    showInfoTooltip={showInfoTooltip}
                    infoSuccess={tooltipSuccess}
                  />
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/main" replace />
              ) : (
                <div className="page">
                  <Register
                    handleRegistration={handleRegistration}
                    infoMessage={tooltipMessage}
                    showInfoTooltip={showInfoTooltip}
                    infoSuccess={tooltipSuccess}
                  />
                  <Footer />
                </div>
              )
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <div className="page">
                  <PageLayout onLogout={handleLogout}>
                    <Main
                      entries={entries}
                      expenses={expenses}
                      currentUser={currentUser}
                    />
                  </PageLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <div className="page">
                  <PageLayout onLogout={handleLogout}>
                    <Expenses
                      expenses={expenses}
                      setExpenses={setExpenses}
                      onAddExpense={handleAddExpense}
                      onDeleteExpense={handleDeleteExpense}
                    />
                  </PageLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/entries"
            element={
              <ProtectedRoute>
                <div className="page">
                  <PageLayout onLogout={handleLogout}>
                    <Entries
                      entries={entries}
                      setEntries={setEntries}
                      onAddEntry={handleAddEntry}
                      onDeleteEntry={handleDeleteEntry}
                    />
                  </PageLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <div className="page">
                  <PageLayout onLogout={handleLogout}>
                    <Reports entries={entries} expenses={expenses} />
                  </PageLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/exchange-rates"
            element={
              <ProtectedRoute>
                <div className="page">
                  <PageLayout onLogout={handleLogout}>
                    <ExchangeRates />
                  </PageLayout>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={isLoggedIn ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}
