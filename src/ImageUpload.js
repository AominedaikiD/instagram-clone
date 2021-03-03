import React, { useState } from 'react';
import {Button,TextField} from '@material-ui/core';
import firebase from "firebase";
import {db, storage} from './firebase';
import './ImageUpload.css';
import { TextFields } from '@material-ui/icons';

function Imageupload({username}) {

    const [image,setImage]= useState(null);
    //const [url,setUrl]=useste("");
    const [progress,setProgress]=useState(0);
    const [caption, setCaption]=useState('');
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () =>
    {
        const imageName = `${ Date.parse(new Date())
    }_${ image.name }`;
            const uploadTask = storage.ref(`images/${imageName}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function...
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error)=>{
                //error function
                console.log("kkkkkk"+error);
                // alert(error.message);
            },
            ()=>{
            //complete function
                    // setProgress(0);
                    // setCaption("");
                    //  setImage(null);
                uploadTask.snapshot.ref.getDownloadURL()
                // storage
                //     .ref("images")
                //     .child(imageName)
                //     .getDownloadURL()
                    .then(async (url) =>
                    {
                        console.log("url"+url);
                        //post image inside db
                        await db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })
                        .then((data) =>
                        {
                            setProgress(0);
                            setCaption("");
                            setImage(null);
                            console.log("success" + data.id);
                        })
                        .catch((err) =>
                        {
                            setProgress(0);
                            setCaption("");
                            setImage(null);
                            alert("error posting");
                            console.log("error" + err);
                        });
                        
                    });
        }
            );
        
    };
    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a Caption..." onChange={event => setCaption(event.target.value)} value={caption} />
            <TextField type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    );
}

export default Imageupload
