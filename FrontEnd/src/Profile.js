import React from "react";          //import state if aiming to use it
import './Styles/Profile.css';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Profile(props) {

    function timeToSubmit(e) {
        e.preventDefault();

        let myForm = document.getElementById('myForm')
        let formData = new FormData(myForm)

        Axios.post("http://localhost:8001/images", formData)
        .then(
            (response) => {
                console.log(response)
            }
        )

        console.log(...formData)
    }

    const userName = sessionStorage.getItem('userName')

    function ifLoggedIn(props) {
        if(sessionStorage.getItem('jwt') !== null) {
            return (
                <div className="background">
                    <div className="main">
                        <img id="mark" alt="Just a placeholder" src={"http://localhost:8001/uploads\\questionmark.jpg"}/>
                        <h1 id="username">{userName}</h1>
                        <div className='container'>
                            <div className='form-div'>
                                <form id='myForm' name='myForm' action='http://localhost:8001/images' method='post' encType='multipart/form-data' onSubmit={timeToSubmit}>

                                    <h3 id="text">Here you can upload an image:</h3>
                                    <input id="first" type="file" name="image"/><br></br>
                                    <input placeholder="Image Title" id="second" type="text" name="title"/><br></br>
                                    <br></br>
                                    <input placeholder="Image Description" id="third" type="text" name="description"/>
                                    <br></br>
                                    <br></br>

                                    <input type='submit' className='btn btn-danger btn-block' value='submit'/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<Redirect to={{ pathname: '/Inside' }} />)
        }
    }

    return(
        <div>
            {ifLoggedIn()}
        </div>
    )
}