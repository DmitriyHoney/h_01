import { AvailableResolutionType, ProductModel, VideoModel } from "../types/db.types";

class CustomDB extends Map {
    _getOrCreateTable(table: string) {
        const tbl = this.get(table);
        if (tbl) return tbl;
        this.set(table, []);
        return this.get(table);
    }
    _findRowById(table: string, id: number | string) {
        const tbl = this._getOrCreateTable(table);
        let findIdx = tbl.findIndex((i: any) => i.id === +id);
        return { tbl, idx: findIdx, row: findIdx >= 0 ? tbl[findIdx] : null };
    }
    getRow(table: string, id: number | string) {
        const { idx, row } = this._findRowById(table, id);
        if (!row) throw new Error('Not found');
        return row;
    }
    getRows(table: string) {
        return this._getOrCreateTable(table);
    }
    createRow(table: string, payload: any) {
        const date = new Date();
        const newRow = { 
            id: date.getTime(), 
            createdAt: payload.createdAt ? payload.createdAt : date,
            ...payload 
        };
        this._getOrCreateTable(table).push(newRow);
        return newRow;
    }
    deleteRow(table: string, id: number | string) {
        let { tbl, idx } = this._findRowById(table, id);
        if (idx < 0) throw new Error('Not found');
        tbl.splice(idx, 1);
        return true;
    }
    deleteAllRows(table: string) {
        this.set(table, []);
        return true;
    }
    updateRow(table: string, id: number | string, payload: any) {
        let { tbl, idx } = this._findRowById(table, id);
        if (idx < 0) throw new Error('Not found');
        tbl[idx] = { ...tbl[idx], ...payload };
        return tbl[idx];
    }
}
const DB = new CustomDB();
const initProducts: Array<ProductModel> = [
    { id: new Date().getTime(), createdAt: new Date().toISOString(), title: 'Apple', description: 'This is apple' },
    { id: new Date().getTime() + 1, createdAt: new Date().toISOString(), title: 'Orange', description: 'This is orange' }
]
DB.set('products', initProducts);
const initVideos: Array<VideoModel> = [
    { id: new Date().getTime(), createdAt: new Date().toISOString(), author: 'Platon', canBeDownloaded: true, availableResolutions: [AvailableResolutionType.P144], minAgeRestriction: null, publicationDate: new Date().toISOString(), title: 'Platon'},
    { id: new Date().getTime() + 1, createdAt: new Date().toISOString(), author: 'Marcus', canBeDownloaded: false, availableResolutions: [AvailableResolutionType.P144], minAgeRestriction: null, publicationDate: new Date().toISOString(), title: 'Marcus'},
];
DB.set('videos', initVideos);
export default DB;