import './Header.css'
import LogoutIcon from "../../images/logout.svg";
import FtIcon from "../../images/fticon.png";

export default function Header({ onLogout }) {
    return (
        <header className="header">
            <div className="header__title">
            <img className='header__title-logo' src={FtIcon} alt="FinTrack Icon" />
            <h1 className="header__title-text">FinTrack</h1>
            </div>
            {onLogout && (
              <button className="header__logout" onClick={onLogout}>
                <img className='header__logout-icon' src={LogoutIcon} alt="Sair" />
                Sair
              </button>
            )}
        </header>
    )
}