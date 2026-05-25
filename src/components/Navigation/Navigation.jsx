import { Link } from "react-router-dom";
import "./Navigation.css";
import HomeIcon from "../../images/home.svg";
import ExpensesIcon from "../../images/expenses.svg";
import EntriesIcon from "../../images/entries.svg";
import ReportsIcon from "../../images/reports.svg";
import ExchangeRatesIcon from "../../images/exchange.svg";

export default function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link to="/main" className="navigation__link">
            <img className="navigation__icon" src={HomeIcon} alt="Início" />
            Início
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/expenses" className="navigation__link">
            <img className="navigation__icon" src={ExpensesIcon} alt="Despesas" />
            Despesas
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/entries" className="navigation__link">
            <img className="navigation__icon" src={EntriesIcon} alt="Entradas" />
            Entradas
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/reports" className="navigation__link">
            <img className="navigation__icon" src={ReportsIcon} alt="Relatórios" />
            Relatórios
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/exchange-rates" className="navigation__link">
            <img className="navigation__icon" src={ExchangeRatesIcon} alt="Taxas de Câmbio" />
            Taxas de Câmbio
          </Link>
        </li>
      </ul>
    </nav>
  );
}
