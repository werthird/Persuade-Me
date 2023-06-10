import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_LOBBIES } from '../../utils/queries';



const LobbyList = () => {

    let { error, loading, data } = useQuery(QUERY_LOBBIES)
    console.log(data)
    if (!data) {
        return <h3>No active debates.</h3>;
    }
    console.log(data.lobbies)

    return (
        <div id="Lobby" className="w-full">
            <h3 className="text-center text-4xl font-bold mb-5">Active Lobbies</h3>
            <div className="flex flex-row flex-wrap justify-evenly border-2 border-black">
                {console.log(data.lobbies)}
                {data.lobbies &&
                    data.lobbies.map((lobby) => {
                        const data = { lobby }
                        return (
                            <div className="h-40 bg-black rounded-2xl opacity-40 blur-sm" key={lobby._id}>
                                <Link className=""
                                    to={{ pathname: `/lobby/${lobby._id}` }}
                                    state= {data} >
                                    <p className='h-1/4 text-center p-2 bg-black text-white font-medium rounded-t-lg border border-black'>{lobby.topic}</p>
                                    <div className="h-3/4 text-white p-2 opacity-100">
                                        <p className="text-opacity-100"><b>Created By:</b> {lobby.host}</p>
                                        <p><b>Lobby ID:</b> {lobby._id}</p>  
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