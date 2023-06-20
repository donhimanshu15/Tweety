import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const ExploreTweets = () => {
  const [explore, setExplore] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const fetchData = async () => {
    try {
      const exploreTweets = await axios.get("/tweets/explore");
      setExplore(exploreTweets.data);
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
   
    fetchData();
  }, [currentUser._id]);
  return (
    <div className="mt-6">
      {explore &&
        explore.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet fetchData={fetchData} tweet={tweet} setData={setExplore} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweets;
