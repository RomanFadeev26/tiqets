import {useRequest} from '../useRequest';
import {Products, Product} from "../common.types";

const localeOptions = {maximumFractionDigits: 2, minimumFractionDigits: 2, currency: 'EUR'};

const getPriceWithDiscount = (product: Product) => {
    if (!product.discount_percentage) {
        return '';
    }
    return (product.price - (product.price / 100 * (product.discount_percentage || 0)))
        .toLocaleString('en-EN', localeOptions);
}

export const useProducts = (date: string, cityId: number) => {
    const {isLoading, isError, result} = useRequest<Products>({
        path: 'products',
        query: {
            date,
            city_id: String(cityId)
        },
        ignoreRequest: !date || !cityId
    });

    if (result) {
        return {
            isLoading,
            isError,
            result: result.map((product: Product) => ({
                url: product.product_url,
                title: product.title,
                id: product.id,
                tagline: product.summary,
                price: product.price.toLocaleString('en-EN', localeOptions),
                priceWithDiscount: getPriceWithDiscount(product),
                imgSrc: product.image
            }))
        };
    }

    return {
        isLoading,
        isError
    };
}
