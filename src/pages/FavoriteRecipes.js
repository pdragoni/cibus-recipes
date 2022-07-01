import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import Share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const title = 'Favorite Recipes';
  const { setPageTitle, setSearchPageButton } = useContext(Context);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(true);
  const [type, setType] = useState('drink, food');
  const [data, setData] = useState([]);
  const favoritesData = JSON.parse(localStorage.getItem('favoriteRecipes'));
  useEffect(() => {
    setPageTitle(title);
    setSearchPageButton(false);
    setData(favoritesData);
    const DOISMS = 2000;

    if (copied === true) {
      setTimeout(() => {
        setCopied(false);
      }, DOISMS);
    }
  }, [type, favorite, copied]);

  const handleCopy = (recipe) => {
    if (recipe.type === 'food') {
      copy(`http://localhost:3000/foods/${recipe.id}`);
    } else {
      copy(`http://localhost:3000/drinks/${recipe.id}`);
    }

    setCopied(true);
  };

  const handleFavorite = (id) => {
    const newData = favoritesData.filter((recipes) => recipes.id !== id);
    if (favoritesData !== null) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(newData));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newData]));
    }
    setData(newData);
    setFavorite(true);
  };

  return (
    <section>
      <Header />
      <div className="explore-food-title-div">
        <h4 className="explore-food-title">Liked</h4>
      </div>
      <div className="explore-buttons-div">
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setType('food') }
          className="explore-button"
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setType('drink') }
          className="explore-button"
        >
          Drinks
        </button>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setType('drink, food') }
          className="explore-button"
        >
          All
        </button>
      </div>
      { data && data.filter((types) => type.includes(types.type))
        .map((favoriteRecipes, index) => (
          <div key={ favoriteRecipes.name } className="foodcard">
            <Link
              to={ `${favoriteRecipes.type}s/${favoriteRecipes.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ favoriteRecipes.image }
                alt={ favoriteRecipes.name }
                width="100px"
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{favoriteRecipes.name}</h2>
            </Link>
            { favoriteRecipes.type === 'food' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${favoriteRecipes.nationality} - ${favoriteRecipes.category}`}
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {favoriteRecipes.alcoholicOrNot}
              </p>
            )}
            <button
              type="button"
              onClick={
                () => handleCopy(favoriteRecipes)
              }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ Share }
                alt="Share button"
              />
            </button>
            {copied && <p>Link copied!</p>}
            {favorite
              ? (
                <button
                  type="button"
                  onClick={ () => handleFavorite(favoriteRecipes.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="button favorite"
                  />
                </button>)
              : (
                <button
                  type="button"
                  value={ favoriteRecipes.id }
                  onClick={ handleFavorite }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ whiteHeartIcon }
                    alt="button favorite"
                  />
                </button>)}
          </div>
        ))}
    </section>);
}

export default FavoriteRecipes;
