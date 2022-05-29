import React from 'react';
import {useRecoilValue} from 'recoil';
import {citiesState} from '../../state/citiesState';
import {Location} from '../Location';
import {Calendar} from '../Calendar';
import classes from './SearchPanel.module.css';

export const SearchPanel: React.FC = () => {
    const selectedCity = useRecoilValue(citiesState);

    return (
        <section className={classes.SearchPanel}>
            <Location />
            <Calendar disabled={!selectedCity} />
        </section>
    )
};
