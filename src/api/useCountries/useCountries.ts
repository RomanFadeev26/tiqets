import {useRequest} from '../useRequest';
import type {Locations} from '../common.types';

export const useCountries = () => {
    const {isLoading, isError, result} = useRequest<Locations>({
        path: 'locations'
    });

    if (result) {
        return {
            isLoading,
            isError,
            result: Object.keys(result)
        };
    }

    return {
        isLoading,
        isError
    };
}
