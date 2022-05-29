import React from 'react';
import type {RequestOptions} from './useRequest.types';

export const useRequest = <T>(options: RequestOptions) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [result, setResult] = React.useState<T>();
    const searchParams = new URLSearchParams(options.query).toString();

    React.useEffect(() => {
        if (!options.ignoreRequest) {
            const url = new URL(options.path, 'http://localhost:3001');
            const search = searchParams ? `?${searchParams}` : '';
            setIsLoading(true);
            fetch(`${url.toString()}${search}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    setIsLoading(false);
                    setIsError(true);
                })
                .then((result: T) => {
                    setIsLoading(false);
                    setResult(result);
                })
                .catch(() => {
                    setIsLoading(false);
                    setIsError(true);
                });
        }
    }, [options.ignoreRequest, options.path, searchParams]);

    return {
        isLoading,
        isError,
        result
    };
};
