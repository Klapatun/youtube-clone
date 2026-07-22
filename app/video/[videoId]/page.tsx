import {VideoPage as VideoPageComponent} from "@/src/pages/VideoPage"

export {videoMetadata as metadata} from '../../../src/app/metadatas'

type VideoPageProps = {
  params: Promise<{videoId: string}>
};

export default async function VideoPage({params}: VideoPageProps) {
    const data = await params;
    return (
      <VideoPageComponent videoId={data.videoId} />
    );
}
