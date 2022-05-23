import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

function ProfileEdit({ history }) {
  const state = {
    info: {},
    loading: true,
  };

  const [profileEditUser, setProfileEditUser] = useState(state);
  const [savedButton, setSavedButton] = useState(true);

  const updateInfoUser = () => {
    setProfileEditUser((prevState) => ({ ...prevState, loading: true }));
    updateUser(profileEditUser.info).then(() => history.push('/profile'));
  };

  const validateEmail = (email) => {
    const valid = /\S+@\S+\.\S+/;
    return valid.test(email);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setProfileEditUser(({ info }) => ({ info: { ...info, [name]: value } }));
  };

  const setInfo = (newInfo) => {
    setProfileEditUser({
      info: newInfo,
      loading: false,
    });
  };

  useEffect(() => {
    const getInfoUser = () => {
      getUser().then((info) => setInfo(info));
    };
    return getInfoUser();
  }, []);

  useEffect(() => {
    const { name, email, description, image } = profileEditUser.info;
    const isValid = validateEmail(email);
    if (name === '' || description === '' || image === '' || isValid === false) {
      setSavedButton(true);
    } else {
      setSavedButton(false);
    }
  }, [profileEditUser]);

  return (
    <div data-testid="page-profile-edit">
      <Header />
      {profileEditUser.loading ? (
        <Loading />
      ) : (
        <form>
          <label htmlFor="inputName">
            Nome
            <input
              data-testid="edit-input-name"
              name="name"
              value={ profileEditUser.info.name }
              type="text"
              id="loginName"
              onChange={ handleChange }
            />
          </label>
          <br />
          <label htmlFor="inputEmail">
            Email
            <input
              data-testid="edit-input-email"
              name="email"
              value={ profileEditUser.info.email }
              type="email"
              id="inputEmail"
              onChange={ handleChange }
            />
          </label>
          <br />
          <label htmlFor="inputDescription">
            Descrição
            <input
              data-testid="edit-input-description"
              name="description"
              value={ profileEditUser.info.description }
              type="text"
              id="inputDescription"
              onChange={ handleChange }
            />
          </label>
          <br />
          <label htmlFor="inputUrl">
            URL
            <input
              data-testid="edit-input-image"
              name="image"
              value={ profileEditUser.info.image }
              type="text"
              id="inputUrl"
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ savedButton }
            onClick={ updateInfoUser }
          >
            Salvar
          </button>
        </form>
      )}
    </div>
  );
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default ProfileEdit;
