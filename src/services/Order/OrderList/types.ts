/* -------------------------------------------------------------------------- */
export interface OrderListResType {
  code: number;
  msg: string;
  data: OrderListDataType;
}

export interface OrderListDataType {
  pageSize: number;
  current: number;
  count: number;
  totalPages: number;
  data: OrderDataType[];
}

export interface OrderDataType {
  id: number;
  createTime: string;
  updateTime: string;
  orderNo: string;
  payAmount: number;
  payType: null;
  serviceType: ServiceType;
  timePrice: number;
  distancePrice: number;
  weightPrice: number;
  startPrice: number;
  distance: number;
  weight: number;
  userCouponId: null;
  couponDiscount: number;
  discountPrice: number;
  status: number;
  startAddress: Address | null;
  endAddress: Address;
  goodsDesc: string;
  userNo: string;
  refundAmount: number;
  refundStatus: number;
  cancelReason: null | string;
  cancelBy: null | string;
  cancelByNo: null | string;
  refundNo: null;
  payTime: null;
  sendTime: null;
  getTime: null;
  successTime: null;
  closeTime: string | null;
  cancelTime: string | null;
  refundTime: null;
  riderNo: null;
  city: City;
  completeBy: null;
  completeByNo: null;
  fee: number;
  intergal: number;
  intergalDiscount: number;
  nickName: string;
  mobileNumber: string;
  avatarUrl: string;
}

export enum City {
  Empty = '',
  上海市 = '上海市',
  武汉市 = '武汉市',
  湖北省 = '湖北省',
  重庆市 = '重庆市',
}

export interface Address {
  city: City;
  district: string;
  latitude: number | string;
  province: City;
  longitude: number | string;
  contactName: string;
  mobileNumber: string;
  addressDetail: string;
  id?: number;
  userNo?: string;
  isDelete?: number;
  addressNo?: string;
  createTime?: string;
  upstringTime?: string;
  streetNumber?: string;
}

export enum ServiceType {
  HelpBuy = 'helpBuy',
  HelpDeliver = 'helpDeliver',
  HelpGet = 'helpGet',
}
/* -------------------------------------------------------------------------- */

/**
 * 定义订单列表搜索参数的接口
 * 用于规范订单列表查询时的参数格式
 */
export interface IOrderListSearchParams_Type {
  // 当前页码，从1开始
  current: number;
  // 每页显示的订单数量
  pageSize: number;
  // 可选参数：用户手机号码，用于筛选订单
  mobileNumber?: string;
  // 可选参数：订单号，用于筛选订单
  orderNo?: string;
  // 可选参数：骑手号，用于筛选订单
  riderNo?: string;
  // 可选参数：订单状态码，用于筛选订单
  status?: number;
  // 可选参数：用户编号，用于筛选订单
  userNo?: string;
}
