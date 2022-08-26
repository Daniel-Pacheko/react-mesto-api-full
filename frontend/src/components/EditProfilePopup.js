import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  return (
    <PopupWithForm name="profile" title="Редактировать профиль" textBtn="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      {/* <fieldset className="popup__field"> */}
        <input onChange={handleChangeName} value={name || ''} className="popup__input popup__input_type_name" type="text" name="name" id="name" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="popup__input-error popup__input-error_title" id="name-error">#</span>
        <input onChange={handleChangeDescription} value={description || ''} className="popup__input popup__input_type_job" type="text" name="about" id="about" placeholder="О себе" minLength="2" maxLength="200" required />
        <span className="popup__input-error popup__input-error_description" id="about-error">#</span>
      {/* </fieldset> */}
    </PopupWithForm>
  );
}

export default EditProfilePopup;