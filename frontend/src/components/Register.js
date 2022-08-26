import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form" name="sign-up">
        <h2 className="register__title">Регистрация</h2>
        <label htmlFor="email" className="register__label"></label>
        <input onChange={handleEmailChange} value={email} className="register__input register__input_email" type="email" name="email" placeholder="Email" />
        <label htmlFor="password" className="register__label"></label>
        <input onChange={handlePasswordChange} value={password} className="register__input register__input_password" type="password" name="password" placeholder="Пароль" minLength="2" maxLength="40" required />
        <button className="register__button" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
      </form>
      <div className="register__signin-container">
        <p className="register__text">Уже зарегистрированы?
          <Link to="/sign-in" className="register__signin">Войти</Link></p>
      </div>
    </div>
  )
}
export default Register;