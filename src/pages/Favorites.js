import React, { useState, useEffect } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

function Favorites() {
  const state = {
    favoritesList: [],
    musicFavorited: true,
  };

  const [favorite, setFavorite] = useState(state);

  useEffect(() => {
    const getFavoritedMusics = () => {
      getFavoriteSongs().then((favoritesList) => setFavorite({
        favoritesList,
        musicFavorited: false,
      }));
    };
    return getFavoritedMusics();
  }, []);

  return (
    <div data-testid="page-favorites">
      <Header />
      <div>
        {favorite.musicFavorited ? (
          <Loading />
        ) : (
          <MusicCard musics={ favorite.favoritesList } />
        )}
      </div>
    </div>
  );
}

export default Favorites;
