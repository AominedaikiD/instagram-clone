import react,{useState,useEffect} from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Messages from './Messages';
import Explore from './Explore';
import Notifications from './Notifications';
import Profile from './Profile';
import {auth, db,storage} from './firebase';
import Header from './Header';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App()
{
 const [ {}, dispatch ] = useStateValue();
 const [username, setUsername]= useState('');
 const [user,setUser]=useState(null);
  

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authuser) =>
    {
      console.log('The user is>>>',authuser);
      if(authuser){
        //loggedin
        console.log(authuser);
        setUser(authuser);
        dispatch({
          type: 'SET_USER',
          user: authuser
        })
        // if(authuser.displayName){
        //   //don't Update username
        // }else{
        //   //if we just created acc
        //   return authuser.updateProfile({
        //     displayName:username,
        //   });
        // }
      }else{
        //loggedout
        setUser(null);
        dispatch({
          type: 'SET_USER',
          user: authuser
        })
      }
    })
    return()=>{
      // perform some cleanup actions
      unsubscribe();
    }
    
  }, [user, username]);
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/messages/:roomsId">
          <Header user={ user}/>
            <Messages />
          </Route>
          <Route path="/messages">
          <Header user={ user}/>
            <Messages />
          </Route>

          <Route path="/explore">
          <Header user={ user}/>
            <Explore />
          </Route>

          <Route path="/notifications">
          <Header user={ user}/>
            <Notifications />
          </Route>

          <Route path="/profile">
          <Header user={ user}/>
            <Profile />
          </Route>

          <Route path="/">
          <Header user={ user}/>
            <Home user={user} />
          </Route>

        </Switch>
        

      </div>

    </Router>
    
    
  );
}

export default App;
