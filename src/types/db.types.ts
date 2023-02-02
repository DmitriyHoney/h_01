export type BaseDbEntity = { id: number, created: String, modified: String }

export type Product = { title: String, description: String };
export type ProductModel = { title: String, description: String } & BaseDbEntity;