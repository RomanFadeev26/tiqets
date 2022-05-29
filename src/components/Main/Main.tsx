import React from 'react';
import {SearchPanel} from '../SearchPanel';
import {Results} from '../Results';
import classes from './Main.module.css';

export const Main: React.FC = () => (
    <main className={classes.Main}>
        <SearchPanel />
        <div className={classes.Divider} />
        <Results />
    </main>
);
