import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({ musics }) {
  return (
    <div>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
