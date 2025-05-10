import ActionTableMenu from '@/components/ActionTableMenu';
import AvatarInTable from '@/components/AvatarInTable';
import { formatDateTime } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
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
  type TableProps,
} from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useState, type FC } from 'react';
/** 新增一位骑手的逻辑 */
const addOneRider = () => {
  message.info(`新增一位骑手`);
};
const RiderList: FC = () => {
  const [form] = Form.useForm<any>();
  const onFinish = async (values: any) => {
    console.log('🚀 ~ onFinish ~ values:', values);
  };
  /** 重置表单 */
  const onReset = () => {
    // form.resetFields();
  };
  /* -------------------------------------------------------------------------- */
  /** 表格数据 */
  const [data, setData] = useState<any[]>([]);
  /** 表格列配置 */
  const columns: TableProps<any>['columns'] = [
    {
      title: '编号',
      dataIndex: 'riderNo',
      key: 'riderNo',
    },
    {
      title: '用户',
      dataIndex: 'id',
      key: 'id',
      render: (text, row, index) => {
        return <AvatarInTable row={row} />;
      },
    },
    {
      title: '账户余额',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '开启接单',
      dataIndex: 'startReceive',
      key: 'startReceive',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
            <Button>···</Button>
          </div>
        </>
      ),
    },
  ];
  // 表格多选框一列配置
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <PageContainer
        header={{
          title: '骑手列表',
        }}
      >
        <Form form={form} onFinish={onFinish} initialValues={{ status: null }}>
          <Row gutter={12}>
            {/* 第一行表单项 */}
            <Col span={6}>
              <Form.Item label="" name="riderNo">
                <Input placeholder="骑手编号" allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="" name="userNo">
                <Input placeholder="用户编号" allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="" name="realname">
                <Input placeholder="真实姓名" allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="" name="idCardNo">
                <Input placeholder="身份证号码" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label=""
                name="mobileNumber"
                rules={[
                  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
                ]}
              >
                <Input placeholder="手机号" allowClear />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status">
                <Select
                  options={[
                    { value: null, label: '状态：全部' },
                    { value: 1, label: '状态：启用' },
                    { value: 0, label: '状态：禁用' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* 操作按钮 */}
          <Form.Item>
            <Row gutter={16}>
              <Col>
                <Button htmlType="reset" onClick={onReset}>
                  取消
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        <Divider
          style={{ borderColor: '#e8e8e8', marginBlockEnd: 0, marginTop: 0 }}
        ></Divider>
        <ActionTableMenu todoSomeThing={addOneRider} btnText="新增一位骑手" />
        {/* 分割线 */}

        <Table
          size="small"
          columns={columns}
          dataSource={data}
          bordered={true}
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
        ></Table>
      </PageContainer>
    </>
  );
};
export default RiderList;
