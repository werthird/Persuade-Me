import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';

const MessageBox = ({ socket, lobby, author, chatHistory }) => {
    const lobbyId = lobby._id
    console.log(typeof (lobbyId))
    let staff = [...lobby.teamA, ...lobby.teamB, ...lobby.admin]
    const role = lobby.teamA.includes(author) ? 'teamA' : lobby.teamB.includes(author) ? 'teamB' : 'admin';
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [addMessage, { error }] = useMutation(SEND_MESSAGE);
  
    const lastElement = document.getElementById('lastElement');
    // useEffect(() => {
    //     const receiveMessage = (data) => {
    //         console.log(data)
    //         setMessageList((list) => [...list, data])
    //     }
    //     receiveMessage(chatHistory);
    // }, [])

    const sendMessage = async () => {
        const data = {
            lobby: lobbyId,
            author: author,
            role: role,
            contents: currentMessage
        };
        try {
            const newMessage = await addMessage({ variables: data });
            console.log(newMessage)
            await socket.emit('client_message', newMessage.data.sendMessage);
            setMessageList((list) => [...list, newMessage.data.sendMessage]);
            try{
            lastElement.scrollIntoView({behavior:'smooth'})
            }catch{
                console.log('nah bro')
            }
        } catch (err) {
            console.error(err);
        }
        setMessage('');

    };

    useEffect(() => {
        const receiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
            try{
                lastElement.scrollIntoView({behavior:'smooth'})
                }catch{
                    console.log('nah bro')
                }
        };
        socket.on('server_message', receiveMessage);
        return () => {
            socket.off('server_message', receiveMessage);
        };
    }, [socket]);

    return (
        <div className="messages w-full px-5 flex flex-col justify-between ">
            <div className="flex flex-col mt-5 max-h-vw">
                <div className=" flex flex-col mb-4 overflow-y-scroll">
                    {chatHistory && chatHistory.messages.map((message) => {
                        return (
                            <div className={message.role} key={message._id}>
                                <p className='mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>{message.contents}</p>
                                <h6 className='text text-center text-xs text-gray-400'>{message.timestamp}</h6>
                                <h4 className='text-center ml-32 font-lora text-xl font-semibold'>{message.author}</h4>
                            </div>
                        )
                    })}
                    {messageList && messageList.map((message) => {
                        return (
                            <div className={message.role} key={message._id}>
                                <p className='mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>{message.contents}</p>
                                <h6 className='text text-center text-xs text-gray-400'>Sent:  {message.timestamp}</h6>
                                <h4 className='text-center ml-32 font-lora text-xl font-semibold'>{message.author}</h4>
                            </div>
                        )
                    })}
                    <div id='lastElement'> </div>
                </div>
                <div>
                </div>
            </div>
            <div className='py-5 flex'>
                <input
                    className='w-full bg-gray-300 py-5 px-3 rounded-xl'
                    type='text'
                    placeholder='Message...'
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button
                    className=' bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-3 hover:animate-pulse'
                    onClick={sendMessage}
                >Send</button>
            </div>
            {/* {username === admin || username === debatorOne || username === debatorTwo ? (    
                    ) : (
                        <h3>Viewing Only</h3>
                    )} */}
        </div>
    )
}

export default MessageBox;