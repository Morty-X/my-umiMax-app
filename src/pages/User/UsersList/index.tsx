import {
  getUserListData,
  switchUserStatus,
} from '@/services/user/UserList/api';
import type { IUserDatum } from '@/services/user/UserList/types';
import { filterObject } from '@/utils/filter';
import { formatDateTime } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { Icon } from '@iconify/react';
import { useRequest } from '@umijs/max';
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
import { useEffect, useState } from 'react';

/** 查询表单参数类型 */
interface searchFormValuesType {
  userNo?: string;
  nickName?: string;
  mobileNumber?: string;
  status?: number;
  current: number;
  pageSize: number;
}
/** 用户渲染查询表单部分的数据对象 */
const partParamsObj = [
  {
    uniKey: 'userNo',
    defaultHolder: '用户编号',
  },
  {
    uniKey: 'nickName',
    defaultHolder: '昵称',
  },
  {
    uniKey: 'mobileNumber',
    defaultHolder: '手机号',
  },
];

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

/** 用户列表主组件 */
const UsersList = () => {
  /** 查询表单实例 */
  const [form] = Form.useForm<searchFormValuesType>();

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

  /** 表格数据 */
  const [data, setData] = useState<any[]>([]);

  /* -------------------------------------------------------------------------- */
  // 表格多选框一列配置
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  function getItems(record: Pick<IUserDatum, 'status' | 'userNo'>) {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <div
            onClick={() =>
              changeUserState({
                status: Number(!record.status),
                userNo: record.userNo,
              })
            }
          >
            启用
          </div>
        ),
        disabled: record.status === 1,
      },
      {
        key: '2',
        label: (
          <div
            onClick={() =>
              changeUserState({
                status: Number(!record.status),
                userNo: record.userNo,
              })
            }
          >
            禁用
          </div>
        ),
        disabled: record.status === 0,
      },
    ];
    return items;
  }

  const { run: changeUserState } = useRequest(
    (params) => switchUserStatus(params),
    {
      manual: true,
      onSuccess(data: common_API_Res_Type) {
        message.success(data.msg);
        fetchData();
      },
    },
  );
  /** 表格列配置 */
  const columns: TableProps<IUserDatum>['columns'] = [
    {
      title: '编号',
      dataIndex: 'userNo',
      key: 'userNo',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      key: 'avatarUrl',
      render: (text, row, index) => {
        return (
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
        );
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: '手机号',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: '地区',
      dataIndex: 'area',
      key: 'area',
      render: (text, row, index) => {
        return (
          <>
            <span>{row.area || '---'}</span>
          </>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, row, index) => {
        return (
          <div className="flex items-center justify-center w-full h-full ">
            <div
              className={clsx(
                'w-[40px] h-[30px] border rounded text-center leading-[30px]',
                {
                  'text-[#f6574f] border-[#ffb7b3]': text === 0,
                  'text-[#72cd45] border-[#69ee27]': text === 1,
                },
              )}
            >
              {text === 0 ? '禁用' : '启用'}
            </div>
          </div>
        );
      },
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, row, index) => {
        return (
          <span className=" text-[12px]">
            创建 {formatDateTime(row.createTime)} <br />
            更新 {formatDateTime(row.upstringTime)}
          </span>
        );
      },
    },
    {
      title: '操作',
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

  /* -------------------------------------------------------------------------- */
  /** 分页器状态管理 */
  const [paginationConfig, setPaginationConfig] =
    useState<paginationConfigType>({
      current: 1,
      pageSize: 10,
      count: 0,
    });

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
      const result = await getUserListData({
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
          title: '用户列表',
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
          <Row gutter={12}>
            {partParamsObj.map((ele) => {
              return (
                <Col>
                  <Form.Item name={ele.uniKey}>
                    <Input
                      placeholder={ele.defaultHolder}
                      style={{ width: 180 }}
                    />
                  </Form.Item>
                </Col>
              );
            })}
            <Col>
              {/* 状态筛选 */}
              <Form.Item name="status">
                <Select
                  placeholder="状态"
                  style={{ width: 190 }}
                  options={[
                    { value: null, label: '状态：全部' },
                    { value: 1, label: '状态：启用' },
                    { value: 0, label: '状态：禁用' },
                  ]}
                />
              </Form.Item>
            </Col>
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
          size="small"
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          rowKey={(record) => record.userNo}
          bordered={true}
          pagination={{
            align: 'end',
            pageSize: paginationConfig.pageSize,
            responsive: true,
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

export default UsersList;
