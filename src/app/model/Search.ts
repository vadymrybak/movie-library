export default class Search {
    query: string;
    from: number;
    to: number;

    constructor(defaultQuery: string) {
        this.query = defaultQuery;
        this.from = null;
        this.to = null;
    }
}