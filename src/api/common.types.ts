export type City = [number, string];
export type Location = Array<City>;
export type Locations = Record<string, Location>;
export type Dates = string[];

export type Product = {
    product_url: string;
    image: string;
    id: number;
    title: string;
    price: 31.3;
    discount_percentage?: number;
    summary: string;
    city_id: number;
    available_dates: Dates;
}

export type Products = Product[];
