import LobbyForm from '../components/LobbyForm';
import LobbyList from '../components/LobbyList';
import Login from '../components/Login';
import Signup from '../components/Signup';

import Auth from '../utils/auth';
import logo from '../images/PM-logo-icon.png';
import imageL from '../images/leftImage.png';
import imageR from '../images/rightImage.png';
import { logoPack } from '../utils/logos'

import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const Landing = () => {
  const stuff = {
    logo: () => { return (<img src={logo} />) },
    login: () => { return (<Login />) },
    signup: () => { return (<Signup />) }
  }

  const [pageType, setPage] = useState('logo')
  const [logos, setLogos] = useState([]);
  const [oldLogos, setOldLogos] = useState([]);

  useEffect(() => {
    setLogos(logoPack[Math.floor(Math.random() * logoPack.length)])
    setInterval(() => {
      console.log('triggering loop')
      const randomInd = Math.floor(Math.random() * logoPack.length)
      setOldLogos(logos)
      setLogos(logoPack[randomInd])
      console.log(oldLogos, logos)
    }, 5000)
  }, [])

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const handlePageClick = (event) => {
    const pageResponse = event.target.id === pageType ? 'logo' : event.target.id
    setPage(pageResponse)
  }

  return (
    <main className='flex flex-row bg-gradient-to-br from-gray-200 to-slate-700 justify-end items-end w-full h-screen border-2 border-black'>
      <div id='left-stack' className="relative">
        <img src={imageL} />
        <img src={logos[0]} className="smallLeft absolute top-0 right-0" />
      </div>
      <div className="centercontainer h-screen text-dark py-3 flex flex-col  items-center justify-between self-center">
        {stuff[pageType]()}
        {Auth.loggedIn() ? (
          <div id="buttonRow">
            <Link className="m-6 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/me">
              Profile
            </Link>
            <Link className="m-6 bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" to="/home">
              Home
            </Link>
            <button className="m-6 bg-gradient-to-r from-cyan-300 text- to-zinc-600 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div id="buttonRow" className="flex flex-row gap-x-7">
            <div>
              <button id="login" className="landingbtn bg-gradient-to-br from-zinc-600 text-black to-cyan-300 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" onClick={handlePageClick}>
                Login
              </button>
            </div>
            <div>
              <button id="signup" className="landingbtn bg-gradient-to-br from-cyan-300 text-black to-zinc-600 text-black px-4 py-2 border-none rounded-md hover:animate-pulse" onClick={handlePageClick}>
                Signup
              </button>
            </div>
          </div>
        )}
      </div>
      <div id='left-stack' className="relative">
        <img src={imageR} />
        <img src={logos[1]} className="smallRight absolute top-0 right-0" />
      </div>
    </main>
  );
};

export default Landing;
