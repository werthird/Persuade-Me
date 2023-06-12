
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_STAFF } from '../../utils/mutations';


const ManageLobby = ({socket, lobby, setStaff, topic}) => {
    console.log(lobby)
    const lobbyId = lobby._id
    const lobbyTopic = lobby.lobby.topic
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
        setDisplay((prevDisplay) => (prevDisplay === 'none' ? 'flex' : 'none'));
    };

    const roundCounter = (increase) => {
      const roundCounterElement = document.getElementById('roundCounter');
      let number = parseInt(roundCounterElement.innerHTML);
      
      if (increase) {
        number += 1;
      } else {
        number -= 1;
        if (number < 1) {
          number = 1;
        }
      }
      
      roundCounterElement.innerHTML = number;
    };

    return (
        <div>
            <div className="flex flex-col absolute left-36 bg-slate-700 text-white px-3 pb-3 pt-1 rounded-b-3xl shadow-md shadow-black hover:z-10 hover:text-xl hover:font-medium ease-in" 
                onClick={displayToggle}
                style={{ cursor: 'pointer' }}>
                <button className=''>Lobby Rules</button>
            </div>
            <div className="flex flex-col items-start absolute left-32 z-10 bg-slate-700 text-white px-3 pb-3 pt-1 rounded-b-3xl w-96 shadow-md shadow-black" 
              style={{ display }} 
              id="lobbyRules" >
                <button className='self-end text-sm underline ' onClick={displayToggle}>Close</button>
                <h2 className='self-center text-2xl font-medium pb-2'>Lobby Rules</h2>

                <div className='flex justify-between w-full mt-5'>
                  <span className=''>Debate topic:</span>
                  <span className='text-lg font-medium'>{lobbyTopic}</span>
                </div>
                
                <div className='flex justify-between w-full'>
                  <span className=''>Number of Rounds:</span>
                  <span className='text-xl font-medium'>
                    <span className='text-2xl hover:text-yellow-200' 
                      onClick={() => roundCounter(false)} 
                      style={{ cursor: 'pointer' }}>&lt; &nbsp;</span> 
                    <span id='roundCounter'>3</span>
                    <span className='text-2xl hover:text-yellow-200' 
                      onClick={() => roundCounter(true)} 
                      style={{ cursor: 'pointer' }}>&nbsp; &gt;</span>
                  </span>
                </div>

                <div className='flex justify-between w-full'>
                  <span className=''>Round Length:</span>
                  <span className='text-xl font-medium'>15:00</span>
                </div>

                <form id="roundA-form" className="flex justify-between items-center w-full mt-5 mb-2"
                    onSubmit={handleStaffSubmit}>
                    <p>Round A:</p>
                    <input className='p-1 placeholder-black w-2/3 text-black'
                        placeholder="Topic..."
                        name="roundA"
                        type="staff"
                        onChange={(event) => setAddA(event.target.value)}
                      />
                </form>

                <form id="roundB-form" className="flex justify-between items-center w-full mb-2"
                    onSubmit={handleStaffSubmit}>
                    <p>Round B:</p>
                    <input className='p-1 placeholder-black w-2/3 text-black'
                        placeholder="Topic..."
                        name="roundB"
                        type="staff"
                        onChange={(event) => setAddA(event.target.value)}
                      />
                </form>

                <form id="roundC-form" className="flex justify-between items-center w-full mb-2"
                    onSubmit={handleStaffSubmit}>
                    <p>Round C:</p>
                    <input className='p-1 placeholder-black w-2/3 text-black'
                        placeholder="Topic..."
                        name="roundC"
                        type="staff"
                        onChange={(event) => setAddA(event.target.value)}
                      />
                </form>
            </div>
        </div>
    )
}

export default ManageLobby;