import React, { useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { useState } from 'react';
import { getAllUsersRouter } from '../utils/APIRoutes';
import Contects from '../components/Contects';
import { constants } from 'buffer';
const Chat = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([])
    const [currentuser, setCurrentuser] = useState(undefined)
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
    useEffect(() => { 
        if(currentuser){
            console.log("+++++++++++++++++++++++++-", currentuser);
            if(currentuser.isAvatarImageSet){
                const data=axios.get(`${getAllUsersRouter}/${currentuser._id}`).then((data)=>{
                    console.log(data);
                    setContacts(data.data)
                })
            
            }else{
                navigate("/setavatar")
            }
        }

    }, [currentuser])

    return (
        <>
            <FormContainer>
                <div className="container">
                    <Contects contacts={contacts} currentuser={currentuser}/>
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