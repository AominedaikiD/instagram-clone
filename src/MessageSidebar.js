import React, { useEffect, useState } from 'react';
import './MessageSidebar.css';
import {db, storage} from './firebase';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import OpenInNewTwoToneIcon from '@material-ui/icons/OpenInNewTwoTone';
import MessageSidebarChat from './MessageSidebarChat';

function MessageSidebar({topBar})
{
    const [rooms, setRooms] = useState([]);
    useEffect(() =>
    {
        
        const unsubscribe = db.collection('users').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));
        return () =>
        {
            unsubscribe();
        }
    }, []);
    return (
        <div className="messageSidebar">
            {!topBar?<div className="messageSidebar__header">
                <div className="messageSidebar__headerinfo">
                <h3>05_Aomine</h3>
                <ExpandMoreTwoToneIcon />
                </div>
                <OpenInNewTwoToneIcon/>
            </div>:""}
            <div className="messageSidebar__chats">
                {rooms.map(room => (
                    <MessageSidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    )
}

export default MessageSidebar
