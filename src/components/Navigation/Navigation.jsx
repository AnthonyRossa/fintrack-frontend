import './Navigation.css'

export default function Navigation() {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item">
                    <a href="/main" className="navigation__link">Início</a>
                </li>
                <li className="navigation__item">
                    <a href="/expenses" className="navigation__link">Despesas</a>
                </li>
                <li className="navigation__item">
                    <a href="/entries" className="navigation__link">Entradas</a>
                </li>
                <li className="navigation__item">
                    <a href="/reports" className="navigation__link">Relatórios</a>
                </li>
            </ul>
        </nav>
    )
}