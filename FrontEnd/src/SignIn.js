import React, { useState } from "react";          //import state if aiming to use it
import "bootstrap/dist/css/bootstrap.min.css"
import Form from "react-bootstrap/Form"           //bootstrap for fancy styles
import Axios from 'axios';                        //Axios for simple fetch requests
import "./Styles/SignIn.css";


export default function SignIn() {

  //correct way to use state with functional components
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  //make sure required fields are not empty and that the user is correct age group
  function validateForm() {
    return fullName.length > 0 && userName.length > 0 && email.length > 0 && password.length > 0 && age <= 18 && age >= 7;
  }

  //this function launches when submit button is pressed
  function handleSubmit(event) {
    //prevent the submit button from acting in default way, wich is simply reloading the page
    event.preventDefault();

    //store the values in state into const
    const registered = {
      fullName: fullName,
      userName: userName,
      email: email,
      password: password,
      age: age
    }

    //send the values in the const registered to API
    Axios.post("http://localhost:8001/users/signup", registered).then(
      (response) => {
      console.log(response.data)

      if(response.data !== 'Email already exists') {
        window.location = '/inside'                     //relocate to home page after succesful sign up 
      } else {
        alert('This email is already in use')           //if given email is already in use, alert the user about this and ask them to change it
      }
    })
  }
  
  return (
    <div className="forTheBackground">
      <div className='container'>
        <div className='form-div'>
          <form onSubmit={handleSubmit}>

            <Form.Group size="lg" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}               //when listener detect onChange event it sets target value to state
              />
            </Form.Group>

            <Form.Group size="lg" controlId="userName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
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

            <Form.Group size="lg" controlId="password">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <input type='submit' className='btn btn-danger btn-block' value='submit'disabled={!validateForm()}/>
          </form>
        </div>
      </div>
    </div>
  );
}