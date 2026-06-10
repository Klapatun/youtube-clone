import { NextResponse } from "next/server";

const videosData = new Set<string>();

export async function GET() {
    videosData.add('w1MDTLgwv8U');
    videosData.add('oHAmjGo7h58&t=3485s');
    videosData.add('HhpnCbrrwSk');
    videosData.add('v-HrlomZ0so');
    videosData.add('bLVwc2WfEMg');
    videosData.add('wMWl6KHtcFE');
    videosData.add('kFb7t7U232g');
    videosData.add('-oTNQgkaVz4');
    videosData.add('TlVfrLm7lNs');
    videosData.add('ysA5T_Pdo34');

    return NextResponse.json({ok: true, data: { videos: [...videosData] }});
}

export async function POST(request:Request) {
    const data: {videoId: string} = await request.json();

    if(videosData.has(data.videoId)) {
        return NextResponse.json({ok: false}, {status: 400});
    }

    videosData.add(data.videoId);
    return NextResponse.json({ok: true});
}