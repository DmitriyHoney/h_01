export type BaseDbEntity = { id: number, createdAt: String };

// Products
export type Product = { title: String, description: String };
export type ProductModel = { title: String, description: String } & BaseDbEntity;

// Videos
export enum AvailableResolutionType {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
};
export type Video = {
    title: string,
    author: string,
    canBeDownloaded?: boolean,
    minAgeRestriction?: number | null,
    publicationDate?: string,
    availableResolutions?: Array<AvailableResolutionType> | null,
};
export type VideoModel = Video & BaseDbEntity;