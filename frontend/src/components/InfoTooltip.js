import React from 'react';
import success from "../images/Icon-yes.svg";
import fail from "../images/Icon-no.svg";

function InfoTooltip({ isOpen, isRegister, onClose }) {
  return (
    <div className={`popup ${isOpen && 'popup_is-open'}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" aria-label="закрыть" onClick={onClose}></button>
        <div className="popup__status-container">
          <img src={isRegister ? success : fail} className="popup__tooltip-image" alt={isRegister ? 'Успешно' : 'Ошибка'}></img>
          <p className="popup__tooltip-title">{isRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;