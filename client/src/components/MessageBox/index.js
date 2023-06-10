import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';

const MessageBox = ({ socket, lobby, author, chatHistory }) => {
    const isHost = () => { return author === lobby.host }
    const lobbyId = lobby._id;
    console.log(lobby)
    let staff = [...lobby.teamA, ...lobby.teamB, ...lobby.admin];
    console.log(staff)
    const role = lobby.teamA.includes(author)
        ? 'teamA'
        : lobby.teamB.includes(author)
            ? 'teamB'
            : isHost() ? 'host' : 'viewer';
    console.log(role)
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [addMessage, { error }] = useMutation(SEND_MESSAGE);
    const [showEmojis, setShowEmojis] = useState(false);
    const lastElement = document.getElementById('lastElement')
    const emojis = ['😀', '😄', '😊', '👍', '👋', '❤️', '🖕', '🤣', '✅', '☠️', '🤩'];

    const sendMessage = async () => {
        const data = {
            lobby: lobbyId,
            author: author,
            role: role,
            contents: currentMessage,
        };
        try {
            const newMessage = await addMessage({ variables: data });
            console.log(newMessage)
            await socket.emit('client_message', newMessage.data.sendMessage);
            setMessageList((list) => [...list, newMessage.data.sendMessage]);
            try {
                lastElement.scrollIntoView({ behavior: 'smooth' })
            } catch {
                console.log('nah bro')
            }
        } catch (err) {
            console.error(err);
        }
        setMessage('');
        setShowEmojis(false);
    };



    const handleEmojiClick = (emoji) => {
        setCurrentMessage((prevMessage) => prevMessage + emoji);
    };

    useEffect(() => {
        const receiveMessage = (data) => {
            console.log(data)
            setMessageList((list) => [...list, data]);
            try {
                lastElement.scrollIntoView({ behavior: 'smooth' })
            } catch {
                console.log('nah bro')
            }
        };
        socket.on('server_message', receiveMessage);
        return () => {
            socket.off('server_message', receiveMessage);
        };
    }, [socket]);

    const messageRole = {
        teamB: 'teamB mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-t-lg rounded-bl-lg text-white',
        teamA: 'teamA mt-4 ml-2 py-3 px-4 bg-green-400 rounded-t-lg rounded-br-lg text-white',
        admin: 'host items-center mx-2 my-2 py-3 px-4 min-w-min max-w-max bg-gray-400 rounded-lg',
        host: 'host items-center mx-2 my-2 py-3 px-4 min-w-min max-w-max bg-gray-400 rounded-lg'
    }

    const dateConversion = (timestamp) => {
        console.log(timestamp)
        const newTime = new Date(parseInt(timestamp)).toTimeString().split(' ')
        console.log(newTime)
        return newTime[0]
    }

    return (
        <div className="messages w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5 max-h-vw">
                <div className=" flex flex-col mb-4 overflow-y-scroll">
                    {chatHistory && chatHistory.messages.map((message) => {
                        return (
                            <div className={messageRole[message.role]} key={message._id}>
                                <h4 className='text-center text-black font-lora text-xl font-semibold'>{message.author}</h4>
                                <p className={'text-center text-white'}>{message.contents}</p>
                                <h6 className='text-center text-xs text-gray-800 mt-2'>Sent: {dateConversion(message.timestamp)}</h6>


                            </div>
                        )
                    })}
                    {messageList && messageList.map((message) => {
                        return (
                            <div className={messageRole[message.role]} key={message._id}>
                                <h4 className='text-center font-lora text-xl font-semibold'>{message.author}</h4>
                                <p className={'text-center text-white'}>{message.contents}</p>
                                <h6 className='text-center text-xs text-gray-800 mt-2'>Sent: {dateConversion(message.timestamp)}</h6>
                            </div>
                        )
                    })}
                    <div id='lastElement'> </div>
                </div>
            </div>
            <div className="py-5 flex">
                <div className="relative w-full">
                    <input
                        className="w-full bg-gray-300 py-5 px-3 rounded-xl pr-12"
                        type="text"
                        placeholder="Message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                    />
                    <button
                        className=" absolute right-0 top-0 bottom-0 bg-gray-300 text-gray-700 px-4 py-2 border-none rounded-md ml-3 "
                        onClick={() => setShowEmojis(!showEmojis)}
                    >
                        😀
                    </button>

                </div>
                {showEmojis && (
                    <div className="emoji-button cursor-pointer">
                        {emojis.map((emoji) => (
                            <span
                                key={emoji}
                                className="emoji"
                                onClick={() => handleEmojiClick(emoji)}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>
                )}
                <button
                    className="bg-gradient-to-br from-zinc-600 text- to-cyan-300 text-black px-4 py-2 mr-5 border-none rounded-md ml-3 hover:animate-pulse"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div >
    );
};

export default MessageBox;
