import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from './';
import { fetchfromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
      fetchfromAPI(`channels?parts="snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));
      
      fetchfromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  }, [id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          
          background: 'linear-gradient(90deg, rgba(240,95,24,1) 0%, rgba(251,251,251,1) 44%, rgba(24,240,59,1) 87%)',
          zIndex: 10,
          height: '300px',
        }} />
          <ChannelCard channelDetail={channelDetail} marginTop="-100px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px'}}} />
          <Videos videos={videos}/>

        </Box>
    </Box>
  )
}

export default ChannelDetail