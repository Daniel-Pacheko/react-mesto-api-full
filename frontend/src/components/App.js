/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard({});
  }


  React.useEffect(() => {
    handleTokenCheck();
    Promise.all([api.getUserData(), api.getCards()])
      .then((res) => {
        console.log(res);
        const [user, cards] = res;
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);



  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser({ name, about }) {
    api.setUserProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.setCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
  };

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true)
          setEmail(res.email)
          history.push('/');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function handleRegistration(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsTooltipOpen(true);
        setIsRegister(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err)
        setIsTooltipOpen(true);
        setIsRegister(false);
      })
  }



  function handleAuthorization(email, password) {
    auth.authorize(email, password)
      .then(res => {
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/")
      })
      .catch((err) => {
        console.log(err);
        setIsRegister(false);
        setIsTooltipOpen(true);
      })
  }

  function handleSignout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/sign-in');
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header email={email} onSignOut={handleSignout} />
          <Switch>
            <ProtectedRoute
              exact path="/"
              component={Main}
              isLoggedIn={isLoggedIn}
              onEditProfile={() => setIsEditProfilePopupOpen(true)}
              onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
              onAddPlace={() => setIsAddPlacePopupOpen(true)}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Route path="/sign-up">
              {isLoggedIn ? <Redirect to="/" /> : <Register onRegister={handleRegistration} />}
            </Route>
            <Route path="/sign-in">
              {isLoggedIn ? <Redirect to="/" /> : <Login onLogin={handleAuthorization} />}
            </Route>
          </Switch>
          <Footer />

          <InfoToolTip isRegister={isRegister} isOpen={isTooltipOpen} onClose={closeAllPopups} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        </div>
      </div> 
    </CurrentUserContext.Provider>
  );
}

export default App;
