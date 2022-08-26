import React from "react";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form" name="sign-in">
      <h2 className="login__title">Вход</h2>
        <label htmlFor="email" className="login__label"></label>
        <input onChange={handleEmailChange} value={email} className="login__input login__input_email" type="email" name="email" placeholder="Email" required/>
        <label htmlFor="password" className="login__label"></label>
        <input onChange={handlePasswordChange} value={password} className="login__input login__input_password" type="password" name="password" placeholder="Пароль" minLength="2" maxLength="40" required />
        <button className="login__button" type="submit" onClick={handleSubmit}>Войти</button>
      </form>
    </div>
  )
}
export default Login;