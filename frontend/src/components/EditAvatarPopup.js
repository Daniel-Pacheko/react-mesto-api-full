import React, { useRef } from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);


  return (
    <PopupWithForm name="avatar" title="Обновить аватар" textBtn="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      {/* <fieldset className="popup__field"> */}
        <input ref={avatarRef} className="popup__input popup__input_type_img-avatar" type="url" name="avatar" id="avatar" placeholder="Ссылка на фотографию" required />
        <span className="popup__input-error popup__input-error_title">#</span>
      {/* </fieldset> */}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;