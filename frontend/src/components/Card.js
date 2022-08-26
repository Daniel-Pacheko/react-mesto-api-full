import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }


  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner !== currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `list__place-delete ${isOwn ? 'list__place-delete_hidden' : ''}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes === undefined ? false : card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `list__place-like ${isLiked ? 'list__place-like_active' : ''}`;

  return (
    <div id="card" className="template">
      <li className="list__place">
        <img className="list__place-photo" src={card.link} alt={card.name} onClick={handleClick} />
        <button className={cardDeleteButtonClassName} type="button" aria-label="удалить" onClick={handleDeleteClick}></button>
        
        <div className="list__caption">
          <h2 className="list__place-title">{card.name}</h2>
          <div className="list__place-description">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="лайк" type="button"></button>
            <p className="list__place-counter">{card.likes === undefined ? false : card.likes.length}</p>
          </div>
          
        </div>
      </li>
    </div>
  );
}

export default Card;