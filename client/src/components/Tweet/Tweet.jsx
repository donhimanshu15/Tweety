import axios from "axios";
import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from "react";
import Input from '@mui/material/Input';
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Tweet = ({fetchData, tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userData, setUserData] = useState();
const [editTweets, setEditTweets]=useState(tweet.description);
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const editTweet= async (id)=>{

try {
  const result = await axios.post(`/tweets/edit/${id}`,{id: currentUser._id, description: editTweets});
  if(result){
    fetchData()
    setOpen(false);
  }
} catch (err) {
  console.log("error", err);
}
}

const handleChange=(e)=>{
  console.log(e.target)
setEditTweets(e.target.value)
}

const deleteTweet=async(id)=>{
  try {
    const result= await axios.post(`/tweets/delete/${id}`, {id: currentUser._id,});
    if(result){
    console.log(result,"user deleted successfully");
    fetchData()
    setOpen(false);
  
  }
  } catch (error) {
    console.log("error", error);
  }

}
  console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);

        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            <div className="flex">
            {/* <img src="" alt="" /> */}
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>

            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr}</p>
            </div>
         {currentUser._id==userData._id  && <img onClick ={()=>{handleOpen()}}src="/threeDots.png"></img>}
          </div>

          <p>{tweet.description}</p>
          <button onClick={handleLike}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
            )}
            {tweet.likes.length}
          </button>
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Description
          </Typography>
          <div style={{display:"flex" , flexDirection:"column"}} >
      <Input 
      value={editTweets}
      onChange={(e)=>{handleChange(e)}}
      />
      <div>
      <Button onClick={()=>{editTweet(tweet._id)}}>Save Edit</Button>
      <Button onClick={()=>{deleteTweet(tweet._id)}}>Delete</Button>
      </div>
      </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Tweet;
