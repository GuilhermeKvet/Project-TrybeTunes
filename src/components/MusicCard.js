import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({ music, change, favorites }) {
  return (
    <div>
      <div>
        <p>{ music.trackName }</p>
      </div>
      <div>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
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
            checked={ favorites.some((musicFv) => musicFv.trackId === music.trackId) }
            onChange={ change }
          />
        </label>
      </div>
    </div>
  );
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf.isRequired,
  change: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
