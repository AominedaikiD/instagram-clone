import react,{useState,useEffect} from 'react';
import './Home.css';
import Post from './Post';
import {auth, db,storage} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Input,Grid} from '@material-ui/core';
import Imageupload from './ImageUpload';
function Home({user})
{
    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        posts: {
          display: "flex",
          justifyContent: "center",
          
          [theme.breakpoints.up("md")]: {
            width:"50%",
            //textAlign: "center",
            margin:"0 25% 0 25%"
            
          }
      
        },
    }));
    useEffect(()=>{
        //this is where the code runs
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
          //everytime a new post is added,this code fires
          setPosts(snapshot.docs.map(doc=>({
            id:doc.id,
            post:doc.data()
          })));
    
        });
    
      },[]);
    const classes=useStyles();
    const [posts, setPosts] = useState([]); 

    return (
        <div className="home">
            {user ? (
                <div className={classes.posts}>
                <Grid container>
                    <Grid item md={6} sm={12} >
                        {
                        posts.map(({id,post})=>( 
                            <Post key={id} postId={id} user={user} post={post} username={post.username} caption={post.caption?post.caption:"no caption"} imageUrl={post.imageUrl}/>
                            
                        ))
                        }
                        </Grid>
                        <Grid item md={6} sm={12}>
                        {/* <InstagramEmbed
                        url='https://www.instagram.com/p/CLAGQDSD5Mx/'
                        // clientAccessToken='123|456'
                        maxWidth={320}
                        hideCaption={false}
                        containerTagName='div'
                        protocol=''
                        injectScript
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}
                        /> */}
                        {/* <h1>This is Instagram Embed""</h1> */}
                        </Grid>
                    </Grid>
                
                
                </div>
            ):(
                <h3>Go And Login MF</h3>
            )}
        
        
            {user?.displayName ?(
                <Imageupload username={user.displayName}/>
                ):(
                <h3>Sorry You need to login to upload</h3>
                
                )
            }
        

        </div>
    
    )
}

export default Home
