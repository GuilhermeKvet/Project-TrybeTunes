import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

function Search() {
  const TWO = 2;

  const state = {
    artistInput: '',
    artistWanted: '',
    loading: false,
    albumReturn: false,
    albums: [],
  };

  const [artistInfo, setArtistInfo] = useState(state);

  const hangleChange = ({ target }) => {
    const { name, value } = target;
    setArtistInfo({
      ...artistInfo,
      [name]: value,
    });
  };

  const renderArtistList = async () => {
    setArtistInfo((prevState) => ({ ...prevState, albumReturn: true }));
  };

  const searchAlbums = async () => {
    setArtistInfo({
      artistInput: '',
      artistWanted: artistInfo.artistInput,
      loading: true,
      albumReturn: false,
      albums: [],
    });
    const capturingAlbums = await searchAlbumsAPI(artistInfo.artistInput);
    setArtistInfo((prevState) => ({
      ...prevState,
      loading: false,
      albums: capturingAlbums,
    }));
    await renderArtistList();
  };

  return (
    <div data-testid="page-search">
      <Header />
      <form>
        <label htmlFor="searchArtist">
          <input
            data-testid="search-artist-input"
            type="text"
            id="searchArtist"
            name="artistInput"
            value={ artistInfo.artistInput }
            onChange={ hangleChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ artistInfo.artistInput.length < TWO }
          onClick={ searchAlbums }
        >
          Pesquisar
        </button>
      </form>
      {artistInfo.loading ? (
        <Loading />
      ) : (
        <div>
          {artistInfo.albumReturn && (
            <>
              <h3>
                Resultado de álbuns de:
                { ' ' }
                { artistInfo.artistWanted }
              </h3>
              <div>
                {artistInfo.albums.map((album) => (
                  <div key={ album.collectionId }>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <h3>{ album.collectionName }</h3>
                    <p>{ album.artistName }</p>
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/album/${album.collectionId}` }
                    >
                      Ir para album
                    </Link>
                  </div>
                ))}
              </div>
              {artistInfo.albums.length === 0 && 'Nenhum álbum foi encontrado'}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
