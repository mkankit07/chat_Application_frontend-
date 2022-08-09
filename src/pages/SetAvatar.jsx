import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import loader from "../public/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
const SetAvatar = () => {
    const api = `https://api.multiavatar.com`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    //   useEffect(async () => {
    //     if (!localStorage.getItem("chat-app-username"))
    //       navigate("/login");
    //   }, []);

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
        } else {
            const user = await JSON.parse(
                localStorage.getItem("chat-app-username")
            );
            console.log((`${setAvatarRoute}/${user._id}`));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: imagess[selectedAvatar],});
            console.log(data ,"lllllllllllllll");
            if (data?.data) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.data.image;
                localStorage.setItem("chat-app-username",JSON.stringify(user)
                );
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again.", toastOptions);
            }
        }
    };
    const imagess = [
        "https://images.pexels.com/users/avatars/230380428/till-daling-405.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
        "https://images.pexels.com/users/avatars/192440753/megan-borg-242.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2",
        "https://images.pexels.com/lib/avatars/red.png?w=130&h=130&fit=crop&dpr=2",
        "https://images.pexels.com/users/avatars/38056472/jon-bagnato-871.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=2"
    ]
    useEffect(() => {
        // axios.get("https://api.pexels.com/v1/curated?page=1&per_page=4").then((data) => {
            // let img = data?.data?.photos
            // let images = img.map((avatar) => { return avatar.url })
            // console.log(images);
            setAvatars(imagess);
            setIsLoading(false);
        // })   
    }, []);

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div
                                className={`avatar ${selectedAvatar ===undefined  ? "selected" : ""}`}>
                                <img
                                    key={index}
                                    src={imagess[index]}
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        )
                        )}
                    </div>
                    <button onClick={setProfilePicture} className="submit-btn">
                        Set as Profile Picture
                    </button>
                    <ToastContainer />
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {

      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        border-radius: 5rem;
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
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
`;

export default SetAvatar;