import LobbyForm from '../components/LobbyForm';
import LobbyList from '../components/LobbyList';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Footer from '../components/Footer';

import Auth from '../utils/auth';
import logo from '../images/PM-logo-icon.png';
import logoName from '../images/PM-logo-name.png';
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
    <>
    <main className='flex flex-row bg-gradient-to-br from-gray-200 to-slate-700 justify-between items-end w-full'>
      <div id='left-stack' className="relative">
        <img src={imageL} />
        <img src={logos[0]} className="smallLeft absolute top-0 right-0" />
      </div>
      <div className="flex flex-col items-center justify-items-around">
      <div className="centercontainer shadow-xl shadow-indigo-400 text-dark py-3 flex flex-col items-center justify-between self-center border-r border-black overflow-hidden">
        {stuff[pageType]()}
        <img src={logoName}/>
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
              <button id="login" className="landingbtn bg-gradient-to-br from-zinc-600 text-black to-cyan-300  px-4 py-2 border-none rounded-md hover:animate-pulse" onClick={handlePageClick}>
                Login
              </button>
            </div>
            <div>
              <button id="signup" className="landingbtn bg-gradient-to-br from-cyan-300 text-black to-zinc-600  px-4 py-2 border-none rounded-md hover:animate-pulse" onClick={handlePageClick}>
                Signup
              </button>
            </div>
          </div>
        )}
      </div>
      <div class="max-w-xl rounded-xl overflow-hidden my-10 shadow-lg shadow-black">
            <div class="px-12 py-4 bg-slate-300">
              <div class="font-bold text-4xl mb-2 text-center font-poppins">Persuade Me</div>
              <p class="text-gray-700 text-base text-center font-semibold italic">
                A live chat debate platform. 
              </p>
              <p className='text-center pt-8 font-semibold font-lora'>Make a profile to create and join a debate lobby. Invite other users and have a friendly dabate! Make sure to keep the debates clean and orderly. Use the above signup button to create an account.</p>
              <p className='text-center pt-8 font-semibold font-lora'> Users who create a debate lobby are set as admin by default.</p>
            </div>
          </div>
          </div>
      <div id='right-stack' className="relative">
        <img src={imageR} />
        <img src={logos[1]} className="smallRight absolute top-0 right-0" />
      </div>
    </main>
    <Footer />
    </>
  );
};

export default Landing;
