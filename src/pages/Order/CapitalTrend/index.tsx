import ActionTableMenu from '@/components/ActionTableMenu';
import { filterObject } from '@/utils/filter';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Table,
  type TableProps,
} from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useState, type FC } from 'react';
const CapitalTrend: FC = (params) => {
  /** 查询表单实例 */
  const [form] = Form.useForm<any>();

  /** 查询表单搜索后的回调 */
  const onSearch = async (values: any) => {
    const searchParams = filterObject(values);
  };

  /** 重置表单 */
  const onReset = () => {
    form.resetFields();
  };
  // 左边复选框 配置项
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 50,
  };
  const columns: TableProps<any>['columns'] = [
    {
      title: '订单编号',
      key: 'orderNo',
      dataIndex: 'orderNo',
      width: 60,
    },
    {
      title: '平台收入',
      key: 'platRefound',
      dataIndex: 'platRefound',
      width: 100,
    },
    {
      title: '代理收入',
      key: 'platRefound',
      dataIndex: 'platRefound',
      width: 100,
    },
    {
      title: '骑手收入',
      key: 'riderRefound',
      dataIndex: 'riderRefound',
      width: 100,
    },
    {
      title: '描述',
      key: 'desc',
      dataIndex: 'desc',
      width: 100,
    },
    {
      title: '时间',
      key: 'time',
      dataIndex: 'time',
      width: 100,
    },
  ];
  return (
    <>
      <PageContainer
        header={{
          title: '资金走向列表',
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
              {/* 订单编号 */}
              <Form.Item name="orderNo">
                <Input placeholder="订单编号" style={{ width: 180 }} />
              </Form.Item>
            </Col>
            <Col>
              {/* 订单编号 */}
              <Form.Item name="proxyNo">
                <Input placeholder="代理编号" style={{ width: 180 }} />
              </Form.Item>
            </Col>
            <Col>
              {/* 城市编号 */}
              <Form.Item name="cityNo">
                <Input placeholder="城市编号" style={{ width: 180 }} />
              </Form.Item>
            </Col>
            <Col>
              {/* 描述 */}
              <Form.Item name="desc">
                <Input placeholder="描述" style={{ width: 180 }} />
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
        <ActionTableMenu onFreshTable={() => 1} />
        <Table bordered rowSelection={rowSelection} columns={columns}></Table>
      </PageContainer>
    </>
  );
};
export default CapitalTrend;
