import React, { useEffect, useState } from 'react';
import LobbyForm from '../components/LobbyForm';
import LobbyList from '../components/LobbyList';
import {Redirect} from 'react-router-dom';

import Auth from '../utils/auth';


const Home = () => {
  return (
    <main className='flex-col flex items-center'>
      <div className="flex-row flex">
        <div className="col-12 col-md-10 my-3">
          {Auth.loggedIn() ? (
            <div>
            <LobbyForm />
            <LobbyList />
            </div>
   ) : (<div></div>)}
        </div>
      </div>
    </main>
  );
};

export default Home;
