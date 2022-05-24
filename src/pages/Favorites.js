import React, { useState, useEffect } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

function Favorites() {
  const state = {
    favoritesList: [],
    musicFavorited: true,
  };

  const [favorite, setFavorite] = useState(state);

  const setMusicFav = (favoritesList) => {
    setFavorite({
      favoritesList,
      musicFavorited: false,
    });
  };

  const favoriteChange = ({ target }) => {
    const { checked, value } = target;
    const musicFav = favorite.favoritesList.find(
      (music) => music.trackId === parseInt(value, 10),
    );
    const update = checked ? addSong : removeSong;
    setFavorite((prevState) => ({ ...prevState, musicFavorited: true }));
    update(musicFav).then(() => getFavoriteSongs())
      .then((favorites) => setMusicFav(favorites));
  };

  useEffect(() => {
    const getFavoritedMusics = async () => {
      getFavoriteSongs().then((favoritesList) => setMusicFav(favoritesList));
    };
    return getFavoritedMusics();
  }, []);

  return (
    <div data-testid="page-favorites">
      <Header />
      {favorite.musicFavorited ? (
        <Loading />
      ) : (
        <div>
          {favorite.favoritesList.length > 0 ? (
            <div>
              <MusicCard
                musics={ favorite.favoritesList }
                favorites={ favorite.favoritesList }
                change={ favoriteChange }
              />
            </div>
          ) : (
            <p>Nenhuma música adicionada aos favoritos no momento!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Favorites;
