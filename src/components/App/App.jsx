import Main from "../Main/Main";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
            </div>
          }
        />
      </Routes>
    </>
  );
}
