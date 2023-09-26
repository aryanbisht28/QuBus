import React, { useEffect, useState } from 'react'
import background from "../assests/Picture1.jpg";
import Card from '@mui/material/Card';
import Logo from "../ui-component/Logo"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const NewPassword = () => {
    const [pass, setPass] = useState("")
    const [user , setUser] = useState("")

    const handleChange = (e) => {
        setPass(e.target.value)
    }

    const handleSubmit = async() => {
        let data = {}
        data["_id"] = id
        data["password"] = pass 
        const url = `http://localhost:8000/login/updatepassword`
        const {data:res} = await axios.patch(url,data)
        console.log(res)
        if(res === "Successful"){
            alert("Password Changed")
            window.location.href="/"
        } 
    }
    const {id, token} = useParams()
    // history = useNavigate();
    const userValid = async() => {
        const res = await axios.get(`http://localhost:8000/login/forgotpassword/${id}/${token}`)
        // const data = await res.json()
        // if(data.status == 201){
        //     console.log("user valid")
        // }else{
        //     // history("*")
        //     alert("User not valid")
        // }
    }

    useEffect(() => {
        userValid()
    },[])
    const myStyle = {
        backgroundImage: `url(${background})`,
        height: "100vh",
        width:'100%',
        margin: "0",
        padding: "0",
        position:'absolute',
        top:'0',
        left:'0',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    };
    return (
        <div style={myStyle}>
            <Card style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: '0.8' }}>
                <Logo />
                <div style={{ width: '80%', margin: '1rem' }}>
                    <h4 style={{marginBottom:'0.5em'}}>Enter New Password</h4>
                    <TextField type='password' id="outlined-basic" placeholder="Enter your password" variant="outlined" onChange={handleChange} fullWidth />
                    {/* <h4 style={{marginTop:'1em',marginBottom:'0.5em'}}>Confirm Password</h4>
                    <TextField id="outlined-basic" label="Confirm your password" variant="outlined" fullWidth /> */}
                    <div style={{ width: '100%', margin: '1rem' , display:'flex' , justifyContent:'right' }}>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </div>
                    
                </div>
            </Card>
        </div>
    )
}

export default NewPassword
