import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Header from "../Header/Header";

export default function Login({ handleLogin, infoMessage, showInfoTooltip, infoSuccess }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <>
    <Header />
      <div className="login">
        <h2 className="login__title">Entrar</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            name="email"
            className="login__input"
            type="email"
            placeholder="E-mail"
            required
            value={data.email}
            onChange={handleChange}
          />
          <input
            name="password"
            className="login__input"
            type="password"
            placeholder="Senha"
            required
            value={data.password}
            onChange={handleChange}
          />
          <button className="login__button" type="submit">
            Entrar
          </button>
          {showInfoTooltip && (
            <p className={`login__message ${infoSuccess ? "login__message_success" : "login__message_error"}`}>
              {infoMessage}
            </p>
          )}
          <Link className="login__register-text" to="/register">
            Ainda não tem uma conta? Cadastre-se aqui!
          </Link>
        </form>
      </div>
    </>
  );
}
