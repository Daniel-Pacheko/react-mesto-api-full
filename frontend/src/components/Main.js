import React from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardDelete, onCardLike, cards }) {
  const currentUser = React.useContext(CurrentUserContext);



  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt={`Аватар: ${currentUser.name}`} />
          <button className="profile__icon-btn" type="submit" aria-label="редактировать аватар" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button className="profile__button-edit" type="button" aria-label="редактировать" onClick={onEditProfile}></button>
        </div>
        <button className="profile__button-add" type="button" aria-label="добавить" onClick={onAddPlace}></button>
      </section>
      <section className="lists">
        <ul className="list">
          {cards.map(card => (<Card card={card} key={card._id} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike} />))}
        </ul>
      </section>
    </main>
  )
}
export default Main;