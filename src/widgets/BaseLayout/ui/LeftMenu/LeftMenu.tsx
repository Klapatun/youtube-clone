import Link from 'next/link';
import styles from './LeftMenu.module.css';

export const LeftMenu = () => {
    return <div className={styles.container}>
        <nav className={styles.navigation}>
            <Link href={'/editor/addVideo'}>Добавить видео</Link>
            <Link href={'/profile/123'}>Профиль</Link>
        </nav>
    </div>
}