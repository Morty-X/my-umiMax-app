import { PageContainer } from '@ant-design/pro-components';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import type { FC } from 'react';

const RiderVerify: FC = () => {
  const [form] = Form.useForm<any>();
  const onFinish = async (values: any) => {
    console.log('🚀 ~ onFinish ~ values:', values);
  };

  return (
    <>
      <PageContainer
        header={{
          title: '骑手审核列表',
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Row gutter={24}>
            {/* 第一行表单项 */}
            <Col span={6}>
              <Form.Item label="骑手编号" name="riderId">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="用户编号" name="userId">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="真实姓名" name="realName">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="身份证号码" name="idNumber">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            {/* 第二行表单项 */}
            <Col span={6}>
              <Form.Item
                label="手机号"
                name="phone"
                rules={[
                  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' },
                ]}
              >
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="状态" name="status">
                <Select
                  options={[
                    { value: 'all', label: '全部' },
                    { value: 'active', label: '启用' },
                    { value: 'inactive', label: '禁用' },
                  ]}
                />
              </Form.Item>
            </Col>

            {/* 操作按钮 */}
            <Col>
              <Button htmlType="reset">取消</Button>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Col>
          </Row>
        </Form>
      </PageContainer>
    </>
  );
};
export default RiderVerify;
