import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { QUERY_MESSAGES } from '../utils/queries';
import MessageBox from '../components/MessageBox'

import Auth from '../utils/auth';

const Debate = () => {
    //author info
    const author = Auth.getProfile().data.name;
    //lobby info to render page/components
    const lobby = useLocation().state.lobby;
    const lobbyId = lobby._id
    //socket, join lobby.
    const socket = io('http://localhost:3001');
    const joinLobby = () => {
        socket.emit('join_lobby', `${lobbyId}`)
        console.log(`user joined ${lobbyId}`)
    };
    joinLobby();

    //timer states
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(0);
    //time controls, events, socket on
    const timerControls = {
        start: () => { return setTimerRunning(true); },
        pause: () => { return setTimerRunning(false); },
        stop: () => {
            setTimerRunning(false);
            setTimerSeconds(0)
            return
        }
    }
    const timerEvent = (event) => {
        const data = { event: event.target.id, lobby: lobbyId }
        console.log(data)
        socket.emit('timer_event', data)
    };
    const receiveTimer = (data) => {
        console.log(data)
        timerControls[data]()
        return () => { socket.off('timer_event', receiveTimer) }
    }
    //listening from server for a timer_event to call.
    socket.on('timer_event', receiveTimer)

    useEffect(() => {
        let interval = null;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimerSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [timerRunning]);


    console.log(lobbyId)
    const { err, loading, data } = useQuery(QUERY_MESSAGES, { variables: { lobby: lobbyId } })
    console.log(data)

    return (
        <div id="main" className='flex'>
            <div className='viewers w-1/5 border-2 border-black text-center pt-4' id="viewer-container">
                <div>Viewers:</div>
            </div>
            <div className='w-4/5' id="content-container">
                <div className='bg-gradient-to-br from-black to-sky-400 pb-2'>
                    <div className="border-2 border-black flex justify-evenly items-center">
                        <div className="user text-white">User 1</div>
                        <div className="timer text-white">
                            <p className='text-center'>Timer:</p>
                            <span>{formatTime(timerSeconds)}</span>
                        </div>
                        <div className="user text-white">User 2</div>
                    </div>
                    <div className='flex justify-center pt-2'>
                        <button
                            className='bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse'
                            id='start'
                            onClick={timerEvent}>Start</button>
                        <button className='bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse'
                            id='pause'
                            onClick={timerEvent}>Pause</button>
                        <button className='bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-12 hover:animate-pulse'
                            id='stop'
                            onClick={timerEvent}>Stop</button>
                    </div>
                </div>
                <div id="info-container">
                    <h2 className='pl-4 pt-4 text-center'>Hello, you are in lobby ID: {lobbyId}</h2>
                    <h2 className='pl-4 text-center'>Lobby topic: {lobby.topic}</h2>
                    <h2 className='pl-4 text-center'>Lobby host: {lobby.host}</h2>
                </div>
                <div className="content">
                    <MessageBox
                        socket={socket}
                        lobby={lobby}
                        author={author}
                        chatHistory={data}
                    />
                </div>
            </div>
        </div>
    )
};
const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default Debate;
