import { getOrdersListData } from '@/services/Order/OrderList/api';
import type { OrderDataType } from '@/services/Order/OrderList/types';
import { filterObject } from '@/utils/filter';
import { formatDateTime } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
  type MenuProps,
  type TableProps,
} from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import clsx from 'clsx';
import { useEffect, useState, type FC } from 'react';

interface ActionTableMenuPropType {
  onFreshTable: () => void;
}
/* 表格上方操作栏 */
const ActionTableMenu = ({ onFreshTable }: ActionTableMenuPropType) => {
  /** 刷新表格 */
  return (
    <>
      <div className="flex h-[70px] items-center justify-between w-full">
        <div></div>
        <div className="w-[40px] flex h-[40px] shadow-[0_0.2em_0_0.1em_#3f3f3f] hover:shadow-[0_0_0_0_#3f3f3f] rotate-x-2 transition-all border rounded-md cursor-pointer justify-center items-center border-[#000]">
          <Icon
            onClick={onFreshTable}
            icon="ion:reload-outline"
            className="text-[30px] text-[#2a86ff]"
          />
        </div>
      </div>
    </>
  );
};

interface TableInOrderStatusProps {
  status: number;
}

/**
 * TableInOrderStatus 组件用于在表格中展示订单的状态。
 * 它根据传入的状态参数决定显示“已关闭”或“已取消”的状态，并相应地改变样式。
 *
 * @param {TableInOrderStatusProps} props - 组件的属性对象，包含订单状态。
 */
function TableInOrderStatus({ status }: TableInOrderStatusProps) {
  // 根据订单状态渲染不同的UI样式和文本
  return (
    <>
      <div className="flex items-center justify-center w-full h-full ">
        <div
          className={clsx(
            'w-[60px] h-[28px] border rounded text-center leading-[28px]  bg-[#0b0b0b] text-[#fff]',
            {
              'bg-[#aaaaaa]': status !== -1,
            },
          )}
        >
          {status === -1 ? '已关闭' : '已取消'}
        </div>
      </div>
    </>
  );
}

/**
 * 根据记录获取项目列表
 * 此函数用于生成一个包含多个菜单项的数组每个菜单项都是一个对象，
 * 包含key、label和disabled属性这些菜单项用于展示一个流程中的不同步骤，
 * 并且在本例中，所有的步骤都被禁用（disabled为true）
 *
 * @param record 任何类型的记录，此处未使用，但可能在将来或根据不同上下文进行使用
 * @returns 返回一个MenuProps['items']类型的数组，每个元素代表一个菜单项
 */
function getItems(record: any) {
  // 定义一个名为items的常量，类型为MenuProps['items']，用于存储菜单项数组
  const items: MenuProps['items'] = [
    // 以下为各个菜单项的定义，每个对象代表一个菜单项
    {
      key: '1', // 菜单项的唯一键值
      label: <div>接单</div>, // 菜单项的标签，此处为一个React元素，显示为“接单”
      disabled: true, // 菜单项是否禁用，此处设置为true，表示此菜单项不可选
    },
    {
      key: '2',
      label: <div>配送完成</div>,
      disabled: true,
    },
    {
      key: '3',
      label: <div>确认完成</div>,
      disabled: true,
    },
    {
      key: '4',
      label: <div>取消</div>,
      disabled: true,
    },
  ];
  // 返回菜单项数组
  return items;
}
const OrderList: FC = () => {
  /** 查询表单实例 */
  const [form] = Form.useForm<any>();

  /** 查询表单搜索后的回调 */
  const onSearch = async (values: any) => {
    const searchParams = filterObject(values);
    fetchData(searchParams);
  };

  /** 重置表单 */
  const onReset = () => {
    form.resetFields();
    fetchData();
  };

  /**
   * 订单状态选择选项数组
   * 用于在界面上显示订单状态筛选选项
   * 每个对象包含两个属性：
   * - value: 用于表单提交的状态值，null表示不筛选状态
   * - label: 在界面上显示的选项文字描述
   */
  const orderStateSelectOptions = [
    { value: null, label: '状态：全部' },
    { value: -2, label: '取消订单' },
    { value: -1, label: '交易关闭' },
    { value: 0, label: '待付款' },
    { value: 1, label: '待接单' },
    { value: 2, label: '配送中' },
    { value: 3, label: '待确认完成' },
    { value: 4, label: '订单已完成' },
  ];

  /* -------------------------------------------------------------------------- */
  // 表格
  /** 分页器状态管理 */
  const [paginationConfig, setPaginationConfig] =
    useState<paginationConfigType>({
      current: 1,
      pageSize: 10,
      count: 0,
    });

  // 表格多选框一列配置
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 50,
  };
  /** 表格数据 */
  const [data, setData] = useState<any[]>([]);

  /** 表格列配置 */
  const columns: TableProps<OrderDataType>['columns'] = [
    {
      title: '编号',
      dataIndex: 'orderNo',
      width: 100,
      // ellipsis: true,
      key: 'orderNo',
      render: (text, row, idnex) => {
        return <div className="w-[100px]">{text}</div>;
      },
    },
    {
      title: '下单用户',
      dataIndex: 'userNo',
      key: 'userNo',
      width: 150,
      render: (text, row, index) => {
        return (
          <div className="flex items-center ">
            <Avatar
              src={
                <img
                  src={
                    row.avatarUrl ||
                    'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
                  }
                  alt="avatar"
                />
              }
            />
            <div>
              <p>{row.nickName}</p>
              <p className=" text-[#666]">{row.mobileNumber}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: '下单金额',
      dataIndex: 'payAmount',
      width: 180,
      key: 'payAmount',
      render: (text, row, index) => {
        return (
          <>
            <div className="flex justify-between ">
              <span>起步价</span> <span>{row.startPrice}元</span>
            </div>
            <div className="flex justify-between ">
              <span>路程价</span> <span>{row.distancePrice}元</span>
            </div>
            <div className="flex justify-between ">
              <span>重量价</span> <span>{row.weightPrice}元</span>
            </div>
            <div className="flex justify-between ">
              <span>时间段价</span> <span>{row.timePrice}元</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>支付金额</span> <span>{row.payAmount}元</span>
            </div>
          </>
        );
      },
    },
    {
      title: '下单信息',
      dataIndex: 'goodsDesc',
      key: 'goodsDesc',
      width: 320,
      ellipsis: false,
      render: (text, row, index) => {
        return (
          <>
            <div className=" text-[12px]">
              <b>{row.goodsDesc}</b>
              <p>
                起点：{row.startAddress?.city}
                {row.startAddress?.district}
                {row.startAddress?.addressDetail}
              </p>
              <p>
                {row.startAddress?.contactName}-{row.startAddress?.mobileNumber}
              </p>
              <p>
                终点：{row.endAddress?.city}
                {row.endAddress?.district}
                {row.endAddress?.addressDetail}
              </p>
              <p>
                {row.endAddress?.contactName}-{row.endAddress?.mobileNumber}
              </p>
            </div>
          </>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      key: 'status',
      render: (text, row, index) => {
        return <TableInOrderStatus status={row.status} />;
      },
    },
    {
      title: '售后',
      dataIndex: 'status',
      width: 120,
      key: 'status',
      render: (text, row, index) => {
        return (
          <div className="flex items-center justify-center w-full h-full ">
            <div>
              <p> {row.cancelBy || '无'}</p>
              <p> {row.refundStatus === 0 && '已退款'}</p>
              <p>退款金额 {row.refundAmount}元</p>
              <p>NO: {row.refundNo}</p>
            </div>
          </div>
        );
      },
    },

    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',

      width: 180,
      render: (text, row, index) => {
        return (
          <span className=" text-[14px]">
            创建 {formatDateTime(row.createTime)} <br />
            更新 {formatDateTime(row.updateTime)} <br />
            关闭 {formatDateTime(row.closeTime!)}
          </span>
        );
      },
    },
    {
      title: '操作',
      width: 90,
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <>
          <div className="flex justify-center w-full gap-2">
            <Dropdown
              menu={{ items: getItems(record) }}
              placement="bottomLeft"
              arrow
            >
              <Button>···</Button>
            </Dropdown>
          </div>
        </>
      ),
    },
  ];
  /**
   * 更新分页配置和数据
   * 此函数用于同步从服务器获取的数据到应用的当前状态，包括分页信息和实际数据
   * @param data 包含分页信息和数据的响应对象
   * 具体包括：
   * - count: 数据总数
   * - current: 当前页码
   * - pageSize: 每页数据数量
   * - totalPages: 总页数
   */
  const updatePaginationAndData = (data: any) => {
    // 解构赋值从data中提取分页信息
    const { count, current, pageSize, totalPages } = data;

    // 更新分页配置
    setPaginationConfig({
      count,
      current,
      pageSize,
      totalPages,
    });

    // 更新数据
    setData(data.data);
  };
  const fetchData = async (params?: any) => {
    try {
      const result = await getOrdersListData({
        ...params,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
      });
      updatePaginationAndData(result.data);
    } catch (error) {
      message.error('请求失败，请稍后再试');
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationConfig.current, paginationConfig.pageSize]);

  return (
    <>
      <PageContainer
        header={{
          title: '订单列表',
        }}
      >
        {/* 查询表单 */}
        <Form
          form={form}
          onFinish={onSearch}
          initialValues={{ status: null }}
          autoComplete="off"
          size="large"
          style={{ gap: 4 }}
        >
          <Row gutter={16}>
            <Col>
              {/* 用户编号 */}
              <Form.Item name="userNo">
                <Input placeholder="用户编号" style={{ width: 180 }} />
              </Form.Item>
            </Col>
            <Col>
              {/* 订单编号 */}
              <Form.Item name="orderNo">
                <Input placeholder="订单编号" style={{ width: 180 }} />
              </Form.Item>
            </Col>
            <Col>
              {/* 骑手编号 */}
              <Form.Item name="riderNo">
                <Input placeholder="骑手编号" style={{ width: 180 }} />
              </Form.Item>
            </Col>
            <Col>
              {/* 手机号 */}
              <Form.Item name="mobileNumber">
                <Input placeholder="用户手机号" style={{ width: 180 }} />
              </Form.Item>
            </Col>

            {/* 状态筛选 */}
            <Form.Item name="status">
              <Select
                placeholder="状态"
                style={{ width: 190 }}
                options={orderStateSelectOptions}
              />
            </Form.Item>
          </Row>
          <Row>
            {/* 操作按钮 */}
            <Form.Item>
              <Row gutter={16}>
                <Col>
                  <Button onClick={onReset}>取消</Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Row>
        </Form>

        {/* 分割线 */}
        <Divider
          style={{ borderColor: '#e8e8e8', marginBlockEnd: 0, marginTop: 0 }}
        ></Divider>
        <ActionTableMenu onFreshTable={() => fetchData()} />

        <Table
          rowClassName={() => {
            return 'h-[50px]';
          }}
          size="small"
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          rowKey={(record) => record.orderNo}
          bordered={true}
          virtual={true}
          scroll={{ x: true }}
          pagination={{
            align: 'end',
            pageSize: paginationConfig.pageSize,
            current: paginationConfig.current,
            total: paginationConfig.count,
            showQuickJumper: true,
            onChange: (current, pageSize) =>
              setPaginationConfig({
                current,
                pageSize,
              }),
            showTotal: (total) => `共 ${total} 条数据`,
            onShowSizeChange: (current, size) =>
              setPaginationConfig({
                current,
                pageSize: size,
              }),
            size: 'default',
          }}
        ></Table>
      </PageContainer>
    </>
  );
};
export default OrderList;
