
// Category Type Definition

export interface CategoryType {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface CategoryCardProps {
    image: string
    title: string
    description: string
}




// Product Type Definition

export interface ProductType {
    _id: string;
    title: string;
    description: string;
    price: number;
    discount: number;
    category: string;
    thumbnail: string;
    images: string[];
    specs?: {
        nominatedRatedVoltage?: string;
        outputVoltage?: string;
        luminousEfficiency?: string;
        lumensMaintenance?: string;
        efficiencyOfDriverCircuit?: string;
        colourOfLightOutput?: string;
        numberOfSMDModules?: number[];
        inputCurrentVariation?: string;
        driver?: string;
        powerFactor?: number;
        beamAngle?: string;
        CRI?: string;
        THD?: string;
        IPRating?: string;
        frequency?: string;
        colourTemperature?: string;
        materials?: string;
        lifeTime?: string;
        operationTemperature?: string;
        storageTemperature?: string;
        warranty?: string[];
    };
    rating?: number;
    stock: 'in stock' | 'out of stock';
    sold: number;
}



export interface ProductCardProps {
    id: string
    thumbnail: string
    title: string
    price: number
    discount: number
    sold: number
}




export interface BlogType {
    _id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}



export interface ServiceType {
    image: string
    title: string
    description: string
}


export interface ServiceCardProps {
    image: string
    title: string
    description: string
}



export interface CommonBannerProps {
    heading: string
}



export interface FeatureTableProps {
    isLoading: boolean,
    specs?: {
        nominatedRatedVoltage?: string;
        outputVoltage?: string;
        luminousEfficiency?: string;
        lumensMaintenance?: string;
        efficiencyOfDriverCircuit?: string;
        colourOfLightOutput?: string;
        numberOfSMDModules?: number[];
        inputCurrentVariation?: string;
        driver?: string;
        powerFactor?: number;
        beamAngle?: string;
        CRI?: string;
        THD?: string;
        IPRating?: string;
        frequency?: string;
        colourTemperature?: string;
        materials?: string;
        lifeTime?: string;
        operationTemperature?: string;
        storageTemperature?: string;
        warranty?: string[];
    };
}