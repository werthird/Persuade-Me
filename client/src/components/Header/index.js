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
    
    <header className=" text-dark mb-4 py-3 flex flex-col bg-gradient-to-br from-gray-200 to-slate-700 items-center">
      <img className='shadow-lg shadow-indigo-300' src={logo} alt="logo" width={1000}/>
      <div className="container flex-column justify-space-between-lg justify-center text-center">
      
          <h1 className="m-0 text-sky-200 font-lora italic" style={{ fontSize: '5rem' }}>
            Let's Debate!
          </h1>
       
        <p className="mb-4 text-white" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Login to join a debate room
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse" to="/me">
                View My Profile
              </Link>
              <button className="m-4 bg-gradient-to-r from-cyan-300 text- to-zinc-600 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse m-2" to="/login">
                Login
              </Link>
              <Link className="m-2 bg-gradient-to-br from-cyan-300 text- to-zinc-600 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse" to="/signup">
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
