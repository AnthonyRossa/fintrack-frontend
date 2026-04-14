import Main from "../Main/Main";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Expenses from "../Expenses/Expenses";
import Entries from "../Entries/Entries";
import Reports from "../Reports/Reports";

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
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}
