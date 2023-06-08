import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_LOBBIES } from '../../utils/queries';



const LobbyList = () => {
    var { error, loading, data } = useQuery(QUERY_LOBBIES)
    console.log(data)
    if (!data) {
        return <h3>No active debates.</h3>;
    }
    console.log(data.lobbies)

    return (
        <div id="Lobby">
            <h3 className="text-primary">LOBBIES</h3>
            <div className="flex-row justify-space-between my-4">
                {console.log(data.lobbies)}
                {data.lobbies &&
                    data.lobbies.map((lobby) => {
                        return <div className="card mb-3" key={lobby._id}>
                            <Link
                                className=""
                                to={`/lobby/${lobby._id}`}>
                            <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">{lobby.topic}</h4>
                            <h4>{lobby.host}</h4>
                            <h4>{lobby.createdAt}</h4>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    )

}



export default LobbyList;