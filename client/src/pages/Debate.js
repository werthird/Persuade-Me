import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { QUERY_MESSAGES } from '../utils/queries';
import { ADD_STAFF } from '../utils/mutations';
import MessageBox from '../components/MessageBox'

import Auth from '../utils/auth';

const Debate = () => {
    //author info
    const author = Auth.getProfile().data.name;
    //lobby info to render page/components
    const lobby = useLocation().state.lobby;
    console.log(lobby)
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

    let { err, loading, data } = useQuery(QUERY_MESSAGES, { variables: { lobby: lobbyId } })

    //staff forms
    const [teamA, setStaffA] = useState('');
    const [teamB, setStaffB] = useState('');
    const [addStaff, { error }] = useMutation(ADD_STAFF);

    const handleStaffSubmit = async (event) => {
        const teamObject = {
            teamA: teamA,
            teamB: teamB
        }
        event.preventDefault();
        console.log(event)
        console.log(event.target[1].id)
        const role = event.target[1].id
        const user = teamObject[role]

        try {
            const newLobby = await addStaff(
                { variables: { lobby: lobbyId, role: role, user: user } }
            );
            data = newLobby
        } catch (err) {
            console.error(err)
        }

    }
    const isHost = () => { return author === lobby.host }
    return (
            <div id="main" className='flex'>
                <div className='viewers w-1/5 border-2 border-slate-300 text-center pt-4' id="viewer-container">
                    <div className='font-semibold'>Viewers:</div>
                    {isHost() ? (
                        <div>
                            <form className="flex-col items-center"
                                onSubmit={handleStaffSubmit}>
                                <div>Team A:</div>
                                <input placeholder="username"
                                    name="teamA"
                                    type="staff"
                                    onChange={(event) => setStaffA(event.target.value)} />
                                <button
                                    className="mb-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 mt-4 border-none rounded-md ml-12 hover:animate-pulse"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                    id="teamA"
                                >
                                    Submit
                                </button>
                            </form>
                            <form className="flex-col items-center"
                                onSubmit={handleStaffSubmit}>
                                <div>Team B:</div>
                                <input placeholder="username"
                                    name="teamB"
                                    type="staff"
                                    onChange={(event) => setStaffB(event.target.value)} />
                                <button
                                    className="mb-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 mt-4 border-none rounded-md ml-12 hover:animate-pulse"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                    id="teamB"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>) : (<p>B</p>)}
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
