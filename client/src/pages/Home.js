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
              {/* <ProfileList
                profiles={profiles}
                title="Here's the current roster of friends..."
              /> */}
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
