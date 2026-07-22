'use client'

import { useEffect, useState } from "react"
import Image from 'next/image';
import styles from './HomePage.module.css';
import Link from "next/link";

export const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<string[] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch('api/videos', {method: 'GET'});

                const response = await data.json();

                console.log(response);

                if(response?.ok) {
                    setData(response?.data?.videos as string[]);
                }

            } catch(err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if(isLoading) {
        return <div>Загрузка...</div>
    }

    return <div>
        {data?.length ? (
            data.map(videoId => (
                <Link className={styles.itemWrapper} href={`/video/${videoId}`} key={videoId}>
                    <Image width={250} height={250} src={`https://img.youtube.com/vi/${videoId}/hdefault.jpeg`} alt="Видео с ютюба" />
                </Link>
            ))
        ) : (<div>Данных нет</div>)}
    </div>
}