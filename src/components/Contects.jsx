import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../public/logo.svg";
const Contects = ({ currentuser, contacts,changeChat }) => {
  console.log(contacts, "ooooooooooooooooooooooooooooooo");
  const [currentuserName, setCurrentuserName] = useState(undefined);
  const [currentuserImage, setCurrentuserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentuser) {
      setCurrentuserImage(currentuser.image || currentuser?.avatarImage);
      setCurrentuserName(currentuser.username);
    }
  }, [currentuser]);
  const changeCurrectChat = (index , content) => {
    console.log("MMMMMMMMMMMMMMMMMM");
    setCurrentSelected(index)
    changeChat(content)
  };
  return (
    <>
      {currentuserImage && currentuserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>MK</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={()=>{changeCurrectChat(index, contact)}}
                >
                  <div className="avatar">
                    <img src={contact.image} alt="avatar" />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentuserImage} alt="avatar" />
            </div>
            <div className="username">
              <h3>{currentuserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  position: relative;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    gap: 0.8rem;
    &::-webkit-scrollbar{
      width:1.7rem;
      &-thumb{
        background-color: #ffffff39;
        width:0.05rem;
        border-radius:1rem
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 4rem;
      width: 90%;
      cousor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border-radius: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected{
      background-color: #9186f3
    }
  }
  .current-user{
    background-color: #0d0d30;
    display: flex;
    min-height:5rem;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
      img{
        height :3rem;
        max-inline-soze:100%;
        border-radius: 3rem;

      }
    }
    .username{
      h3{
        color:white
      }
    }
    @media screen and (min-width: 720px) and (max-width:1080px){
      grid:0.5rem;
      .username{
        h2{
          font-size:1rem
        }
      }
  }
  }
`;

export default Contects;
