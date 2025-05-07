import { searchProxyOfList } from '@/services/user/ProxyOfList/api';
import { formatDateTime } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import type { TableProps } from 'antd';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
} from 'antd';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const ProxyOfList = () => {
  /** 查询表单实例 */
  const [form] = Form.useForm();

  const onSearch = (values: ProxyOfListAPI.searchProxyOfListParams) => {
    console.log('Search params:', values);
    // 这里添加搜索逻辑

    searchProxyOfList({ ...values, current: 1, pageSize: 10 })
      .then((result) => {
        message.success(result.msg);
        setData(result.data.data);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  /** 重置表单 */
  const onReset = () => {
    form.resetFields();
    setPaginationConfig({
      current: 1,
      pageSize: 10,
    });
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

  const [paginationConfig, setPaginationConfig] =
    useState<paginationConfigType>({
      current: 1,
      pageSize: 10,
    });

  useEffect(() => {
    run({ ...paginationConfig })
      .then((result) => {
        const { count, current, pageSize, totalPages } = result.data;
        console.log(result.data.data);
        setData(result.data.data);
        setPaginationConfig({
          count,
          current,
          pageSize,
          totalPages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [paginationConfig.current, paginationConfig.pageSize]);

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
      key: 'action',
      render: (_, record) => '操作列',
    },
  ];

  const [data, setData] = useState<ProxyOfListAPI.Datum[]>([]);

  /** 表格数据 */
  // const data: ProxyOfListAPI.Datum[] = [
  //   {
  //     agentNo: 'u6i-uaA9gcL6RzCe',
  //     agentAccount: "t'r特瑞特",
  //     mobileNumber: '13993658456',
  //     realName: '安抚哈哈',
  //     status: 0,
  //     createTime: '2023-05-31T08:33:33.399Z',
  //     updateTime: '2025-05-07T06:32:51.000Z',
  //     defaultPwd: '410066',
  //     updatedBy: 'oT4j49UfRBo5fAWN',
  //   },
  // ];

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
                { value: '', label: '状态：全部' },
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
        <Divider style={{ borderColor: '#393939' }}></Divider>
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
