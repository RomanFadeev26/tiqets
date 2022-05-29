import {useRequest} from '../useRequest';
import {Dates} from '../common.types';

export const useAvailableDates = () => {
    const {isLoading, isError, result} = useRequest<Dates>({
        path: 'available_dates'
    });

    if (result) {
        return {
            isLoading,
            isError,
            result: result.map(availableDate => [availableDate, new Date(availableDate)] as [string, Date]).reduce((acc, date, i, dates) => {
                if (i > 0 && date[1].getMonth() !== dates[i - 1][1].getMonth()) {
                    acc.push({divider: true});
                    acc.push({
                        date: date[1].getDate(),
                        dayOfWeek: date[1].toLocaleDateString('en-US', {weekday: 'short'}).toUpperCase(),
                        value: date[0]
                    });
                    return acc;
                }

                acc.push({
                    date: date[1].getDate(),
                    dayOfWeek: date[1].toLocaleDateString('en-US', {weekday: 'short'}).toUpperCase(),
                    value: date[0]
                });
                return acc;
            }, [] as Array<{ date: number; value: string; dayOfWeek: string; } | {divider: boolean}>)
        };
    }

    return {
        isLoading,
        isError
    };
};
