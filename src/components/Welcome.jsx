import React from 'react'
import styled from 'styled-components';
import Robot from '../public/robot.gif'
const Welcome = ({currentuser}) => {
  return (
    <>
    <Container>
        <img src={Robot} alt="robot" />
        <h1>
            Welcome ,<span>{currentuser?.username}</span>
        </h1>
        <h3>
            Please select a chat to start Messaging
        </h3>
    </Container>
    </>
  )
}

const Container=styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:20rem
}
span{
    color:#4e00ff
}
`
export default Welcome