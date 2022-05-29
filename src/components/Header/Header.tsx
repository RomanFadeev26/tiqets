import React from 'react';
import classes from './Header.module.css';
import type {Props} from './Header.types';

export const Header: React.FC<Props> = () => (
    <header className={classes.Header}>
        <h1 className={classes.Title}>Plan your trip!</h1>
    </header>
);
