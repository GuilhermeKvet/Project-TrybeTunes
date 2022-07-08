import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import '../styless/album.css';

function Album({ match: { params: { id } } }) {
  const state = {
    musics: [],
    album: {},
    musicsReturn: true,
    favoritedList: [],
    musicFavorited: false,
  };

  const [albumMusics, setAlbumMusics] = useState(state);

  const savingChange = (favoritedList) => {
    setAlbumMusics((prevState) => ({
      ...prevState,
      favoritedList,
      musicFavorited: false,
    }));
  };

  const setMusics = (getMusicsOfAlbum, musicList) => {
    setAlbumMusics((prevState) => ({
      ...prevState,
      musics: musicList,
      album: getMusicsOfAlbum[0],
      musicsReturn: false,
    }));
  };

  const favoritedMusic = ({ target }) => {
    const { checked, value } = target;
    const music = albumMusics.musics.find(
      (item) => item.trackId === parseInt(value, 10),
    );
    const update = checked ? addSong : removeSong;
    setAlbumMusics((prevState) => ({ ...prevState, musicFavorited: true }));
    update(music)
      .then(() => getFavoriteSongs())
      .then((favoritedList) => savingChange(favoritedList));
  };

  useEffect(() => {
    const getAlbum = async () => {
      const getMusicsOfAlbum = await getMusics(id);
      const musicList = getMusicsOfAlbum.filter(
        (music) => music.kind === 'song',
      );
      getFavoriteSongs().then((favoritedList) => setAlbumMusics((prevState) => (
        { ...prevState, favoritedList, musicFavorited: false })));
      setMusics(getMusicsOfAlbum, musicList);
    };
    return getAlbum();
  }, [id]);

  return (
    <div data-testid="page-album">
      <Header />
      <div>
        { albumMusics.musicsReturn || albumMusics.musicFavorited ? (
          <Loading />
        ) : (
          <div className="albumContainer">
            <div>
              { albumMusics.album && (
                <div className="albumInfo">
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
              ) }
            </div>
            <div className="musics">
              <MusicCard
                musics={ albumMusics.musics }
                favorites={ albumMusics.favoritedList }
                change={ favoritedMusic }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
