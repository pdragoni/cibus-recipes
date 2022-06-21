import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../context/Context';

function Header() {
  const { setURL } = useContext(Context);

  const [isSearching, setIsSearching] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [query, setQuery] = useState('');
  const [radio, setRadio] = useState('');
  // const [URL, setURL] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setUsuario(email);
  }, []);

  const clickToSearch = () => {
    console.log('search');
    if (!isSearching) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handleQuery = ({ target }) => {
    setQuery(target.value);
  };

  const handleRadio = ({ target }) => {
    setRadio(target.id);
  };

  const handleSearch = () => {
    const INGREDIENTS_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    const NAME_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const FIRST_LETTER_URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
    switch (radio) {
    case 'ingredients':
      console.log(INGREDIENTS_URL);
      return setURL(INGREDIENTS_URL);
    case 'name':
      console.log(NAME_URL);
      return setURL(NAME_URL);
    case 'first-letter':
      if (query.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      console.log(FIRST_LETTER_URL);
      return setURL(FIRST_LETTER_URL);
    default:
      return undefined;
    }
  };

  return (
    <header>
      <h3>Receitas Grupo 14</h3>
      <label htmlFor="btnProfile">
        <button
          name="btnProfile"
          type="button"
          id="btnProfile"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="foto-de-perfil" />
        </button>
        <span data-testid="page-title">
          { usuario }
        </span>
      </label>
      <br />
      <button
        name="btnSearch"
        type="button"
        data-testid="search-top-btn"
        onClick={ clickToSearch }
      >
        <img src={ searchIcon } alt="imagem-de-busca" />
      </button>
      {
        isSearching
          && (
            <div>
              <input
                onChange={ handleQuery }
                data-testid="search-input"
                type="text"
                placeholder="Search here"
              />
              <label htmlFor="ingredients">
                Ingredients
                <input
                  onChange={ handleRadio }
                  id="ingredients"
                  type="radio"
                  data-testid="name-search-radio"
                  name="categories"
                />
              </label>
              <label
                htmlFor="name"
              >
                Name
                <input
                  onChange={ handleRadio }
                  id="name"
                  type="radio"
                  data-testid="ingredient-search-radio"
                  name="categories"
                />

              </label>
              <label
                htmlFor="first-letter"
              >
                First letter
                <input
                  onChange={ handleRadio }
                  id="first-letter"
                  type="radio"
                  data-testid="first-letter-search-radio"
                  name="categories"
                />
              </label>
              <button
                type="button"
                data-testid="exec-search-btn"
                onClick={ handleSearch }
              >
                Go!
              </button>
            </div>)
      }
      <br />
    </header>
  );
}

export default Header;