import { Expose, Exclude } from 'class-transformer';
import { PaginationDataObject } from './pagination.dataObject';

@Exclude()
export class QueryResultsDataObject {

    @Expose()
    count: number;

    @Expose()
    pagination: PaginationDataObject

    @Expose()
    rows: any[]
}
