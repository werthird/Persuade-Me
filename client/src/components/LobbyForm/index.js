import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_LOBBY } from '../../utils/mutations';

import Auth from '../../utils/auth';

const LobbyForm = ({}) => {
    const [topic, setTopic] = useState('')
    const [addLobby, { error }] = useMutation(ADD_LOBBY);
    const profileID = Auth.getProfile().data.name

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        console.log(profileID)
        try{
            const data = await addLobby(
            {variables : {host:profileID,topic: topic}}
        );
            console.log(data)
            setTopic('');
        }catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
        { Auth.loggedIn() ? (
        <form
        className = "flex-col items-center"
        onSubmit = {handleFormSubmit}>
        <div>Topic:</div>
            <input placeholder="Your topic"
                  name="topic"
                  type="topic"
                  onChange={(event) => setTopic(event.target.value)}
                />
                <button
                  className=" mb-4 bg-gradient-to-br from-zinc-600 text- to-cyan-300 px-4 py-2 mt-4 border-none rounded-md ml-12 hover:animate-pulse"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
        </form>
        
        ):(
            <p>
          You need to be logged in to create a Lobby. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
        )}
        </div>
    )
}

export default LobbyForm;