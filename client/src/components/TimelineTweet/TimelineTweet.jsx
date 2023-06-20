import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const fetchData = async () => {
    try {
      const timelineTweets = await axios.get(
        `/tweets/timeline/${currentUser._id}`
      );

      setTimeLine(timelineTweets.data);
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
  

    fetchData();
  }, [currentUser._id, ]);

  console.log("Timeline", currentUser._id, timeLine);
  return (
    <div className="mt-6">
      {timeLine &&
        timeLine.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet fetchData={fetchData} tweet={tweet} setData={setTimeLine} />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweet;
