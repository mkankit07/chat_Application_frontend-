import React from 'react'
import styled from 'styled-components';
import Logo from "../public/logo.svg"
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { loginRouter } from '../utils/APIRoutes';
const Login = () => {
    const navigate=useNavigate()

    // useEffect(()=>{
    //     if(localStorage.getItem("chat-app-username")){
    //        navigate("/")
    //     }
    // },[])
    const [values, setValues] = useState({
        email: "",
        password: "",
    })
    const toastObject = {
        position: "bottom-right",
        autoClose: 6000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    const handlevalidation = () => {
        // console.log(values, "++++++++");
        const {  email, password} = values
         if (email.length < 3) {
            toast.error('Email should be at least 3 characters', toastObject)
            return false
        } else if (password.length <= 8) {
            toast.error('Password should be equal or greater then 8 characters', toastObject)
            return false
        } else {
            return true
        }
    }
   
     const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const handleSumbit = async (event) => {
        event.preventDefault();
        if (handlevalidation()) {
            const { password,  email } = values
            const  {data}  = await axios.post(loginRouter, {  email, password })
            // console.log(data,"-------------------");
            if(data?.status !== 200){
                toast.error(data?.message, toastObject)
            }else{
                localStorage.setItem('chat-app-username',JSON.stringify(data?.data))
                navigate("/")
            }
        }

    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSumbit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>mk</h1>
                    </div>
                    <input type="email" placeholder='Email' name="email" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
                    <button>Log In</button>
                    <span>Don't have an Account ? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 4.5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 0.7rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
    background-color: #4e0eff;
    color: white;
    padding: 0.7rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
        }
`

export default Login