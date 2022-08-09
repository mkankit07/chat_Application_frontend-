import React, { useEffect,useRef } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { getAllUsersRouter } from '../utils/APIRoutes';
import Contects from '../components/Contects';
import { constants } from 'buffer';
import {io} from 'socket.io-client';
import { host } from '../utils/APIRoutes';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
const Chat = () => {
    const socket=useRef()
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([])
    const [currentuser, setCurrentuser] = useState(undefined)
    const [currentChat, setcurrentChat] = useState(undefined)
    const [isLoaded,setIsloaded]=useState(false)
    
    useEffect(() => {
        if (!localStorage.getItem("chat-app-username")){
            navigate("/login");
        }else{
            let data=localStorage.getItem("chat-app-username")
            console.log(data,"ooooooooooooooooo");
            setCurrentuser(JSON.parse(data));
        }
    }, []);
    console.log("+++++++++++++++++++++++++=", currentuser);
    useEffect(()=>{
        if(currentuser){
            socket.current=io(host)
            socket.current.emit('addd-user',currentuser._id)
        }
    },[currentuser])
    useEffect(() => { 
        if(currentuser){
            console.log("+++++++++++++++++++++++++-", currentuser);
            if(currentuser?.image || currentuser?.avatarImage){
                const data=axios.get(`${getAllUsersRouter}/${currentuser._id}`).then((data)=>{
                    setContacts(data?.data?.data||data?.data)
                    setIsloaded(true)
                })
            
            }else{
                navigate("/setavatar")
            }
        }
    }, [currentuser])
    const handleChatChange=(chat)=>{
        console.log(chat,"lllllllllllllllllllllll");
        if(chat){
            setcurrentChat(chat)
        }
    }
    return (
        <>
            <FormContainer>
                <div className="container">
                    <Contects contacts={contacts} currentuser={currentuser} changeChat={handleChatChange}/>
                   {isLoaded && currentChat==undefined ? <Welcome  currentuser={currentuser}/>:<ChatContainer currentChat={currentChat} currentuser={currentuser} socket={socket}/>}

                </div>
            </FormContainer>
        </>
    )
}

const FormContainer = styled.div`
height:100vh;
width:100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items: center;
background-color:#131324;
.container{
    height:85vh;
    width:85vw;  
    background-color: #00000076 ;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width:1080px){
        grid-template-columns:35% 65%;
    }
}`;
export default Chat