import React, { useEffect, useState } from 'react';
import './MessageChat.css';
import {Avatar} from "@material-ui/core";
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ImageIcon from '@material-ui/icons/Image';
import { useStateValue } from './StateProvider';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import firebase from 'firebase';



function MessageChat()
{
    const { roomsId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [{ user }, dispatch] = useStateValue();
    const sendMessage =async (e) =>
    {
        e.preventDefault();
        console.log("you typed>>>", input);
        await db.collection('users').doc(roomsId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // received: true,
        });
        setInput('');

    };
    useEffect(() =>
    {
        if (roomsId)
        {
            db.collection('users').doc(roomsId)
                .onSnapshot(snapshot => {
                    console.log("jj"+snapshot);

            setRoomName(snapshot.data().name);
                });
            db.collection('users').doc(roomsId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [roomsId]);
    console.log("kk" + roomsId);
    
    // const sendMessage=

    return (
        <div className="messageChat">
           
            {/* <h1>Your Messages</h1>
            <h2>Send private photos and messages to a friend or group</h2> */}
            <div className="messageChat__header">
            <Avatar src="https://avatars.dicebear.com/api/human/123.svg"/>
                <div className="messageChat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at...
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}

                    </p>
                </div>
                <div className="chat__headerRight">
                <InfoTwoToneIcon/>
                </div>
            </div>
            <div className="messageChat__body">
            {messages.map(( message ) =>
                (
                    <p className={`messageChat__message ${message.name==user.displayName && "messageChat__receiver"}`}>
                    <span className="messageChat__name">{message.name}</span>
                    {message.message}
                    <span className="messageChat__timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                    
                    </span>
                    
            </p>
                    )
 
                )}
            </div>
            <div className="messageChat__footer">
            <InsertEmoticonIcon />
                <form>
                        <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a Message"
                        />
                        
                        <button 
                        type="submit" onClick={sendMessage}>
                            Send
                        </button> 
                </form>
                <MicIcon />
                <ImageIcon/>
                <FavoriteBorderIcon/>
            </div>
        </div>
    )
}

export default MessageChat
