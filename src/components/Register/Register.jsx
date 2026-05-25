import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";
import Header from "../Header/Header";

export default function Register({ handleRegistration, infoMessage, showInfoTooltip, infoSuccess, isLoading }) {
  const [data, setData] = useState({
    name: "",
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
    handleRegistration(data);
  };

  return (
    <>
      <Header />
      <div className="register">
        <h2 className="register__title">Inscrever-se</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            name="name"
            className="register__input"
            type="text"
            placeholder="Nome"
            required
            value={data.name}
            onChange={handleChange}
          />
          <input
            name="email"
            className="register__input"
            type="email"
            placeholder="E-mail"
            required
            value={data.email}
            onChange={handleChange}
          />
          <input
            name="password"
            className="register__input"
            type="password"
            placeholder="Senha"
            required
            value={data.password}
            onChange={handleChange}
          />
          <button className="register__button" type="submit" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Inscrever-se"}
          </button>
          {(showInfoTooltip || isLoading) && (
            <span
              className={`register__message ${isLoading ? "register__message_loading loading-animation" : infoSuccess ? "register__message_success" : "register__message_error"}`}>
              {isLoading ? "Carregando..." : infoMessage}
            </span>
          )}
          <Link className="register__login-text" to="/login">
            Já possui uma conta? Faça login aqui!
          </Link>
        </form>
      </div>
    </>
  );
}
