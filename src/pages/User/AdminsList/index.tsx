import {
  getAdminsList,
  resetAdminsPwd,
  switchAdminStatus,
} from '@/services/user/AdminsList/api';
import type {
  Datum,
  IAdminsSearchType,
  ISwitchRes_Type,
} from '@/services/user/AdminsList/types';
import { filterObject } from '@/utils/filter';
import { formatDateTime } from '@/utils/format';
import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Icon } from '@iconify/react';
import { Link, useLocation, useRequest } from '@umijs/max';
import {
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
  Tooltip,
  type MenuProps,
  type TableProps,
} from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import clsx from 'clsx';
import qs from 'qs';
import { useEffect, useState } from 'react';

/* -------------------------------------------------------------------------- */

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

/** AdminsList 组件 */
const AdminsList = () => {
  const location = useLocation();
  const defaultSearchParams = qs.parse(location.search.replace('?', ''));

  // 左边复选框 配置项
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  /** 复选框列表是否已选择 */
  const hasSelected = selectedRowKeys.length > 0;
  /* -------------------------------------------------------------------------- */
  /** 分页器配置项 */
  interface paginationConfigType {
    count?: number;
    current: number;
    pageSize: number;
    totalPages?: number;
  }

  /** 分页器状态管理 */
  const [paginationConfig, setPaginationConfig] =
    useState<paginationConfigType>({
      current: 1,
      pageSize: 10,
    });
  /* -------------------------------------------------------------------------- */
  /** 查询表单实例 */
  const [form] = Form.useForm();

  /** 查询表单搜索后的回调 */
  const onSearch = async (values: Partial<Datum> & {}) => {
    const searchParams = filterObject(values);
    try {
      const result = await getAdminsList({
        ...searchParams,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
      });
      updatePaginationAndData(result.data);
    } catch (error) {
      message.error('请求失败，请稍后再试');
    }
  };

  /** 刷新标识 */
  const [refreshFlag, setRefreshFlag] = useState(0);

  /** 重置表单 */
  const onReset = () => {
    form.resetFields();
    setRefreshFlag((prev) => prev + 1);
  };

  /* 表格上方操作栏 */
  const ActionTableMenu = () => {
    /** 刷新表格 */
    const handleRefresh = () => {
      setRefreshFlag((prev) => prev + 1);
    };
    return (
      <>
        <div className="flex h-[70px] items-center  justify-between w-full ">
          <Link to={'/user/edit/add'}>
            <Button size="large" type="primary">
              添加管理员
            </Button>
          </Link>
          <div
            onClick={handleRefresh}
            className="w-[40px] flex h-[40px]  shadow-[0_0.2em_0_0.1em_#3f3f3f] hover:shadow-[0_0_0_0_#3f3f3f]  rotate-x-2 transition-all border rounded-md  cursor-pointer justify-center items-center border-[#000] "
          >
            <Icon
              icon="ion:reload-outline"
              className=" text-[30px] text-[#2a86ff]"
            />
          </div>
        </div>
      </>
    );
  };

  /* -------------------------------------------------------------------------- */
  // 表格
  /** 表格列配置 */
  const columns: TableProps<Datum>['columns'] = [
    {
      title: '编号',
      dataIndex: 'adminNo',
      key: 'adminNo',
    },
    {
      title: '账号',
      dataIndex: 'adminName',
      key: 'adminName',
      render: (text, row, index) => {
        return (
          <span>
            {row.adminName} <br />
            初始密码：{row.defaultPwd}
          </span>
        );
      },
    },
    {
      title: '手机号',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      key: 'realName',
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
            更新 {formatDateTime(row.updateTime)}
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
            <Tooltip title="操作人">
              <Link to={`/user/admins?adminNo=${record.updatedBy}`}>
                <UserOutlined className=" text-[20px] cursor-pointer  text-[#1677ff]" />
              </Link>
            </Tooltip>
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

  /** 表格数据 */
  const [data, setData] = useState<Datum[]>([]);

  // 切换状态
  const { run: changeAdminStatus } = useRequest(
    (params) => switchAdminStatus(params),
    {
      // 手动触发
      manual: true,
      onSuccess() {
        message.success(`修改状态成功`);
        // 重新渲染页面
        setRefreshFlag((prev) => prev + 1);
      },
      onError() {
        message.error(`修改状态失败`);
      },
    },
  );

  // 重置密码
  const { run: changeAdminPwd } = useRequest(
    (params) => resetAdminsPwd(params),
    {
      // 手动触发
      manual: true,
      onSuccess(data: ISwitchRes_Type) {
        message.success(data.msg);
        // 重新渲染页面
        setRefreshFlag((prev) => prev + 1);
      },
      onError(err) {
        message.error(err.message || '重置密码失败，请稍后再试');
      },
    },
  );

  function getItems(record: IAdminsSearchType): MenuProps['items'] {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <Link to={`/user/edit/update/?${qs.stringify(record)}`}>
            <div>修改</div>
          </Link>
        ),
      },
      {
        key: '2',
        label: (
          <div
            onClick={() =>
              changeAdminStatus({
                adminNo: record.adminNo,
                status: Number(!record.status),
              })
            }
          >
            启用
          </div>
        ),
        disabled: record.status === 1,
      },
      {
        key: '3',
        label: (
          <div
            onClick={() =>
              changeAdminStatus({
                adminNo: record.adminNo,
                status: Number(!record.status),
              })
            }
          >
            禁用
          </div>
        ),
        disabled: record.status === 0,
      },
      {
        key: '4',
        label: (
          <div onClick={() => changeAdminPwd({ adminNo: record.adminNo })}>
            重置密码
          </div>
        ),
      },
    ];
    return items;
  }

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
      const result = await getAdminsList({
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
  }, [paginationConfig.current, paginationConfig.pageSize, refreshFlag]);

  useEffect(() => {
    fetchData(defaultSearchParams);
  }, []);

  return (
    <>
      <PageContainer
        header={{
          title: '管理员列表',
        }}
      >
        {/* 查询表单 */}
        <Form
          form={form}
          layout="inline"
          onFinish={onSearch}
          initialValues={{ status: null }}
          autoComplete="off"
          size="large"
          style={{ gap: 4 }}
        >
          {/* 代理编号 */}
          <Form.Item name="adminNo">
            <Input placeholder="管理员编号" style={{ width: 180 }} />
          </Form.Item>

          {/* 账号 */}
          <Form.Item name="adminName">
            <Input placeholder="账号" style={{ width: 180 }} />
          </Form.Item>

          {/* 手机号 */}
          <Form.Item name="mobileNumber">
            <Input placeholder="手机号" style={{ width: 180 }} />
          </Form.Item>

          {/* 昵称 */}
          <Form.Item name="realName">
            <Input placeholder="昵称" style={{ width: 180 }} />
          </Form.Item>

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

          {/* 操作按钮 */}
          <Form.Item>
            <Row gutter={16} className=" mt-[12px]">
              <Col>
                <Button onClick={onReset}>取消</Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#7265e6',
                    borderColor: '#7265e6',
                    color: '#fff',
                  }}
                >
                  搜索
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>

        {/* 分割线 */}
        <Divider
          style={{ borderColor: '#e8e8e8', marginBlockEnd: 0, height: 2 }}
        ></Divider>

        {/*  表格上方操作栏  */}
        <ActionTableMenu />

        {/* 表格 */}
        <Table
          columns={columns}
          dataSource={data}
          bordered={true}
          sticky={true}
          virtual={false}
          size="middle"
          rowHoverable={true}
          rowSelection={rowSelection}
          rowKey={(record) => record.adminNo}
          pagination={{
            align: 'end',
            pageSize: paginationConfig.pageSize,
            responsive: true,
            current: paginationConfig.current,
            total: paginationConfig.count,
            showQuickJumper: true,
            showTitle: true,
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

export default AdminsList;
