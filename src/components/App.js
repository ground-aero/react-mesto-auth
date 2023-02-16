import React, {useEffect} from 'react';

import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';// HOC

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import {Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import * as auth from "../utils/auth";
import {NoMatch} from "./NoMatch";

/**
 * @returns {JSX.Element}
 */
function App() {
    /** Функция принимает два аргумента: 1 — строка или число. 2 - объект с двумя полями:replace и state. */
    const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  /** Состояние выбранной для просмотра карточки */
  const [selectedCard, setSelectedCard] = React.useState({});
  /** Состояние текущего пользователя */
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
  });
  /** Состояние массива карточек */
  const [cards, setCards] = React.useState([]);
  // console.log(cards);
  /** Состояние выбранной для удаления карточки */
  const [deleteCard, setDeleteCard] = React.useState({_id: ""});
  /** стейт-перемення loggedIn. Содержит статус пользователя — вошёл в систему или нет */
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

    // function handleLogin() {
    //     setLoggedIn(true);
    // }

    function handleLoginSubmit() {
        setIsLoginPopupOpen(true);
    }

  /** Открывает всплывающее редактирование аватара */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
      // return document.querySelector('#overlay_avatar').classList.add('popup_opened')
  }
  /** Открывает всплывающее редактирование профиля */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  /** Открывает всплывающее добавление карточки */
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImageClick() {
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
      setIsLoginPopupOpen(false);
  }

  /** Устанавливает выбранную карточку по нажатию
   * @param card */
  function handleCardClick(card) {
    setSelectedCard(card);
    // setIsImagePopupOpen(true)
  }

  /** ставит/удаляет лайки, @param card - объект карточки */
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
    api
      .changeLikeCardStatus(card._id, isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
        .catch((err) => {
            console.log(`err данных при лайке: ${err}`);
        });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
        .then(() => {
          /** создать копию массива, исключив из него удалённую карточку. */
          setCards((cards) => cards.filter(del => del !== card))
        })
        .catch((err) => {
          console.log(`err данных при удалении карточки: ${err}`);
        });
  }

  function handleUpdateUser(name, about) {
    api.patchUser(name, about)
        .then((userData) => {
          setCurrentUser(userData)
          closeAllPopups()
        })
        .catch((err) => {
          console.log(`err при загрузке данных юзера: ${err}`);
        });
  }

  function handleUpdateAvatar(link) {
    api.patchAvatar(link)
        .then((result) => {
          setCurrentUser(result)
          closeAllPopups()
        })
        .catch((err) => {
          console.log(`err при загрузке данных аватара: ${err}`);
        });
  }

    function handleAddPlaceSubmit(name, link) {
        api.addNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`err при отправке нов карточки на сервер: ${err}`);
            });
    }

    function handleRegister(password, email) {/** обработчик регистрации. @endpoint : /signin */
       return auth.register(password, email)
            .then((res) => {
                console.log(res)
                // .then((res) => {
                //     console.log(res) //При успешной регистрации второй обработчик then вернёт токен JWT
                // {data: {_id: "63ea50f8d4567c00131e6cda", email: "aeroportus24@mail.ru"}}
                // })
                // setMessage('');
                // navigate('/sign-in');
                navigate('/sign-in', {replace: true});
                  // localStorage.setItem('token', data.token)
            })
            .catch((err) => {
                console.log(`ошибка регистрации: ${err}`)
            })
    }

    function handleLogin(password, email) {/** @end-point: '/signin' */
        if (!password || !email) {
            return;
        }
        return auth.authorize(password, email)
          .then((data) => {
            console.log(data)/** выдает токен: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfa'} */
              if (data) {
                  setLoggedIn(true)
                  setEmail(email)
                  navigate('/', {replace: true});
              }
              // localStorage.setItem('token', data.token);/** сохраняем токен */
          })
          .catch((err) => {
              console.log(`ошибка при логине ${err}`)
          })
    }

    function handleTokenCheck() {/** @endpoint: '/users/me' */
        const jwt = localStorage.getItem('token')
        if (jwt) {// проверка, есть ли jwt токен в локальном хранилище браузера
            auth.checkToken(jwt)
                .then((res) => {
                    console.log(res)
                    if (res) {
                        setLoggedIn(true)
                        setEmail(res.data.email)
                        navigate('/', {replace: true})
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    /** Выход из приложения. Удаляем токен */
    function onLogout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/sign-in')
    }

    useEffect(() => {
        handleTokenCheck()
    }, []);

    // useEffect(() => {
    //     loggedIn ? navigate('/') : navigate('sign-in')
    // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
        Promise.all([api.getUser(), api.getAllCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(`Ошибка данных при загрузке аватара или карточек: ${err}`);
            })
    }
            // .finally(() => setIsLoading(false));
  }, [loggedIn]);


    function goToNewPage() {
        navigate('/new-page', { replace: true });
    }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
            loggedIn={loggedIn}
            email={email}
            onLogout={onLogout}
         />

          <Routes>

              <Route exact path="/" element={loggedIn ? <Navigate to="/index" /> : <Navigate to="/sign-in" />} />
              {/*<Route path="/" loggedIn={loggedIn}*/}
              {/*       element={<ProtectedRoute element={Main}*/}
              {/*                                onEditAvatar={handleEditAvatarClick}*/}
              {/*                                onEditProfile={handleEditProfileClick}*/}
              {/*                                onAddPlace={handleAddPlaceClick}*/}

              {/*                                cards={cards}*/}
              {/*                                onCardClick={handleCardClick}*/}
              {/*                                onCardLike={handleCardLike} //лайк/дизлайк*/}
              {/*                                onCardDelete={handleCardDelete}*/}
              {/*       />}*/}
              {/*/>*/}

             {/*<ProtectedRoute*/}
             {/*   exact path="/"*/}
             {/*   loggedIn={loggedIn}*/}
             {/*   component={Main}*/}
             {/*       onEditAvatar={handleEditAvatarClick}*/}
             {/*      onEditProfile={handleEditProfileClick}*/}
             {/*      onAddPlace={handleAddPlaceClick}*/}

             {/*      cards={cards}*/}
             {/*      onCardClick={handleCardClick}*/}
             {/*      onCardLike={handleCardLike} //лайк/дизлайк*/}
             {/*      onCardDelete={handleCardDelete}*/}
             {/*/>*/}


              <Route path='/index' element={<Main
                           onEditAvatar={handleEditAvatarClick}
                           onEditProfile={handleEditProfileClick}
                           onAddPlace={handleAddPlaceClick}

                           cards={cards}
                           onCardClick={handleCardClick}
                           onCardLike={handleCardLike} //лайк/дизлайк
                           onCardDelete={handleCardDelete}
                    />}
              />

            {/*  <Route*/}
            {/*    path="/"*/}
            {/*    loggedIn={loggedIn}*/}
            {/*    element={*/}
            {/*      <ProtectedRoute*/}
            {/*         element={Main}*/}
            {/*         onEditAvatar={handleEditAvatarClick}*/}
            {/*         onEditProfile={handleEditProfileClick}*/}
            {/*         onAddPlace={handleAddPlaceClick}*/}

            {/*         cards={cards}*/}
            {/*         onCardClick={handleCardClick}*/}
            {/*         onCardLike={handleCardLike} //лайк/дизлайк*/}
            {/*         onCardDelete={handleCardDelete}*/}
            {/*      />}*/}
            {/*/>*/}

              <Route path='/sign-up' element={<Register handleRegister={handleRegister}/>}  />
              <Route path='/sign-in' element={<Login handleLogin={handleLogin}/>} />
              {/* переадресация незалогиненного пользоватея на './sign-in' */}
              {/*<Route path='/'*/}
              {/*       element={loggedIn ? <Navigate to='/' replace/> : <Navigate to='/sign-in' replace/> }*/}
              {/*/>*/}
              <Route path="*" element={<NoMatch/>}/>

          </Routes>

        <Footer />


        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
        />


        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm />

        <ImagePopup
          onImageClick={handleImageClick}
          card={selectedCard}
          onClose={closeAllPopups}
          name={'zoom'}
        />

        <InfoTooltip
          name={'tooltip'}
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
            message={message}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
