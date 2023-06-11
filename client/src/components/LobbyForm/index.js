import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_LOBBY } from '../../utils/mutations';

import Auth from '../../utils/auth';

const LobbyForm = ({}) => {
    const [topic, setTopic] = useState('')
    const [addLobby, { error }] = useMutation(ADD_LOBBY);
    const profileID = Auth.getProfile().data.name;
    console.log(Auth.getProfile().data)

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        console.log(profileID);
        try{
            const data = await addLobby( {variables : {host:profileID,topic: topic}} );
            console.log(data)
            setTopic('');
        }catch (err) {
            console.error(err);
        }
    };
    return (
        <div className='w-full flex justify-center'>
          { Auth.loggedIn() ? (
            <form className = "h-40 w-1/2 mb-10 pbackground rounded-3xl shadow-xl shadow-black">
              <div className='w-full h-full flex flex-col justify-evenly items-center rounded-3xl shadow-inner shadow-white'>
                <p className='text-center text-2xl font-bold'>Create A New Debate Room</p>
                <div className='flex justify-center h-fit w-full'>
                  <input 
                    className='h-full w-3/4 bg-black px-2 text-white placeholder-white'
                    placeholder="Your Debate Topic..."
                    name="topic"
                    type="topic"
                    onChange={(event) => { 
                        setTopic(event.target.value)
                        console.log(topic)
                      }
                    }
                  />
                  <button
                    className="bg-white font-medium shadow-inner shadow-black px-4 py-2 border-none hover:animate-pulse"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                    onClick={handleFormSubmit}
                  >
                    Submit
                    {/* <Link className=""
                      to={{ pathname: `/lobby/${lobby._id}` }}
                      state= {data} >
                        
                    </Link> */}
                  </button>
                </div>
              </div>
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