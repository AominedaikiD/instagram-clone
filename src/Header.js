import react,{useState,useEffect} from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreRounded';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/Avatar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import {auth, db,storage} from './firebase';

function Header()
{
    const [ {user}, dispatch ] = useStateValue();
    const ProfileMenu = () =>

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
            <Avatar alt={user?user.displayName?user.displayName.toUpperCase():"u":"username"}  src="/static/images/avatar/1.jpg"/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/profile">
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                 </Link>
                
                <MenuItem onClick={() => console.log(user.displayName)}>My account</MenuItem>
                <Link to="/login">
                    <MenuItem onClick={() => auth.signOut()}>{user ? 'LogOut' : 'LogIn'}</MenuItem>
                </Link>    
            </Menu>
        </>)
    }
    return (
        <div className="header">
            <div className="header__left">
                <Link to="/">
                    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""
                    />
                </Link>
            </div>
            <div className="header__search">
                <div className="header__input">
                    <SearchIcon/>
                    <input type="text" placeholder="Search Here"/>
                </div>
            </div>
            {user ?
            <div className="header__right">
            <div className="header__option header__option--active">
                <Link to="/">
                    <HomeIcon fontSize="large" />
                </Link>
              </div>
            <div className="header__option">
                <Link to="/messages">
                    <MessageRoundedIcon fontSize="large"/>
                </Link>

                    
                
              </div>
            <div className="header__option">
                <Link to="/explore">
                    <ExploreOutlinedIcon fontSize="large"/>
                </Link>
            </div>
      
            <div className="header__option">
                <Link to="/notifications">
                    <FavoriteBorderIcon fontSize="large"/>
                </Link>
              </div>
              <div className="header__info">
                
                 <ProfileMenu/> 
                    </div>
                </div> :
                    <Link to="/login">
                    <button className="signIn__Button">SignIn</button>
                    </Link>
                    }
            
            
                
        </div>
            
        
    )
}

export default Header
