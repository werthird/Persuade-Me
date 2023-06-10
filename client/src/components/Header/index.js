import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/PM-logo.png';
import logoIcon from '../../images/PM-logo-icon.png';
import logoName from '../../images/PM-logo-name.png';
import Auth from '../../utils/auth';



const Header = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-gradient-to-br from-gray-200 to-slate-700">
      <div className="flex justify-between items-center px-5 py-1">
       
        <div className='flex'>
          <img className='' src={logoIcon} alt="logo-icon" width={100}/>
          <img className='m-auto' src={logoName} alt="logo-name" width={250}/>
        </div>
        <nav className=''>
          <Link className="mx-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/home">
            Home
          </Link>
          <Link className="mx-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/me">
            Profile
          </Link>
          <Link className="mx-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/highscore">
            Highscore
          </Link>
          {Auth.loggedIn() ? (
            <>
              <button className="m-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="m-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse m-2" to="/login">
                Login
              </Link>
              <Link className="m-4 m-2 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/signup">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
