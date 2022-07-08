import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styless/login.css';

function Login({ history }) {
  const login = {
    name: '',
    loading: false,
  };

  const [loginForm, setLoginForm] = useState(login);

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };
  const TRUE = 3;
  const handleButtonLogin = () => (loginForm.name.length < TRUE);

  const loginUser = async () => {
    setLoginForm((prevState) => ({ ...prevState, loading: true }));
    await createUser({ name: loginForm.name });
    setLoginForm((prevState) => ({ ...prevState, loading: false }));
    history.push('/search');
  };

  return (
    <div data-testid="page-login">
      { loginForm.loading ? (
        <Loading />
      ) : (
        <form className="loginContainer">
          <h1>TrybeTunes</h1>
          <label htmlFor="loginName">
            <input
              type="text"
              className="inputLogin"
              data-testid="login-name-input"
              name="name"
              value={ loginForm.name }
              id="loginName"
              onChange={ handleChanges }
            />
          </label>
          <button
            type="button"
            className="buttonLogin"
            data-testid="login-submit-button"
            disabled={ handleButtonLogin() }
            onClick={ loginUser }
          >
            Entrar
          </button>
        </form>
      ) }
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
};

export default Login;
