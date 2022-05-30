import React from 'react';
import cls from 'classnames';
import classes from './ProductCard.module.css';
import {useIntersection} from './useIntersectionObserver';
import type {Props} from './ProductCard.types';

export const ProductCard: React.FC<Props> = ({
                                                 url,
                                                 title,
                                                 tagline,
                                                 priceWithDiscount,
                                                 price,
                                                 imgSrc
                                             }) => {
    const ref = React.useRef(null);
    const [readyToLoad, setReadyToLoad] = React.useState(false);

    const [, setScrollHeight] = React.useState(0);

    /*
        for correct rerendering components
        or our images will be loaded never
    */
    React.useEffect(() => {
        /* for loading of first row images */
        setScrollHeight(1);

        const eventListener = () => {
            setScrollHeight(document.body.scrollHeight);
        };

        document.addEventListener('scroll', eventListener);
        return () => {
            document.removeEventListener('scroll', eventListener);
        }
    }, [setScrollHeight]);

    useIntersection(ref.current, () => {
        setReadyToLoad(true);
    })

    const pictureFormat = document.body.clientWidth >= 720 ? '&ar=3:2&w=336' : '&ar=3:4&w=102';

    return (
        <a href={url} className={classes.Link}>
            <figure ref={ref} className={classes.ProductCard}>
                {readyToLoad && (<img src={`${imgSrc}${pictureFormat}`} alt={`${title}\n${tagline}`}/>)}
                <figcaption className={classes.Caption}>
                    <div className={classes.Overflow}>
                        <h2 className={classes.Title}>{title}</h2>
                    </div>
                    <p className={classes.Description}>{tagline}</p>
                    {priceWithDiscount
                        ? (
                            <>
                                <span className={cls(classes.Price, classes.PriceWithDiscount)}>&euro;{priceWithDiscount}</span>
                                <span className={cls(classes.Price, classes.PriceWithoutDiscount)}>&euro;{price}</span>
                            </>
                        )
                        : (<span className={classes.Price}>&euro;{price}</span>)}
                </figcaption>
            </figure>
        </a>
    )
};
