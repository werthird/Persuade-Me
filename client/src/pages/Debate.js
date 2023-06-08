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
                        <div class="user border-2 border-black">User 2</div>
                    </div>
                </div>

                <div className="content border-2 border-black h-96">
                    <h2 className='pl-4'>Hello</h2>

                    <div className="messages w-full px-5 flex flex-col justify-between">
                        <div class="flex flex-col mt-5">
                            <div class="flex justify-end mb-4">
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
                    </div>
                    </div>
                        <div className='py-5 flex mt-52'>
                        <input className='w-full bg-gray-300 py-5 px-3 rounded-xl' type='text' placeholder='Message...' onChange={(e) => setCurrentMessage(e.target.value)} />
                        <button className='bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse' onClick={sendMessage}>Send Message</button>
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