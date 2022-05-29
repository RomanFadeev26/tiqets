import React from 'react';
import cls from 'classnames';
import {useAvailableDates} from '../../api/useAvailableDates';
import {Date} from '../Date';
import {Props, BlockParams} from './Calendar.types';
import classes from './Calendar.module.css';

const getBlocks = ({dates, buttonsCount, disabled}: BlockParams) => dates?.map((date) => {
    if ('divider' in date && date.divider) {
        return (<div key='divider' className={cls(classes.Divider, {[classes.DividerDisabled]: disabled})}/>);
    }
    if ('date' in date) {
        return (
            <Date datesAmount={buttonsCount} value={date.value} disabled={disabled}  key={`${date.date}-${date.dayOfWeek}`}
                  date={date.date} dayOfWeek={date.dayOfWeek}/>
        );
    }
});

const MAX_AMOUNT_OF_AVAILABLE_DATES = 7;
const MAX_AVAILABLE_SCREEN_WIDTH_FOR_MAX_DATES = 700;

export const Calendar: React.FC<Props> = ({disabled}) => {
    const {isLoading, result: dates} = useAvailableDates();

    const buttonsCount = document.body.clientWidth < MAX_AVAILABLE_SCREEN_WIDTH_FOR_MAX_DATES ? Math.ceil(document.body.clientWidth / 100) : MAX_AMOUNT_OF_AVAILABLE_DATES;
    const blocks = React.useMemo(() => getBlocks({dates, buttonsCount, disabled}), [buttonsCount, dates, disabled]);

    if (blocks) {
        const width = `calc(100% / ${buttonsCount} * ${dates?.filter(date => !('divider' in date)).length})`;

        return (
            <div className={classes.Calendar}>
                <div className={classes.Label}>DATE</div>
                <div className={classes.CalendarExternalWrapper}>
                    <div className={classes.CalendarInternalWrapper}>
                        <div className={classes.CalendarBody} style={{width}}>
                            {blocks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <p>Loading dates...</p>;
    }

    return <p>Error</p>;
};
