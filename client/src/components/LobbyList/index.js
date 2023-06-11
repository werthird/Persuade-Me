import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_LOBBIES } from '../../utils/queries';
import Auth from '../../utils/auth';


const dateConversion = (timestamp) => {
    const newTime = new Date(parseInt(timestamp)).toTimeString().split(' ');
    const newFormat = newTime[0].split(':');
    const hr = newFormat[0] <= 12 && newFormat[0] > 0 ? newFormat[0] : newFormat[0] > 12 ? (parseInt(newTime[0])-12).toString() : '12';
    const xM = newFormat[0] >= 12 ? ' PM' : ' AM';
    return `${hr}:${newFormat[1]}${xM}`;
};



const LobbyList = () => {

    const profileID = Auth.getProfile().data.name

    let { error, loading, data } = useQuery(QUERY_LOBBIES);
    if (!data) {
        return <h3>No active debates.</h3>;
    }

    return (
        <div id="Lobby" className="w-full">
            <h3 className="text-center text-4xl font-bold mb-5">Active Lobbies</h3>
            <div className="flex flex-row flex-wrap justify-evenly">
                {console.log(data.lobbies)}
                {data.lobbies &&
                    data.lobbies.map((lobby) => {
                        const data = { lobby }
                        return (
                            <div className="h-40 w-[30%] mb-5 rounded-2xl relative" key={lobby._id}>
                                <Link className=""
                                    to={{ pathname: `/lobby/${lobby._id}` }}
                                    state= {data} >
                                    <div className="opacity-80 absolute inset-0 rounded-2xl shadow-lg shadow-black"></div>    
                                    <p className='h-1/4 text-center p-2 bg-black text-white text-xl font-medium rounded-t-2xl shadow-inner shadow-gray-400'>{lobby.topic}</p>
                                    <div className="flex flex-col place-content-end h-3/4 text-white p-2 pb-5">
                                        <p className="flex justify-between mx-5"><b>Created By:</b> <span className="capitalize">{lobby.host}</span></p>
                                        <p className="flex justify-between mx-5"><b>Created At:</b> <span className="capitalize">{dateConversion(lobby.createdAt)}</span></p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}



export default LobbyList;