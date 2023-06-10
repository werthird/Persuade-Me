
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_STAFF } from '../../utils/mutations';


const ManageLobby = ({socket, lobby, setStaff}) => {
    const lobbyId = lobby._id
    const [addA, setAddA] = useState('');
    const [addB, setAddB] = useState('');
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
        }

    }

    return (
        <div className="flex" id="managelobby">
            <div id="manageStaff">
                <form id="teamA-form" className="flex-col items-center"
                    onSubmit={handleStaffSubmit}>
                    <div>Team A:</div>
                    <input placeholder="username"
                        name="teamA"
                        type="staff"
                        onChange={(event) => setAddA(event.target.value)} />
                    <button
                        className="mb-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 mt-4 border-none rounded-md ml-12 hover:animate-pulse"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                        id="teamA"
                    >
                        Submit
                    </button>
                </form>
                <form id="teamB-form" className="flex-col items-center"
                    onSubmit={handleStaffSubmit}>
                    <div>Team B:</div>
                    <input placeholder="username"
                        name="teamB"
                        type="staff"
                        onChange={(event) => setAddB(event.target.value)} />
                    <button
                        className="mb-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 mt-4 border-none rounded-md ml-12 hover:animate-pulse"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                        id="teamB"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ManageLobby;