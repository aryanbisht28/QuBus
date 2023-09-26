import React, {useState, useEffect} from 'react'
import background from "../assests/Picture1.jpg";
import Card from '@mui/material/Card';
import Logo from "../ui-component/Logo"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import axios from 'axios';

const Email = () => {
    const [email , setEmail] = useState("")
    const [message , setMessage] = useState("")
    const  setVal = (e) => {
        setEmail(e.target.value)
    }
    const sendLink = async(e) => {

        e.preventDefault();
        const url = "http://localhost:8000/login/sendpasswordlink"
        let dataSend = {}
        dataSend["email"] = email
        const {data:res} = await axios.post(url ,dataSend)
        const data = await res.json();
        if(data.status == 201){
            setEmail("")
            setMessage(true)
        }
        else{
            alert("Invalid User")
        }
    }
    const myStyle = {
        backgroundImage: `url(${background})`,
        height: "100vh",
        margin: "0",
        padding: "0",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    };
    return (
        <div style={myStyle}>
            <Card style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: '0.8' }}>
                <Logo />
                {message ? <p style={{color:'green', fontWeight:'bold'}}>password reset link send successfully in your e-mail</p> : ""}
                <div style={{ width: '80%', margin: '1rem' }}>
                    <h6>Please enter your E-mail</h6>
                    <TextField id="outlined-basic" placeholder="Enter your e-mail" variant="outlined"
                     value={email} onChange={setVal} name="email" fullWidth />
                    <div style={{ width: '100%', margin: '1rem', display: 'flex', justifyContent: 'right' }}>
                      
                            <Button variant="contained" onClick={sendLink}>Submit</Button>
                       
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Email
