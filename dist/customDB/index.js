"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomDB extends Map {
    _getOrCreateTable(table) {
        const tbl = this.get(table);
        if (tbl)
            return tbl;
        this.set(table, []);
        return this.get(table);
    }
    _findRowById(table, id) {
        const tbl = this._getOrCreateTable(table);
        let findIdx = tbl.findIndex((i) => i.id === +id);
        return { tbl, idx: findIdx, row: findIdx >= 0 ? tbl[findIdx] : null };
    }
    getRow(table, id) {
        const { idx, row } = this._findRowById(table, id);
        if (!row)
            throw new Error('Not found');
        return row;
    }
    getRows(table) {
        return this._getOrCreateTable(table);
    }
    createRow(table, payload) {
        const date = new Date();
        const newRow = Object.assign({ id: date.getTime(), created: date, modified: date }, payload);
        this._getOrCreateTable(table).push(newRow);
        return newRow;
    }
    deleteRow(table, id) {
        let { tbl, idx } = this._findRowById(table, id);
        if (idx < 0)
            throw new Error('Not found');
        tbl.splice(idx, 1);
        return true;
    }
    deleteAllRows(table) {
        this.set(table, []);
        return true;
    }
    updateRow(table, id, payload) {
        let { tbl, idx } = this._findRowById(table, id);
        if (idx < 0)
            throw new Error('Not found');
        tbl[idx] = Object.assign(Object.assign(Object.assign({}, tbl[idx]), payload), { modified: new Date() });
        return tbl[idx];
    }
}
const DB = new CustomDB();
DB.set('products', []);
exports.default = DB;
