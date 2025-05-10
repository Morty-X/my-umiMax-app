export interface IOrderFeeRes_Type {
  code: number;
  msg: string;
  data: IOrderFeeData;
}

export interface IOrderFeeData {
  feeTips: number[];
  agentExtract: number;
  platformExtract: number;
}
