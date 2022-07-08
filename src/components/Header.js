import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styless/header.css';

function Header() {
  const user = {
    name: '',
    loading: false,
  };

  const [userName, setUserName] = useState(user);

  useEffect(() => {
    const fetchData = async () => {
      setUserName((prevState) => ({ ...prevState, loading: true }));
      const userInfo = await getUser();
      setUserName((prevState) => ({ ...prevState, name: userInfo.name }));
      setUserName((prevState) => ({ ...prevState, loading: false }));
    };
    return fetchData();
  }, []);

  return (
    <header data-testid="header-component" className="header">
      <h1>TrybeTunes</h1>
      {userName.loading ? (
        <Loading />
      ) : (
        <div className="headerContent">
          <h4
            data-testid="header-user-name"
            className="user-name"
          >{userName.name}</h4>
          <nav className="links">
            <Link data-testid="link-to-search" to="/search">
              Pesquisar
            </Link>
            <Link data-testid="link-to-favorites" to="/favorites">
              Favoritas
            </Link>
            <Link data-testid="link-to-profile" to="/profile">
              Perfil
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
