import React, { useState } from "react";          //import state if aiming to use it
import "bootstrap/dist/css/bootstrap.min.css"
import Form from "react-bootstrap/Form"           //bootstrap for fancy styles
import Axios from 'axios';                        //Axios for simple fetch requests
import "./Styles/SignIn.css";

export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //make sure required fields are not empty
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    //this function launches when submit button is pressed
    function handleSubmit(event) {
    //prevent the submit button from acting in default way, wich is simply reloading the page
    event.preventDefault();

    //store the values in state into const
    const login = {
      email: email,
      password: password
    }

    //send the values in the const login to API
    Axios.post("http://localhost:8001/users/login", login).then(
        (response) => {
            console.log(response.data)
            console.log(password)

            sessionStorage.setItem('jwt', response.data.token)
            sessionStorage.setItem('userName', response.data.username)
        })
        setTimeout(function() {
            window.location = '/'                           //relocate to home page after succesful sign up
        }, 1000)                                            //had to slow down page relocation since most of the time page changed before token could be stored
    }

    return(
        <div className="forTheBackground">
            <div className='container'>
                <div className='form-div'>
                <form onSubmit={handleSubmit}>

                    <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>

                    <input type='submit' className='btn btn-danger btn-block' value='submit'disabled={!validateForm()}/>
                </form>
                </div>
            </div>
        </div>
    );
}