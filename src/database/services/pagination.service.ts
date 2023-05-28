import URL from 'url';

export class Pagination {

    private baseUrl: string;
    private recordsPerPage: number;
    private limit: number;
    private offset: number;
    private totalRecords: number;
    private currentPageNo: number;

    constructor(perPage: number, page: number, totalRecords?: number) {
        if (!perPage || perPage > 100) {
            perPage = 10;
        }

        if (!page || page <= 0) {
            page = 1;
        }

        this.baseUrl = null;
        this.recordsPerPage = perPage;

        this.currentPageNo = 1;
        this.setCurrentPage(page);

        this.limit = perPage;
        this.offset = (page - 1) * perPage;

        if (totalRecords) {
            this.totalRecords = totalRecords;
        }
    }

    getLimit() {
        return this.limit;
    }

    getOffset() {
        return this.offset;
    }

    update({ totalRecords }) {
        this.totalRecords = totalRecords;
    }

    setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
        return this;
    }

    setCurrentPage(pageNo: number) {
        if (!pageNo) {
            return this;
        }

        this.currentPageNo = pageNo;
        return this;
    }

    getCurrentPageNo() {
        if (this.currentPageNo > this.getTotalPages()) {
            this.currentPageNo = this.getTotalPages();
        }

        return this.currentPageNo;
    }

    getTotalPages() {
        return Math.ceil(this.totalRecords / this.recordsPerPage);
    }

    getUrl(pageNo?: number) {
        let url = URL.parse(this.baseUrl);
        let urlQuery = (url.query ? url.query.split('&').filter(item => !item.match(/page/)) : []);
        if (pageNo && pageNo > 1) {
            urlQuery.push('page=' + pageNo);
        }
        return url.pathname + (urlQuery.length > 0 ? '?' + urlQuery.join('&') : '');
    }

    getNextPageUrl() {
        let pageNo = this.getCurrentPageNo() + 1;
        if (pageNo > this.getTotalPages()) {
            return null;
        }
        return this.getUrl(pageNo);
    }

    getPreviousPageUrl() {
        if (this.getCurrentPageNo() === 1) {
            return null;
        }
        let pageNo = this.getCurrentPageNo() - 1;
        if (pageNo === 1) {
            return this.getUrl();
        }
        return this.getUrl(pageNo);
    }

    getLastPageUrl() {
        if (this.getCurrentPageNo() === this.getTotalPages()) {
            return null;
        }
        return this.getUrl(this.getTotalPages());
    }

    getFirstPageUrl() {
        if (this.getCurrentPageNo() === 1) {
            return null;
        }
        return this.getUrl();
    }

    getPages(current: number, last: number) {
        var delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

    getObject() {
        return {
            "totalPages": this.getTotalPages(),
            "perPage": this.recordsPerPage,
            "currentPageNo": this.getCurrentPageNo(),
            "prevPageUrl": this.getPreviousPageUrl(),
            "nextPageUrl": this.getNextPageUrl(),
            "lastPageUrl": this.getLastPageUrl(),
            "firstPageUrl": this.getFirstPageUrl(),
            "getPageUrl": (pageNo) => {
                return this.getUrl(pageNo);
            },
            "getPages": this.getPages(this.getCurrentPageNo(), this.getTotalPages())
        };
    }

    get() {
        return {
            "totalPages": this.getTotalPages(),
            "perPage": this.recordsPerPage,
            "currentPageNo": this.getCurrentPageNo()
        };
    }

};
