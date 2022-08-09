import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Message from "./Message";
import axios, { Axios } from "axios";
import { sendMessageRouter, getMessagesRouter } from "../utils/APIRoutes";
import {v4 as uuidv4} from 'uuid'
const ChatContainer = ({ currentChat, currentuser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [up, setup] = useState("");
  const scrollRef=useRef()
  useEffect(() => {
    axios
      .post(getMessagesRouter, { from: currentuser?._id, to: currentChat?._id })
      .then((data) => {
        console.log(data?.data, "------------------------");
        setMessages(data?.data?.data);
      });
  }, [currentChat || currentuser]);

  const handlesendMsg = async (msg) => {
    console.log({ from: currentuser?._id, to: currentChat?._id });
    await axios.post(sendMessageRouter, {
      from: currentuser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      from: currentuser._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])
  return (
    <>
      {currentChat ? (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img src={currentChat.image} alt="avatar" />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          {messages.length > 0 ? (
            <div className="chat-message">
              {messages.map((message) => (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}

          <ChatInput handlesendMsg={handlesendMsg} />
        </Container>
      ) : (
        <div></div>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
    padding-top: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
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
  }
  .chat-message {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .contant {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;
