import React from 'react';


function ImagePopup(props) {
  const { card, onClose } = props;
  return (
    <section className={`popup popup_increase ${card.link ? "popup_is-open" : ""}`}>
      <div className="popup__content-increase">
        <button className="popup__close" type="button" aria-label="закрыть" onClick={onClose}></button>
        <img className="popup__photo-increase" src={card.link} alt={card.name} />
        <h2 className="popup__title-increase">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;