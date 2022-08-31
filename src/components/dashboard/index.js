import { Button } from '@mui/material';
import React, { useState,useEffect} from 'react'
import Tesseract from 'tesseract.js';
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from '../../actions/authAction';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState(0)
  const logInState = useSelector((state) => state.authReducer)

  const handleClick = () => {
    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
  };

  const logOut = () => {
    localStorage.clear()
    dispatch(logoutUserAction())
  }

  useEffect(() => {
    if(logInState.isUserLoggedIn===false){
        navigate('/')
        }
}, [logInState,dispatch])

  return (
    <div style={{height:"100vh"}}>
    <div style={{height:"100vh"}}> 
      <div style={{mx:"auto",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Button sx={{ width: "41ch", marginTop: 4 }} variant="contained" onClick={() => logOut()}>
            Logout
          </Button>
      {!isLoading && <h1 style={{marginTop:5,marginBottom:5,paddingBottom:5}}>Image to Text</h1> }

      {
        !isLoading && !text && (
          <>
            <input 
              type="file" 
              onChange={(e) => 
                setImage(URL.createObjectURL(e.target.files[0]))
                } 
                />
                <input 
                type="button" 
                style={{marginTop:4}} 
                value="Convert" 
                onClick={handleClick}
                />
          </>
        )}

        {
          isLoading && (
            <>
              <p style={{marginTop:5}}> Converting :- {progress}%</p>
            </>
          )
        }

        {
          !isLoading && text && (
            <textarea 
              rows="15" 
              value={text} 
              onChange={(e) => setText(e.target.value)}>
            </textarea>
          )
        }
      
      </div>
    </div>
    </div>
  )
}

export default Dashboard