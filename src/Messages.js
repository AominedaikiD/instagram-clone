import React, { useState } from 'react';
import { Route, Router, Switch, useParams } from 'react-router-dom';
import MessageChat from './MessageChat';
import "./Messages.css";
import MessageSidebar from './MessageSidebar';
import MessageSidebarChat from './MessageSidebarChat';
import { Button } from "@material-ui/core";

function Messages(props)
{
    const { roomsId } = useParams();

    return (
        <div className="messages">
            
                            <MessageSidebar />
                        {/* <Route path="/messages/:roomsId">
                            <MessageChat/>
                        </Route> */}
                        {/* <Route path="/">
                        <MessageSidebar topBar={true}/>
                        </Route> */}
                        <Route path="/messages/:roomsId">
                            <MessageChat/>
                        </Route>
                <div className="message__createNewMessage">
                    {roomsId ? ""
                    :
                            <div className="message__createNewMessage">
                                <img src="https://icon-library.com/images/send-message-icon/send-message-icon-17.jpg"></img>
                                <h1>Your Messages</h1>
                    <h2>Send private photos and messages to a friend or group</h2>
                    <Button  variant="contained" style={{background:"#0095f6",color:"#fff",fontSize:"12px" }} size="small">Send Message</Button>

                    </div>}
                </div > 
            
                          
        </div>
    )
}

export default Messages

