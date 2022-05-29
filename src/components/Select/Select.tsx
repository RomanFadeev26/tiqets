import React from 'react';
import cls from 'classnames';
import {Icon} from './Icon';
import classes from './Select.module.css';
import type {Props} from './Select.types';

export const Select: React.FC<Props> = ({
    label,
    onChange,
    options,
    disabled,
    placeholder,
    isLoading,
    isError,
    value
}) => {
    const [focused, setFocused] = React.useState(false);
    const optionComponents = React.useMemo(() => options?.map((option) => (
        <option key={option} value={option}>{option}</option>
    )), [options]);

    const onChangeWrapper = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    }, [onChange]);

    const onFocus = React.useCallback(() => {
        setFocused(true);
    }, [setFocused]);

    const onBlur = React.useCallback(() => {
        setFocused(false);
    }, [setFocused]);

    if (isLoading) {
        return (<span>Loading...</span>)
    }

    if (isError) {
        return (<span>Was error while loading</span>)
    }



    return (
        <div className={classes.Select}>
            <label className={classes.Title}>{label}</label>
            <select
                onFocus={onFocus}
                onBlur={onBlur}
                className={classes.SelectElement}
                disabled={disabled}
                onChange={onChangeWrapper}
                value={value}
            >
                    <option key='Choose the country' disabled={Boolean(value)}>{placeholder}</option>
                    {optionComponents}
            </select>
            <div className={cls(classes.InnerSelect, {[classes.Disabled]: disabled, [classes.Focused]: focused})}>
                {value || placeholder}<Icon className={cls(classes.Icon, {[classes.IconDisabled]: disabled})} />
            </div>
        </div>
    )
};
