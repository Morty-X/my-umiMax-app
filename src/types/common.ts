interface common_API_Res_Type {
  msg: string;
  code: number;
  data: any;
}
/** 分页器配置项 */
interface paginationConfigType {
  count?: number;
  current: number;
  pageSize: number;
  totalPages?: number;
}
