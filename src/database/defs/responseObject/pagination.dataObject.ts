import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class PaginationDataObject {

  @Expose()
  totalPages: number;

  @Expose()
  perPage: number;

  @Expose()
  currentPageNo: number;
}
