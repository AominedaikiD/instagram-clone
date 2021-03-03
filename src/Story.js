import React from 'react';
import './Story.css';
import Avatar from "@material-ui/core/Avatar";

function Story({image,profileSrc}) {
    return (
        <div className="story">
            <Avatar src={profileSrc} className="story__avatar"/>
            
        </div>
    )
}

export default Story
