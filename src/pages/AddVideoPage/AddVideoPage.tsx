'use client'

import { youtubeParser } from "@/src/shared/libs/url-parsers";
import { useState } from "react";

export const AddVideoPage = () => {
  const [videoId, setVideoId] = useState('');

    return (
      <div>
        <form onSubmit={(e) => {
            e.preventDefault();

            const anyE = e as any;
            const url = anyE.target.elements[0].value;
            if(!url) {
              return;
            }
            
            const data = youtubeParser(url as string);
            if(data?.id) {
                setVideoId(data.id);
            }
        }}>
          <input type='text' placeholder='Ссылка на TouTube видео' />
          <button>Загрузить</button>
        </form>
        {videoId && (
          <iframe 
            width="560" 
            height="315" 
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          >
          </iframe>
        )}
      
      </div>
    )
}