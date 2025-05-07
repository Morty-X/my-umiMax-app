import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input } from 'antd';

const UpdatePersonalPwd = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // 这里添加提交逻辑
  };
  return (
    <>
      <PageContainer
        header={{
          title: '修改密码',
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          wrapperCol={{ span: 14 }}
        >
          {/* 旧密码 */}
          <Form.Item
            label="旧密码："
            name="oldPassword"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input.Password placeholder="请输入旧密码" size="large" />
          </Form.Item>

          {/* 新密码 */}
          <Form.Item
            label="新密码："
            name="newPassword"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password placeholder="请输入新密码" size="large" />
          </Form.Item>

          {/* 确认密码 */}
          <Form.Item
            label="确认密码："
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#7265e6',
                borderColor: '#7265e6',
                marginTop: 24,
              }}
              size="large"
            >
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    </>
  );
};
export default UpdatePersonalPwd;
