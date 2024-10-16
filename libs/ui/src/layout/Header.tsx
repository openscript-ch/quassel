import { cloneElement, ReactElement } from "react";
import logoUrl from '../../public/uzh_logo.svg';
import './Header.css';

type HeaderProps = {
  navigtationItems?: ReactElement[];
};

export function Header({ navigtationItems }: HeaderProps) {
  return (
    <header className="Header">
      <div className="Header--top">
        <div className="Header--logo">
          <a className="Logo" href="/">
            <img src={logoUrl} alt="Universität Zürich" width="208" height="92" />
          </a>
        </div>
        <h2 className="Header--department">Quassel</h2>
      </div>

      {navigtationItems && (
        <nav className="MainNav--inner">
          <ul className="MainNav--list">
            {navigtationItems.map((item) => (
              <li className="MainNav--list--item">{cloneElement(item, { className: "MainNav--link" })}</li>
            ))}
          </ul>
        </nav>
      )}

      <div className="MainNav">
        <div className="MainNav--service">
          <nav className="ServiceNav">
            <ul className="ServiceNav--list">
              <li className="ServiceNav--list--item">
                <a className="ServiceNav--link" href="">
                  English
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
