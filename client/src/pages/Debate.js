import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';
import Footer from '../components/Footer';




const Debate = () => {
    const lobby = useLocation().state;
    console.log(lobby);

    const socket = io('http://localhost:3001'); // Replace with your server URL

    const { lobbyId } = useParams();


    const [message, setMessage ] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const joinLobby = () => {
        socket.emit('join_lobby', `${lobbyId}`)
        console.log(`user joined ${lobbyId}`)
    };
    joinLobby();

    const sendMessage = () => {
        socket.emit('client_message', currentMessage);
        setMessage('');
    };

    useEffect(() => {
        const receiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
          };
          socket.on('server_message', receiveMessage);
          return () => {
            socket.off('server_message', receiveMessage);
          };
    }, [socket]);

    return (
        <div id="main" className='border-2 border-black flex'>
            <div className='viewers w-1/5 border-2 border-black text-center pt-4'>Viewers:</div>
            <div className='w-4/5'>
                <div className=''>
                    <div className='flex justify-center'>
                        <button className='bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse'>Start</button>
                        <button className='bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse'>Pause</button>
                        <button className='bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse'>Stop</button>
                    </div>
                    <div className="header border-2 border-black flex justify-evenly items-center">
                        <div className="user border-2 border-black">User 1</div>
                        <div className="timer border-2 border-black">
                            <p className=''>Timer</p>
                            <span>00:00:00</span>
                        </div>
                        <div className="user border-2 border-black">User 2</div>
                    </div>
                </div>

                <div className="content border-2 border-black h-96">
                    <h2 className='pl-4'>Hello, you are in lobby ID: {lobbyId}</h2>
                    <h2 className='pl-4'>Lobby topic: {lobby.topic}</h2>
                    <h2 className='pl-4'>Lobby host: {lobby.host}</h2>

                    <div className="messages w-full px-5 flex flex-col justify-between">
                        <div className="flex flex-col mt-5">
                            <div className="flex flex-col justify-end mb-4 border-2 border-black">
                                {messageList.map((messageContent) => {
                                    return (
                                        <p key={uuidv4()}>{messageContent}</p>
                                    )
                                })}
                            </div>
                        <div>
                    </div>
                    </div>
                        <div className='py-5 flex mt-52'>
                        <input 
                            className='w-full bg-gray-300 py-5 px-3 rounded-xl' 
                            type='text' 
                            placeholder='Message...' 
                            onChange={(e) => setCurrentMessage(e.target.value)} 
                        />
                        <button 
                            className='bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse' 
                            onClick={sendMessage}
                        >Send Message</button>
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