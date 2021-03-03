import React, { useEffect,useState } from 'react';
import './Post.css';
import {Avatar,IconButton,Grid,Menu,MenuItem} from "@material-ui/core";
import { db } from './firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

function Post({postId,user,username,caption,imageUrl,post}) {
const commentRef=(pId,cId)=>db.collection('posts').doc(pId).collection('comments').doc(cId);
    
const deletePost=(event,callback)=>{
    event.preventDefault();
    //console.log(comRef.id);
    db.collection('posts').doc(postId).delete()
        .then(() => { console.log("deleted"); callback();})
    .catch((err)=>{console.log(err)});


}
    const[isLike, setIsLike]=useState(post.likes?post.likes.includes(user.uid):false);
    const[comments, setComments]=useState([]);
    // const[isCommentLike, setIsCommentLike]=useState(false);
    // const[commentID, setCommentID]=useState([]);
    const[comment, setComment]=useState('');
    useEffect(()=>{
        let unsubscribe;
        if(postId){
            unsubscribe= db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
      
                setComments(snapshot.docs.map((doc)=>doc));
                // setCommentID(snapshot.docs.map((doc)=>doc.id));
            });
        }
        return () =>{
            unsubscribe();
        };

    }, [postId]);
    
    const postLike = (event,isRemove)=>{
        event.preventDefault();
        db.collection('posts').doc(postId).update({
            likes:isRemove? firebase.firestore.FieldValue.arrayRemove(user.uid): firebase.firestore.FieldValue.arrayUnion(user.uid)

        })
        .then(()=>{
            console.log("Liked ");

        })
        .catch((err)=>{console.log(err)});
        
    }
    const postComment = (event)=>{
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');

    }
    
    // const dropDownList = (event) =>
    // {
    //     event.preventDefault();
        
    // }
    const Comment=({comment})=>{
     //   const comment=props.comment;

        const [isCommentLike, setIsCommentLike]=useState(comment.data().commentLikes?comment.data().commentLikes.includes(user.uid):false);
        const postCommentLike = (event)=>{
            setIsCommentLike(!isCommentLike);

            event.preventDefault();
            commentRef(postId,comment.id).update({
                commentLikes:isCommentLike? firebase.firestore.FieldValue.arrayRemove(user.uid): firebase.firestore.FieldValue.arrayUnion(user.uid)
    
            })
            .then(()=>{
              
                console.log(!isCommentLike?"Liked":"Unliked");
    
            })
            .catch((err)=>{console.log(err)});
        }

        const deleteComment=(event)=>{
            event.preventDefault();
            //console.log(comRef.id);
            commentRef(postId,comment.id).delete()
            .then(()=>{console.log("deleted")})
            .catch((err)=>{console.log(err)});
    
    
        }

        

        return (<p style={{ textAlign: "start", verticalAlign: "middle" }}>
            <div className="post__commentSec">
                <Grid container>
                    <Grid item md={8} sm={8}>            
                        <strong>{comment.data().username}</strong>{comment.data().text}         
                    </Grid>
                    <Grid item md={4} sm={4}>
                        <p style={{float:"right"}}>
                            <span >
                                <IconButton onClick={async(e)=>{postCommentLike(e)}}>
                                    {isCommentLike?
                                        <FavoriteIcon style={{color:"red",fontSize:"12px"}}/>
                                    :<FavoriteBorderOutlinedIcon style={{fontSize:"12px"}}/>
                                    }
                                </IconButton>
                            </span>
                            <span style={{fontSize:"12px"}}>
                                    {comment.data().commentLikes?
                                    comment.data().commentLikes.length:
                                    0}
                                    {" "}Likes   
                            </span>
                            <span>
                                {user.displayName == comment.data().username ?
                                <IconButton onClick={(e)=>{deleteComment(e)}}>
                                <DeleteIcon style={{fontSize:"12px"}}/>
                                    </IconButton> : ""
                            }
                            
                            </span>
                        </p>
                    </Grid>
                </Grid>
            </div>
            
        </p>);
    }   
    const DottedMenu = ({postDelete}) =>

    {
        const [anchorEl, setAnchorEl] = useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
           
        };

        const handleClose = () => {
            setAnchorEl(null);
        };
        
        return (<>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={user.displayName == username ?(e) => postDelete(e, handleClose):handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>option2</MenuItem>
                <MenuItem onClick={handleClose}>option3</MenuItem>
            </Menu>
        </>)
    }

    return (
        
            <div className="post">
                <div className="post_header">
                <Avatar className="post_avatar" 
                alt={username}
                src="/static/images/avatar/1.jpg"/>
                <h3>{username}</h3>
                <div className="post__postOptions" style={{margin:"0 0 0 auto"}}>
                    <DottedMenu postDelete={ deletePost}/>
                </div>
                
                 </div>

                <img className="post_image" src={imageUrl}>

                </img>
                <div className="post__options">
                    <div className="post__option">
                       <IconButton onClick={(e)=>{setIsLike(!isLike);postLike(e,isLike)}}> 
                       {isLike?<FavoriteIcon style={{color:"red"}}/>: <FavoriteBorderOutlinedIcon />}
                        </IconButton>
                    </div>
                    <div className="post__option">
                    <ChatBubbleOutlineOutlinedIcon/>
                    </div>
                    <div className="post__option">
                    <NearMeOutlinedIcon/>
                    </div>
                   
                    
                </div>
                <div className="post__likesComments">
                    <div>
                        <strong>
                        {post.likes?
                        post.likes.length:
                        0}
                        {" "}Likes
                        </strong>
                    </div>
                    
                    <div className="post__countcomments">
                    <strong>
                        {comments?
                        comments.length:
                        0}
                        {" "}comments
                    </strong>
                </div> 
                <h2>{}</h2>
                    
                </div>
                <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
                
                <div className="post__comments">
                       {comments.map((comment)=>
                         
                            <Comment comment={comment}/>
                        )

                        }
                </div>
                {user && (
                    <form className="post__CommentBox">
                        <input
                        className="post__input"
                        type="text"
                        placeholder="Add a Comment..."
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                        />
                        
                        <button
                        disabled={!comment}
                        className="post__button"
                        type="submit"
                        onClick={postComment}
                        >
                            Post
                        </button> 
                    
                    </form>

                )}

                

            </div>
        
    );
}

export default Post;
