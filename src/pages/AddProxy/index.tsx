import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button, Form, Input, Radio, Typography } from 'antd';
const AddProxy = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('提交数据:', values);
    // 这里添加提交逻辑
  };
  return (
    <>
      <div
        style={{
          maxWidth: 500,
          padding: 20,
        }}
      >
        <Typography.Title level={3} style={{ marginBottom: 24 }}>
          <Link to={'/user/agents'}>
            <ArrowLeftOutlined className="text-[20px] text-[#666] hover:text-[#7265e6] mr-[6px] cursor-pointer  transition-all" />{' '}
          </Link>
          新增代理
        </Typography.Title>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'enabled' }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* 账户名称 */}
          <Form.Item
            label="账户名称"
            name="account"
            rules={[{ required: true, message: '请输入账户名称' }]}
          >
            <Input size="large" placeholder="请输入账户名称" />
          </Form.Item>

          {/* 真实姓名 */}
          <Form.Item label="真实姓名" name="realname">
            <Input size="large" placeholder="请输入真实姓名" />
          </Form.Item>

          {/* 手机号 */}
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>

          {/* 是否启用 */}
          <Form.Item label="是否启用" name="status">
            <Radio.Group size="large">
              <Radio value="enabled">启用</Radio>
              <Radio value="disabled">禁用</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#7265e6',
                borderColor: '#7265e6',
                height: 40,
              }}
            >
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddProxy;
