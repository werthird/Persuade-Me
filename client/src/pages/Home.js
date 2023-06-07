import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  const [message, setMessage] = useState('');
  const [messagesReceived, setMessagesReceived] = useState([]);

  const socket = io('http://localhost:3001'); // Replace with your server URL

  const sendMessage = () => {
    socket.emit('message_from_client', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('message_from_server', (data) => {
      setMessagesReceived(data);
    });
  }, [socket]);

  return (
    <main className='flex-col flex items-center'>
      <div className="flex-row flex">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
            <div>Topic:</div>
            <input placeholder="Your topic"
                  name="topic"
                  type="topic"
                />
                <button
                  className=" mb-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 mt-4 border-none rounded-md ml-12 hover:animate-pulse"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              {messagesReceived.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
