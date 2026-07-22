'use client'

interface Props {
    videoId: string;
}

export const VideoPage = ({videoId}: Props) => {
    return (
        <div>
            <iframe 
            width="600"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            >
            </iframe>
      </div>
    )
}