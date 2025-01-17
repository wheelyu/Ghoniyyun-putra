import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { supabase } from '../../services/supabaseConfig';
const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    getLink();
  })
   const getLink = async () => {
          try {
              const { data, error, status } = await supabase
                  .from("link")
                  .select("*")
                  .eq("id", 1)
                  .single(); // Gunakan single() karena kita hanya mengharapkan 1 data
      
              if (error && status !== 406) {
                  throw error;
              }
      
              if (data) {
                  setVideoUrl(data.link);
              } else {
                  throw new Error("Link not found");
              }
          } catch (error) {
              console.error("Error getting link:", error); // Tambahkan log error
              Toast.fire({
                  icon: "error",
                  title: "Error get link",
              });
          }
      };
  return (
    <div>
      <ReactPlayer url={videoUrl} width="100%" height={"500px"}  />
    </div>
  );
};

export default VideoPlayer;
