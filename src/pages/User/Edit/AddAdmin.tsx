import CommonFormTitle from '@/components/CommonFormTitle';
import { addAdminUser } from '@/services/user/Edit/api';
import { Button, Form, Input, message } from 'antd';
import type { FC } from 'react';

// 新增管理员
const AddAdminList: FC = () => {
  // 表单实例
  const [form] = Form.useForm();

  /** 表单提交后的回调函数 */
  const onFinish = (values: any) => {
    console.log('提交数据:', values);
    // 这里添加提交逻辑
    addAdminUser({ ...values })
      .then((result) => {
        message.success(result.msg);
      })
      .catch((err) => {
        message.error(err.message || '新增管理员失败');
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
        <CommonFormTitle title="新增管理员" linkTo="/user/admins/" />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* 账户名称 */}
          <Form.Item
            label="账户名称"
            name="adminName"
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

          <Form.Item style={{ marginTop: 20 }}>
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

export default AddAdminList;
