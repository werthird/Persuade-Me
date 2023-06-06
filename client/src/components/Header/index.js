import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/PM-logo.png'

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" text-dark mb-4 py-3 display-flex bg-gray-500">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
      <img src={logo} alt="logo"/>
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            Let's Debate!
          </h1>
       
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Login to join a debate room
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="bg-gradient-to-r from-zinc-600 text- to-cyan-300 text-white px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse" to="/me">
                View My Profile
              </Link>
              <button className="m-4 bg-gradient-to-r from-cyan-300 text- to-zinc-600 text-white px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
