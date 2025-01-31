import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { supabase } from '../../services/supabaseConfig';

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    getLink();
  }, []); // Tambahkan dependency array kosong

  const getLink = async () => {
    try {
      const { data, error, status } = await supabase
        .from("link")
        .select("*")
        .eq("id", 1)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setVideoUrl(data.link);
      }
    } catch (error) {
      console.error("Error getting link:", error);
    }
  };

  return (
    <div className="aspect-video">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls={true}      // Mengaktifkan kontrol YouTube bawaan
        config={{
          youtube: {
            playerVars: {
              showinfo: 1,   // Menampilkan informasi video
              rel: 0,        // Tidak menampilkan video terkait di akhir
              modestbranding: 1  // Mengurangi branding YouTube
            }
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;