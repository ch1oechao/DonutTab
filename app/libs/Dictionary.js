// 字典 是一种以键-值对形式存储数据的数据结构。
export default class Dictionary {

    constructor() {
        this.items = {};
    }

    has(key) {
        return key in this.items;
    }

    set(key, val) {
        this.items[key] = val;
    }

    remove(key) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }

    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }

    values() {
        var values = [];
        for (var k in this.items) {
            if (this.has(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    keys() {
        return Object.keys(this.items);
    }

    getItem() {
        return this.items;
    }

}
 