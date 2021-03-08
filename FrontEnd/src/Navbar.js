import React from 'react';
import './Navbar.css';
import Button from '@material-ui/core/Button';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function Navbar(props) {

    function ifLoggedIn(props) {                            //checks if user is logged in and modifies the navbar accordingly
        if(sessionStorage.getItem('jwt') !== null) {
            return (<li><Button startIcon={<AccountCircleRoundedIcon />} variant="contained" size="large" onClick={getProfile}>Profile</Button></li>)
        } else {
            return (<li id="signIn" className="Right"><Button startIcon={<PersonAddIcon />} variant="contained" color="primary" size="large" onClick={signIn}>Sign In</Button></li>)
        }
    }

    function getOut() {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('userName');
        setTimeout(function() {
            window.location = '/'                           //relocate to home page after succesful sign up
        }, 1000)                                            //had to slow down page relocation since most of the time page changed before token could be stored
    }

    function getIn() {
        window.location = '/Inside'
    }

    function signIn() {
        window.location = '/SignIn'
    }

    function getHome() {
        window.location = '/'
    }

    function getProfile() {
        window.location = '/Profile'
    }

    function wannaLogOut(props) {                           //when logging out, clears the session storage and shows the log in button again. If logged in shows only the log out button instead
        if(sessionStorage.getItem('jwt') !== null) {
            return (<li className="Right"><Button startIcon={<ExitToAppIcon />} variant="contained" color="secondary" size="large" onClick={getOut}>Log Out</Button></li>)
        } else {
            return (<li className="Right"><Button startIcon={<InputIcon />} variant="contained" color="primary" size="large" onClick={getIn}>Log In</Button></li>)
        }
    }

    return(
        <ul class="menu">
            <li><Button startIcon={<HomeIcon />} variant="contained" size="large" onClick={getHome}>Home</Button></li>
            {wannaLogOut()}
            {ifLoggedIn()}
        </ul>
    )
}