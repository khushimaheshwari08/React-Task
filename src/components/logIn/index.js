import React, { useEffect, useState } from 'react'
import { Button, Grid, Typography, Divider, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from '../../actions/authAction';

const LogIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const logInState = useSelector((state) => state.authReducer)


    const handleSubmit = () => {
        if(username ==='' || password === ''){
            alert('Please enter username or password')
        } else{
        
        localStorage.setItem('Username', username);
        localStorage.setItem('Password', password);
        dispatch(loginUserAction());
        }
    }

    useEffect(() => {
        if(logInState.isUserLoggedIn){
            navigate('/dashBoard')
            }
    }, [logInState,dispatch])

    
  return (
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "lightBlue",
          height: "100vh",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            my: 5,
            px: 5,
            py: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#171616" }}
          >
            LOGIN
          </Typography>
          <TextField
            sx={{ width: "37ch", marginTop: 2 }}
            id="outlined-basic"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
          />
          <TextField
            sx={{ width: "37ch", marginTop: 2 }}
            id="outlined-basic"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />

          <Button sx={{ width: "41ch", marginTop: 4 }} variant="contained" onClick={() => handleSubmit()}>
            Login
          </Button>
          <Divider sx={{ backgroundColor: "#767676", my: 2 }} />
        </Grid>
      </Grid>
  )
}

export default LogIn