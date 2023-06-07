import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';
import Footer from '../components/Footer';


const [message, setMessage] = useState('');
const [messagesReceived, setMessagesReceived] = useState([]);

const socket = io('http://localhost:3001'); // Replace with your server URL

const sendMessage = () => {
    socket.emit('message_from_client', message);
    setMessage('');
};

useEffect(() => {
    socket.on('message_from_server', (data) => {
        setMessagesReceived(data);
    });
}, [socket]);

return (
    <div id="main">
        <div class="header">
            <h1>Debate Page</h1>
            <div class="timer">00:00:00</div>
            <div class="users">
                <div class="user">User 1</div>
                <div class="user">User 2</div>
            </div>
        </div>

        <div class="content">
            <div class="container">

            </div>
        </div>

        <div class="content" id="container1">
            <div class=" container large-container">
                <h2>Container 1</h2>
                <p>Content of container 1 goes here.</p>
            </div>

            <div class="container large-container" id="container2">
                <h2>Container 2</h2>
                <p>Content of container 2 goes here.</p>
            </div>
        </div>
        </div>
)
