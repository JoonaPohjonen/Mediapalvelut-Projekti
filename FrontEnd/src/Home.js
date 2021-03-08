import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Styles/Home.css';

export default function Home(props) {

    const [data, setData] = useState([])                           //useState("") indicates the initial value given to title, "" would be string and in this case i use [] wich is empty array

    //function for API call
    const testCall = () => {
        Axios.get("http://localhost:8001/images").then(
            (response) => {
                console.log(response);
                console.log(response.data);
                setData(response.data.reverse())                    //reverse the image order in state so that newest will always be displayed on top
        })
    }

    //simple way to run functions once when page updates, similar to ComponentDidMount
    useEffect(() => {
        testCall();
    }, [])

    return( <div className="backGround">
                <div className="midLayer">
                    {data.map((dataobjects) => (                 //dataobject refers to each singular array element (data here is an array of objects)
                    <div className="main">
                        <div className="second">
                            <div className="title">
                                <h2>
                                    {"Title:" + " " + dataobjects.title}
                                </h2>
                            </div>
                            <div className="description">
                                <h3>
                                    {"Description:" + " " + dataobjects.description}
                                </h3>
                            </div>
                            <img className="photo" alt="Images uploaded by different users" src={"http://localhost:8001/" + dataobjects.image}/>
                        </div>
                    </div>))}
                </div>
            </div>);
}