import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link to="/main" className="navigation__link">
            Início
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/expenses" className="navigation__link">
            Despesas
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/entries" className="navigation__link">
            Entradas
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/reports" className="navigation__link">
            Relatórios
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/exchange-rates" className="navigation__link">
            Taxas de Câmbio
          </Link>
        </li>
      </ul>
    </nav>
  );
}
