
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_STAFF } from '../../utils/mutations';


const ManageLobby = ({socket, lobby, setStaff}) => {
    const lobbyId = lobby._id
    const [addA, setAddA] = useState('');
    const [addB, setAddB] = useState('');
    const [display, setDisplay] = useState('none');
    const [addStaff, { error }] = useMutation(ADD_STAFF)

    const handleStaffSubmit = async (event) => {
        const getObject = {
            teamA: addA,
            teamB: addB
        }
        event.preventDefault();
        const role = event.target[1].id
        const user = getObject[role]
        console.log(lobbyId, role, user)
        try {
            console.log(lobbyId, role, user)
            const newLobby = await addStaff(
                { variables: { lobby: lobbyId, role: role, user: user } }
            );
            console.log(newLobby)
            const newTeam = newLobby.data.addStaff
            const newStaff = {teamA: newTeam.teamA, teamB: newTeam.teamB, admin: newTeam.admin}
            setStaff(newStaff)
            const data = {lobby: lobbyId, update: newStaff}
            socket.emit('staff_event', data)
            return {teamA: newTeam.teamA, teamB: newTeam.teamB, admin: newTeam.admin}
        } catch (err) {
            console.error(err)
        };
    };

    const displayToggle = () => {
        setDisplay((prevDisplay) => (prevDisplay === 'flex' ? 'none' : 'flex'));
    };

    return (
        <div>
            <div className="flex flex-col absolute left-10 bg-slate-900 text-white px-3 pb-3 pt-1 rounded-b-3xl shadow-md shadow-black hover:z-10 hover:text-xl hover:font-medium" 
                onClick={displayToggle}
                style={{ cursor: 'pointer' }}>
                <button className=''>Lobby Controls</button>
            </div>
            <div className="flex flex-col absolute left-10 z-10 bg-slate-900 text-white px-3 pb-3 pt-1 rounded-b-3xl w-96 shadow-md shadow-black" 
                style={{ display }} 
                id="managelobby">
                <button className='self-end text-sm underline' onClick={displayToggle}>Close</button>
                <h2 className='text-2xl font-medium pb-2'>Lobby Control</h2>
                <form id="teamA-form" className="flex-col items-center mt-5"
                    onSubmit={handleStaffSubmit}>
                    <p>Team A:</p>
                    <div className='flex justify-between h-fit my-2'>
                        <input className='p-2 placeholder-black w-2/3 text-black'
                            placeholder="Username..."
                            name="teamA"
                            type="staff"
                            onChange={(event) => setAddA(event.target.value)} />
                        <button
                            className="bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 border-none rounded-md hover:animate-pulse"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                            id="teamA"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <form id="teamB-form" className="flex-col items-center"
                    onSubmit={handleStaffSubmit}>
                    <p>Team B:</p>
                    <div className='flex justify-between h-fit my-2'>
                        <input className='p-2 placeholder-black w-2/3 text-black'
                            placeholder="username"
                            name="teamB"
                            type="staff"
                            onChange={(event) => setAddB(event.target.value)} />
                        <button
                            className="bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 border-none rounded-md hover:animate-pulse"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                            id="teamB"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManageLobby;