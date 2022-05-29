import {useRequest} from '../useRequest';
import type {Locations} from '../common.types';

export const useCities = (country: string) => {
    const {isLoading, isError, result} = useRequest<Locations>({
        path: 'locations'
    });

    if (result) {
        return {
            isLoading,
            isError,
            result: result[country]
        };
    }

    return {
        isLoading,
        isError
    };
};
