import {
  resetPwdProxyOfList,
  searchProxyOfList,
  updateProxyOfListUser,
} from '@/services/user/ProxyOfList/api';
import { formatDateTime } from '@/utils/format';
import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Icon } from '@iconify/react';
import { Link, useRequest } from '@umijs/max';
import type { MenuProps, TableProps } from 'antd';
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
} from 'antd';
import { clsx } from 'clsx';
import qs from 'qs';
import { useEffect, useState } from 'react';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const ProxyOfList = () => {
  /** 修改用户状态 */
  const changeStatus = (params: { status: number; agentNo: string }) => {
    // 使用布尔取反再转数字，实现简洁的状态翻转
    params.status = Number(!params.status);
    // 修改管理员用户数据，还需要发送请求
    updateProxyOfListUser(params)
      .then((result) => {
        message.success(result.msg);
        /** 刷新表格 */
        setIsRefreshTable((state) => !state);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  /** 重置密码 */
  const resetPwd = (params: string) => {
    resetPwdProxyOfList(params)
      .then((result) => {
        message.success(result.msg);
        /** 刷新表格 */
        setIsRefreshTable((state) => !state);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  function getItems(record: ProxyOfListAPI.Datum): MenuProps['items'] {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <Link to={`/agent/edit/update?${qs.stringify(record)}`}>
            <div>修改</div>
          </Link>
        ),
      },
      {
        key: '2',
        label: (
          <div
            onClick={() =>
              changeStatus({ status: record.status, agentNo: record.agentNo })
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
              changeStatus({ status: record.status, agentNo: record.agentNo })
            }
          >
            禁用
          </div>
        ),
        disabled: record.status === 0,
      },
      {
        key: '4',
        label: <div onClick={() => resetPwd(record.agentNo)}>重置密码</div>,
      },
    ];
    return items;
  }

  /* -------------------------------------------------------------------------- */

  /** 列表用户信息（一条） */
  const [proxyOfListUser, setProxyOfListUser] = useState<
    Partial<ProxyOfListAPI.Datum>
  >({});

  /** 查询表单实例 */
  const [form] = Form.useForm();

  const onSearch = (values: ProxyOfListAPI.searchProxyOfListParams) => {
    // 这里添加搜索逻辑
    searchProxyOfList({
      ...values,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    })
      .then((result) => {
        console.log(result);
        const { current, pageSize, count, totalPages } = result.data;
        message.success(result.msg);
        setData(result.data.data);
        setPaginationConfig({
          current,
          pageSize,
          count,
          totalPages,
        });
      })
      .catch((err) => {
        message.error(err);
      });
  };

  /** 重置表单 */
  const [isResetForm, setIsResetForm] = useState(false);
  const onReset = () => {
    form.resetFields();
    setIsResetForm((state) => !state);
  };

  /* -------------------------------------------------------------------------- */
  // 表格配置项
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ProxyOfListAPI.Datum> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  /* -------------------------------------------------------------------------- */

  const { loading, run } = useRequest((params) => searchProxyOfList(params), {
    manual: true,
  });

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

  /** 刷新表格数据 */
  const [isRefreshTable, setIsRefreshTable] = useState(false);

  useEffect(() => {
    run({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    })
      .then((result) => {
        const { count, current, pageSize, totalPages } = result.data;
        setPaginationConfig({
          count,
          current,
          pageSize,
          totalPages,
        });
        setData(result.data.data);
      })
      .catch((err) => {
        message.error(err);
      });
  }, [
    paginationConfig.current,
    paginationConfig.pageSize,
    isRefreshTable,
    isResetForm,
  ]);

  /** 表格列配置 */
  const columns: TableProps<ProxyOfListAPI.Datum>['columns'] = [
    {
      title: '编号',
      dataIndex: 'agentNo',
      key: 'agentNo',
    },
    {
      title: '账号',
      dataIndex: 'agentAccount',
      key: 'agentAccount',
      render: (text, row, index) => {
        return (
          <span>
            {row.agentAccount} <br />
            初始密码： {row.defaultPwd}
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
  const [data, setData] = useState<ProxyOfListAPI.Datum[]>([]);

  return (
    <>
      <PageContainer
        header={{
          title: '代理列表',
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
          <Form.Item name="agentNo">
            <Input placeholder="代理编号" style={{ width: 180 }} />
          </Form.Item>

          {/* 账号 */}
          <Form.Item name="agentAccount">
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

        <div className="flex h-[70px] items-center  justify-between w-full ">
          <Link to={'/addProxy'}>
            <Button size="large" type="primary">
              添加代理
            </Button>
          </Link>
          <div
            onClick={() => setIsRefreshTable((prev) => !prev)}
            className="w-[40px] flex h-[40px]  shadow-[0_0.2em_0_0.1em_#3f3f3f] hover:shadow-[0_0_0_0_#3f3f3f]  rotate-x-2 transition-all border rounded-md  cursor-pointer justify-center items-center border-[#000] "
          >
            <Icon
              icon="ion:reload-outline"
              className=" text-[30px] text-[#2a86ff]"
            />
          </div>
        </div>

        {/* 表格 */}
        <Table<ProxyOfListAPI.Datum>
          columns={columns}
          dataSource={data}
          bordered={true}
          sticky={true}
          virtual={false}
          size="middle"
          rowSelection={rowSelection}
          rowKey={(record) => record.agentNo}
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
        />
      </PageContainer>
    </>
  );
};
export default ProxyOfList;
