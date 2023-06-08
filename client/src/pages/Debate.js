import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Navigate, useParams } from 'react-router-dom';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';
import Footer from '../components/Footer';


const socket = io('http://localhost:3001'); // Replace with your server URL



const Debate = () => {

    const { lobbyId } = useParams();

    const [lobby, setLobby ] = useState('');
    const [message, setMessage ] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    

    const joinLobby = () => {
        if (lobby !== '') {
          socket.emit('join_lobby', lobby);
        };
    };

    const sendMessage = () => {
        socket.emit('client_message', message);
        setMessage('');
    };

    useEffect(() => {
        const receiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
          };
          socket.on('receive_message', receiveMessage);
          return () => {
            socket.off('receive_message', receiveMessage);
          };
    }, [socket]);

    return (

        <div id="main" className='border-2 border-black flex'>
            <div className='viewers w-1/5 border-2 border-black'>Viewers</div>
            <div className='w-4/5'>
                <div className=''>
                    <div className='flex justify-center'>
                        <button className='border-2 border-black'>Start</button>
                        <button className='border-2 border-black mx-5'>Pause</button>
                        <button className='border-2 border-black'>Stop</button>
                    </div>
                    <div className="header border-2 border-black flex justify-evenly items-center">
                        <div className="user border-2 border-black">User 1</div>
                        <div className="timer border-2 border-black">
                            <p className=''>Timer</p>
                            <span>00:00:00</span>
                        </div>
                        <div class="user border-2 border-black">User 2</div>
                    </div>
                </div>

                <div className="content border-2 border-black h-96">
                    <h2>Hello</h2>

                    <div className="messages">
                        {messageList.map((messageContent) => {
                            return (
                                <div>
                                    <h3>{messageContent.message}</h3>
                                    <span>{messageContent.time} </span>
                                    <span>Debator One {messageContent.username}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                    
                        <div>
                        <input type='text' placeholder='Message...' onChange={(e) => setCurrentMessage(e.target.value)} />
                        <button onClick={sendMessage}>Send Message</button>
                        </div>
                    {/* {username === admin || username === debatorOne || username === debatorTwo ? (    
                    ) : (
                        <h3>Viewing Only</h3>
                    )} */}
                    </div>
                </div>
            </div>
            </div>
    )
};

export default Debate;