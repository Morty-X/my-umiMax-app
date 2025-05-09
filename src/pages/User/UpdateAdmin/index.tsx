import type { Datum } from '@/services/user/AdminsList/types';
import { updateAdminInfo } from '@/services/user/AdminsList/UpdateAdmin/api';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, Link, useLocation } from '@umijs/max';
import { Button, Form, Input, message, Typography } from 'antd';
import qs from 'qs';
// 修改管理员
const UpdateAdmin = () => {
  const location = useLocation();
  const queryParamsObj: Partial<Datum> = qs.parse(
    location.search.replace('?', ''),
  );
  // 表单实例
  const [form] = Form.useForm();

  /** 表单提交后的回调函数 */
  const onFinish = (values: any) => {
    console.log('提交数据:', values);
    // 这里添加修改管理员信息的逻辑
    updateAdminInfo({
      ...values,
      adminNo: queryParamsObj.adminNo,
    })
      .then((result) => {
        message.success(result.msg);
        history.replace('/user/admins/');
        // 跳转
      })
      .catch((err) => {
        message.error(err.message || '修改管理员信息失败');
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
          <Link to={'/user/admins'}>
            <ArrowLeftOutlined className="text-[20px] text-[#666] hover:text-[#7265e6] mr-[6px] cursor-pointer  transition-all" />{' '}
          </Link>
          修改管理员
        </Typography.Title>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            adminName: queryParamsObj.adminName,
            realName: queryParamsObj.realName,
            mobileNumber: queryParamsObj.mobileNumber,
          }}
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
export default UpdateAdmin;
