import Search from './Search';

export default class Helper {

    static isEmptySearch(search: Search): boolean {
        if (search.query === "" && search.to === null && search.from === null)
            return true;
        else
            return false;
    };

}