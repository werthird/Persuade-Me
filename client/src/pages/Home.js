import React, { useEffect, useState } from 'react';
import LobbyForm from '../components/LobbyForm';
import LobbyList from '../components/LobbyList';


const Home = () => {
  // const socket = io('http://localhost:3001'); // Replace with your server URL
  return (
    <main className='flex-col flex items-center'>
      <div className="flex-row flex">
        <div className="col-12 col-md-10 my-3">
        <LobbyForm />
        <LobbyList />
        </div>
      </div>
    </main>
  );
};

export default Home;
