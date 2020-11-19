import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import '../assets/styles/components/Header.scss';

const Header = (props) => {
  const { user = {}, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const headerClass = classNames('header', { isLogin, isRegister });

  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={''} alt='Humantech Videos' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser && (
            <li>
              <a href='/'>Cuenta</a>
            </li>
          )}
          {hasUser ? (
            <li>
              <Link to='#logout' onClick={() => {}}>
                Cerrar Sesión
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/login'>Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(Header);
