import React from 'react';
import cls from 'classnames';
import {useRecoilState} from "recoil";
import {datesState} from '../../state/datesState';
import classes from './Date.module.css';
import type {Props} from './Date.types';

export const Date: React.FC<Props> = ({
    date,
    dayOfWeek,
    disabled,
    datesAmount,
    value
}) => {
    const [selectedDate, setDate] = useRecoilState(datesState);
    const onClick = React.useCallback(() => {
        setDate(value);
    }, [setDate, value]);

    const [focused, setFocused] = React.useState(false);

    const onFocus = React.useCallback(() => {
        setFocused(true);
    }, [setFocused]);

    const onBlur = React.useCallback(() => {
        setFocused(false);
    }, [setFocused]);

    return (
        <button
            onFocus={onFocus}
            onBlur={onBlur}
            className={cls(classes.Date, {[classes.ChosenDate]: value === selectedDate, [classes.Focused]: focused})}
            style={{
                width: `calc(100% / ${datesAmount} - 4px)`,
            }}
            onClick={onClick}
            disabled={disabled}
        >
            <div className={classes.DayOfWeek}>{dayOfWeek}</div>
            <div className={classes.DateNumber}>{date}</div>
        </button>
    )
};
