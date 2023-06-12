import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { QUERY_MESSAGES } from '../utils/queries';
import MessageBox from '../components/MessageBox'
import ManageLobby from '../components/ManageLobby';
import LobbyRules from '../components/LobbyRules'

import Auth from '../utils/auth';


const Debate = () => {
    const lobby = useLocation().state.lobby;
    console.log(lobby)
    const lobbyId = lobby._id
    const check = false;
    const [lobbyInfo, setLobbyInfo] = useState({lobby})
    console.log(Auth.getProfile())
    const [viewers, setViewers] = useState([]);

    
    const socket = io('http://localhost:3001');
    const joinLobby = () => {
        const data = {
            user:Auth.getProfile().data,
            lobby:lobbyId
        }
        console.log(data)
        socket.emit('join_lobby', data)
        socket.on('viewers', setViewers)
        console.log(`user joined ${lobby._id}`)
        return () => {
            socket.off('viewers', setViewers)
        }
    };
    joinLobby();
    const receiveViewerUpdate = (data) => {
        console.log(data)
    }
    socket.on('user_join', receiveViewerUpdate)
    //author info
    const author = Auth.getProfile().data.name;
    console.log(author);
    console.log(lobby);
    const isHost = () => { return author === lobby.host }
    
    //lobby info to render page/components
    const [staff, setStaff] = useState({ teamA: lobby.teamA, teamB: lobby.teamB, admin: lobby.admin })
    const receiveStaffUpdate = (data) => {
        console.log(staff)
        setStaff(data.update)
        console.log(staff)
        return () => {socket.off('staff_event', receiveStaffUpdate)}
    }
    socket.on('staff_event', receiveStaffUpdate)



    //timer states
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(0);
    useEffect(() => {
        let interval = null;
        if (timerRunning) {
            console.log('ye')
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
    //time controls, events, socket on
    const timerControls = {
        start: () => { return setTimerRunning(true); },
        pause: () => { return setTimerRunning(false); },
        stop: () => {
            setTimerRunning(false);
            setTimerSeconds(0)
            return
        }
    };
    const timerEvent = (event) => {
        const data = { event: event.target.id, lobby: lobbyId }
        console.log(data)
        socket.emit('timer_event', data)
    };
    const receiveTimer = (data) => {
        console.log(data)
        timerControls[data]()
        return () => { socket.off('timer_event', receiveTimer) }
    };
    socket.on('timer_event', receiveTimer)
    const chatData = useQuery(QUERY_MESSAGES, { variables: { lobby: lobbyId } })


    return (
        <div id="main" className='flex'>
            <div className='viewers w-1/5 text-center' id="viewer-container">
                {isHost() ? (
                    <>
                        <ManageLobby
                            socket={socket}
                            lobby={lobbyInfo}
                            setStaff={setStaff}
                        />
                        <LobbyRules 
                            socket={socket}
                            lobby={lobbyInfo}
                            setStaff={setStaff}
                        />
                    </>
                ) : (<p>B</p>)}
                <div className='font-semibold'>Viewers:</div>
                <div>
                {viewers && viewers.map((viewer) => {
                    return (<p>{viewer}</p>)
                })}
                </div>
            </div>
            <div className='w-4/5' id="content-container">
                <div className='bg-gradient-to-br from-black to-sky-400 pb-2'>
                    <div className="border-2 border-black flex justify-evenly items-center">
                        <div className="user text-white font-semibold">User 1</div>
                        <div className="timer text-white">
                            <p className='text-center font-semibold'>Timer:</p>
                            <span>{formatTime(timerSeconds)}</span>
                        </div>
                        <div className="user text-white font-semibold">User 2</div>
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
                <div id="info-container" class="flex-col flex items-center rounded-xl overflow-hidden mt-4 mr-4 bg-slate-400 shadow-lg shadow-black">
                    <h2 className='text-center'>Lobby topic:</h2>
                    <h2 className='px-2 text-xl font-medium'>{lobby.topic}</h2>
                    <h2 className='text-center'>Lobby host: {lobby.host}</h2>
                </div>
                <div className="content">
                    <MessageBox
                        socket={socket}
                        lobby={lobby}
                        author={author}
                        staff={staff}
                        chatData={chatData.data}
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
