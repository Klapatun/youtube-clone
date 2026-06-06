import {FC, PropsWithChildren} from 'react';
import {Header} from '../Header';
import {LeftMenu} from '../LeftMenu';

import styles from './BaseLayout.module.css';

export const BaseLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.container}>
            <Header />
            <LeftMenu />
            {children}
        </div>
    )
}