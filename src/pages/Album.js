import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

function Album({ match: { params: { id } } }) {
  const album = {
    musics: [],
    album: {},
    musicsReturn: false,
  };

  const [albumMusics, setAlbumMusics] = useState(album);

  useEffect(() => {
    const getAlbum = async () => {
      const getMusicsOfAlbum = await getMusics(id);
      const musicList = getMusicsOfAlbum.filter(
        (music) => music.kind === 'song',
      );
      setAlbumMusics({
        musics: musicList,
        album: getMusicsOfAlbum[0],
        musicsReturn: true,
      });
    };
    return getAlbum();
  }, [id]);

  return (
    <div data-testid="page-album">
      <Header />
      <div>
        { albumMusics.musicsReturn && (
          <>
            <div>
              <img
                src={ albumMusics.album.artworkUrl100 }
                alt={ albumMusics.album.collectionName }
              />
              <h4 data-testid="artist-name">
                { albumMusics.album.artistName }
              </h4>
              <p data-testid="album-name">
                { albumMusics.album.collectionName }
              </p>
            </div>
            <div>
              <MusicCard musics={ albumMusics.musics } />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
