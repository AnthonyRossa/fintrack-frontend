import Main from "../Main/Main";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Expenses from "../Expenses/Expenses";
import Entries from "../Entries/Entries";
import Reports from "../Reports/Reports";
import ExchangeRates from "../ExchangeRates/ExchangeRates";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/main"
          element={
            <div className="page">
              <Header />
              <Navigation />
              <Main />
            </div>
          }
        />
        <Route
          path="/expenses"
          element={
            <div className="page">
              <Header />
              <Navigation />
              <Expenses />
            </div>
          }
        />
        <Route
          path="/entries"
          element={
            <div className="page">
              <Header />
              <Navigation />
              <Entries />
            </div>
          }
        />
        <Route
          path="/reports"
          element={
            <div className="page">
              <Header />
              <Navigation />
              <Reports />
            </div>
          }
        />
        <Route
          path="/exchange-rates"
          element={
            <div className="page">
              <Header />
              <Navigation />
              <ExchangeRates />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}
