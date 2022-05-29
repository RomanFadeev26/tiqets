import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {Select} from '../Select';
import {useCountries} from '../../api/useCountries';
import {useCities} from '../../api/useCities';
import {countriesState} from '../../state/countriesState';
import {citiesState} from '../../state/citiesState';
import classes from './Location.module.css';

export const Location: React.FC = () => {
    const [cityName, setCityName] = React.useState('');
    const [selectedCountry, setSelectedCountry] = useRecoilState(countriesState);
    const setSelectedCity = useSetRecoilState(citiesState);

    const {isError: isErrorCountriesLoading, isLoading: isCountriesLoading, result: countries} = useCountries();
    const {isLoading: isCitiesLoading, isError: isCitiesError, result: cities} = useCities(selectedCountry);

    const cityNames = React.useMemo(() => cities?.map(city => city[1]), [cities]);

    React.useEffect(() => {
        setCityName('');
        setSelectedCity(0);
    }, [setCityName, setSelectedCity, selectedCountry]);

    const onChangeCountrySelect = React.useCallback((value: string) => {
        setSelectedCountry(value);
    }, [setSelectedCountry]);

    const onChangeCitySelect = React.useCallback((value: string) => {
        setCityName(value);
        const selectedCity = cities?.find(cityName => cityName[1] === value);
        if (selectedCity) {
            setSelectedCity(selectedCity[0]);
        }
    }, [setSelectedCity, cities]);

    return (
        <div className={classes.Location}>
            <div className={classes.Wrapper}>
                <Select
                    placeholder='Choose the country'
                    onChange={onChangeCountrySelect}
                    label='COUNTRY'
                    isError={isErrorCountriesLoading}
                    isLoading={isCountriesLoading}
                    options={countries}
                    value={selectedCountry}
                />
            </div>
            <div className={classes.Wrapper}>
                <Select
                    disabled={!selectedCountry}
                    value={cityName}
                    onChange={onChangeCitySelect}
                    placeholder='Choose the city'
                    label='CITY'
                    isError={isCitiesError}
                    isLoading={isCitiesLoading}
                    options={cityNames}
                />
            </div>
        </div>
    );
};
