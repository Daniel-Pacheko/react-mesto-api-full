import React from "react";
import LogoMesto from '../images/Logo-mesto.svg'
import { Link, Route } from "react-router-dom";

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={LogoMesto} alt="Логотип" />
      <Route exact path="/">
        <div className="header__user-container">
          <p className="header__email">{email}</p>
          <button className="header__button" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      </Route>
      <Route exact path="/sign-in">
        <Link className="header__link" to="/sign-up" >Регистрация</Link>
      </Route>
      <Route exact path="/sign-up">
        <Link className="header__link" to="/sign-in" >Войти</Link>
      </Route>
    </header>
  )
}

