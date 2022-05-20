import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

function MusicCard({ musics }) {
  const state = {
    favoritedList: [],
    musicFavorited: false,
  };

  const [favorited, setFavorited] = useState(state);

  const savingChange = async (music) => {
    setFavorited({
      favoritedList: [...favorited.favoritedList, music],
      musicFavorited: false,
    });
  };

  const favoritedMusic = async ({ target }) => {
    const { checked, value } = target;
    const music = musics.find((item) => item.trackId === parseInt(value, 10));
    const update = checked ? addSong : removeSong;
    setFavorited({ favoritedList: [], musicFavorited: true });
    await update(music);
    await savingChange(music);
  };

  return (
    <div>
      {favorited.musicFavorited ? (
        <Loading />
      ) : (
        <ul>
          {musics.map((music) => (
            <li key={ music.trackId }>
              <p>{ music.trackName }</p>
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                { ' ' }
                <code>audio</code>
              </audio>
              <label htmlFor="favorite">
                Favorita
                <input
                  data-testid={ `checkbox-music-${music.trackId}` }
                  type="checkbox"
                  id="favorite"
                  name="favorited"
                  value={ music.trackId }
                  checked={ favorited.favoritedList.some(
                    (musicFv) => musicFv.trackId === music.trackId,
                  ) }
                  onChange={ favoritedMusic }
                />
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
