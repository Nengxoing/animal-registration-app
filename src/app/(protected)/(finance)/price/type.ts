export interface IPrice {
    id: number;
    no: number;
    code: string;
    status: boolean;
    price: string;
    name: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    duration: String;
}
export interface IPriceColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IPrice;
    };
}

export interface IPriceAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}
