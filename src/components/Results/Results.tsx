import React from 'react';
import {useRecoilState} from 'recoil';
import {useProducts} from '../../api/useProducts';
import {datesState} from '../../state/datesState';
import {citiesState} from '../../state/citiesState';
import {ProductCard} from '../ProductCard';
import classes from './Results.module.css';

export const Results: React.FC = () => {
    const [selectedDate] = useRecoilState(datesState);
    const [selectedCityId] = useRecoilState(citiesState);
    const {isLoading, isError, result: products} = useProducts(selectedDate, selectedCityId);



    if (!products) {
        return (<p className={classes.EmptyResults}>Select filters first</p>);
    }

    if (isLoading) {
        return (<p className={classes.EmptyResults}>Loading...</p>);
    }

    if (isError) {
        return (<p className={classes.EmptyResults}>Was error while loading</p>);
    }

    return (
        <section className={classes.Results}>
            {products.length
                ? products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))
                : (<p className={classes.EmptyResults}>Nothing found, please try a different date</p>)}
        </section>
    )
};
