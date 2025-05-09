import { addProxy } from '@/services/AddProxy/api';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button, Form, Input, message, Radio, Typography } from 'antd';
const AddProxy = () => {
  // 表单实例
  const [form] = Form.useForm();

  /** 表单提交后的回调函数 */
  const onFinish = (values: any) => {
    console.log('提交数据:', values);
    // 这里添加提交逻辑
    addProxy(values)
      .then((result) => {
        message.success(result.msg);
        // 接着重置表单
        form.resetFields();
      })
      .catch((err) => {
        message.error(err);
      });
  };
  return (
    <>
      <div
        style={{
          maxWidth: 500,
          paddingLeft: 20,
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
          initialValues={{ status: 1 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* 账户名称 */}
          <Form.Item
            label="账户名称"
            name="agentAccount"
            rules={[{ required: true, message: '请输入账户名称' }]}
          >
            <Input size="large" placeholder="请输入账户名称" />
          </Form.Item>

          {/* 真实姓名 */}
          <Form.Item
            label="真实姓名"
            name="realName"
            rules={[{ required: true, message: '请输入真实姓名' }]}
          >
            <Input size="large" placeholder="请输入真实姓名" />
          </Form.Item>

          {/* 手机号 */}
          <Form.Item
            label="手机号"
            name="mobileNumber"
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
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item style={{ marginTop: 20 }}>
            <Button type="primary" htmlType="submit">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddProxy;
