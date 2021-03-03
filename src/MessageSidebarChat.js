import React, { useEffect, useState } from 'react';
import './MessageSidebarChat.css';
import {Avatar} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { db } from './firebase';
import { Message } from '@material-ui/icons';

function MessageSidebarChat({ id, name })
{
    const [messages, setMessages] = useState("");
    useEffect(() =>
    {
        if (id)
        {
            db.collection('users').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    })
    return (
        <Link to={`/messages/${ id }`}>
                    <div className="messageSidebarChat">
            <Avatar src="https://avatars.dicebear.com/api/human/1234r.svg"/>
            <div className="messageSidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>

    )
}

export default MessageSidebarChat
