import React from 'react';
import classNames from 'classnames';
import '../assets/styles/components/Search.scss';

const Search = ({ isHome }) => {
  const inputStyle = classNames('input', { isHome });
  const title = '¿Qué quieres ver hoy?';
  const searchPlaceholder = 'Buscar...';
  return (
    <>
      <h2 className='main__title'>{title}</h2>
      <input
        type='text'
        className={inputStyle}
        placeholder={searchPlaceholder}
      />
    </>
  );
};

export default Search;
