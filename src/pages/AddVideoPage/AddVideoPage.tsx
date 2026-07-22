'use client'

import { isAllowedHost, youtubeParser } from "@/src/shared/libs/url-parsers";
import { useState } from "react";
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  videoUrl: string;
};

const schema = z.object({
  videoUrl: z
    .string()
    .min(1, {message: 'Поле не должно быть пустым'})
    .superRefine((url, context) => {
      try {
        const urlModel = new URL(url);
        if(!isAllowedHost(urlModel)) {
          context.addIssue({
            code: 'custom',
            message: 'Поле должно содержать ссылку на YouTube',
            input: url
          });
        }
      } catch {
        context.addIssue({
          code: 'custom',
          message: 'Поле должно содержать ссылку',
          input: url
        });
      }
    })
});

export const AddVideoPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(schema)
  });
  const [videoId, setVideoId] = useState('');


  const onSubmit: SubmitHandler<Inputs> = async (data) => {          
          const urlModel = youtubeParser(data.videoUrl);
          if(urlModel?.id) {
              setVideoId(urlModel.id);
              await fetch('/api/videos', {method: 'POST', body: JSON.stringify({videoId: urlModel.id})});
          }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input type='text' placeholder='Ссылка на TouTube видео' {...register("videoUrl")} />
          {!!errors.videoUrl?.message && (
            <p>{errors.videoUrl?.message}</p>
          )}
        </label>
        <button>Загрузить</button>
      </form>
      {videoId && (
        <iframe 
          width="560" 
          height="315" 
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        >
        </iframe>
      )}
    
    </div>
  )
}