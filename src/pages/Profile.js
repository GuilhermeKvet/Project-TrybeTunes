import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styless/profile.css';

function Profile() {
  const state = {
    info: {},
    loading: true,
  };

  const [profileUser, setProfileUser] = useState(state);

  useEffect(() => {
    const getInfoUser = async () => {
      getUser().then((info) => setProfileUser({ info, loading: false }));
    };
    return getInfoUser();
  }, []);

  return (
    <div data-testid="page-profile">
      <Header />
      {profileUser.loading ? (
        <Loading />
      ) : (
        <div className="profileForm">
          <div>
            <img
              data-testid="profile-image"
              src={ profileUser.info.image }
              alt={ profileUser.info.name }
            />
            <h2>{`Nome: ${profileUser.info.name} `}</h2>
            <p>{`Email: ${profileUser.info.email} `}</p>
            <p>{`Descrição: ${profileUser.info.description} `}</p>
          </div>
          <Link to="/profile/edit"> Editar perfil </Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
