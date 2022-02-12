export interface ITag {
  code: number;
  message: string;
  result: IResult;
}

export interface IResult {
  pagination: IPagination;
  list: IList[];
}

export interface IList {
  sort: number;
  _id: string;
  name: string;
  describe: string;
  create_at: string;
  __v: number;
  update_at?: string;
  count: number;
}

export interface IPagination {
  total: number;
  current_page: number;
  total_page: number;
  page_size: number;
}
