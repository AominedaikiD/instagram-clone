import react,{useState,useEffect} from 'react';
import './Login.css';
import { auth, db, storage } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button,Input,Grid} from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

function Login()
{
  const signUp=(event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
      .then((authuser) =>
      {
        if (auth)
        {
        history.push('/')
      }
      setUsername("");
      setPassword("");
      setEmail("");
      return authuser.user.updateProfile({
        displayName:username,
      })
    })
      .catch((error) => alert(error.message));
    setOpen(false);
    console.log("User Created");

  }
  const signIn=(event)=>{
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) =>
      {
          history.push('/');
      setEmail("");
      setPassword("");
      
    })
    .catch((error)=>alert(error.message));
    console.log("LOgeed IN")

  }

  const classes=useStyles();
  const [modalStyle] = useState(getModalStyle);
  const history = useHistory();
  const [open, setOpen]= useState(false);
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [email, setEmail]= useState('');
  const [user,setUser]=useState(null);
  return (
    <div className="login__page">
              <Modal
          open={open}
          onClose={()=>setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
            <center>
              <img className="app_headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""
              />
            </center>
              <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              />
              <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              />
              <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        </Modal>
      <img className="login__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
      <div className="login__container">
        <form>
          <input className="login__input" type="text" placeholder="Email" value={email}
              onChange={(e)=>setEmail(e.target.value)} />
          <input className="login__password" type="password" placeholder="Password" value={password}
              onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" onClick={signIn} className="login__loginButton">Log In</button>
          <p>
            <h2>------------------OR------------------</h2>
            <h3>Forgot password?</h3>
            <h3>Login With Facebook/Google</h3>
          </p>
        </form>
      </div>
      <div className="signIndiv">
        <h4>Don't Have An account?</h4>
        <button onClick={()=>setOpen(true)} className="login__signInButton">Sign Up</button>
      </div>
    </div>
  )
}

export default Login
