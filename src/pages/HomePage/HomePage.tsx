'use client'

import { useEffect, useState } from "react"
import styles from './HomePage.module.css';

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
            data.map(item => <div className={styles.itemWrapper} key={item}>
                <iframe 
                width="150" 
                src={`https://www.youtube.com/embed/${item}`}
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                >
                </iframe>
            </div>)
        ) : (<div>Данных нет</div>)}
    </div>
}