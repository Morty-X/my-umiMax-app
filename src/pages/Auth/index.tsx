import { getVerifyCode, loginService } from '@/services';
import {
  LockOutlined,
  UserOutlined,
  VerifiedOutlined,
} from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useEffect, type FC } from 'react';

// UI函数会因为状态的改变而重新渲染
const Auth: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  /* -------------------------------------------------------------------------- */
  const {
    data: verifyCodeData,
    loading: verifyLoading,
    error: verifyError,
    refresh: refreshVerifyCode,
  } = useRequest(getVerifyCode, {
    onSuccess(data) {
      console.log(data);
    },
    onError() {
      // 报错弹框
      messageApi.open({
        type: 'success',
        content: '获取验证码成功',
      });
    },
  });

  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    console.log('verifyCodeData:', verifyCodeData);
  }, [verifyCodeData]);

  /* -------------------------------------------------------------------------- */
  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
  } = useRequest(loginService, { manual: true });
  /* -------------------------------------------------------------------------- */
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (verifyCodeData?.no) {
      loginService({ ...values, no: verifyCodeData?.no });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  /* -------------------------------------------------------------------------- */
  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center ">
        <h1 className="my-[30px]  flex  select-none">
          <svg
            className=" w-[45px] h-[30px]"
            viewBox="0 0 45 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7203 29.704H41.1008C41.6211 29.7041 42.1322 29.5669 42.5828 29.3061C43.0334 29.0454 43.4075 28.6704 43.6675 28.2188C43.9275 27.7672 44.0643 27.2549 44.0641 26.7335C44.0639 26.2121 43.9266 25.6999 43.6662 25.2485L32.6655 6.15312C32.4055 5.70162 32.0315 5.32667 31.581 5.06598C31.1305 4.8053 30.6195 4.66805 30.0994 4.66805C29.5792 4.66805 29.0682 4.8053 28.6177 5.06598C28.1672 5.32667 27.7932 5.70162 27.5332 6.15312L24.7203 11.039L19.2208 1.48485C18.9606 1.03338 18.5864 0.658493 18.1358 0.397853C17.6852 0.137213 17.1741 0 16.6538 0C16.1336 0 15.6225 0.137213 15.1719 0.397853C14.7213 0.658493 14.3471 1.03338 14.0868 1.48485L0.397874 25.2485C0.137452 25.6999 0.000226653 26.2121 2.8053e-07 26.7335C-0.000226092 27.2549 0.136554 27.7672 0.396584 28.2188C0.656614 28.6704 1.03072 29.0454 1.48129 29.3061C1.93185 29.5669 2.44298 29.7041 2.96326 29.704H13.2456C17.3195 29.704 20.3239 27.9106 22.3912 24.4118L27.4102 15.7008L30.0986 11.039L38.1667 25.0422H27.4102L24.7203 29.704ZM13.0779 25.0374L5.9022 25.0358L16.6586 6.36589L22.0257 15.7008L18.4322 21.9401C17.0593 24.2103 15.4996 25.0374 13.0779 25.0374Z"
              fill="#955ce6"
            ></path>
          </svg>
          <span className="ml-[20px] font-[26px] bold-500">
            {' '}
            一秒快送后台管理系统
          </span>
        </h1>
        <div className=" w-[800px] flex h-[450px]  shadow-login_boxShadow rounded-[8px]   ">
          <div className="w-[360px] flex justify-center  items-center h-full ">
            <img
              src={'/src/assets/images/login.png'}
              className=" w-[360px] h-[360px]"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
            <h1 className="select-none ">账号密码登录</h1>
            <Form
              name="login_form"
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              size="large"
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="adminName"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input placeholder="管理员账号" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="adminPwd"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password
                  autoComplete="on"
                  placeholder="管理员密码"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="verifyCode"
                className=""
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Row justify="center" gutter={2} align="top">
                  <Col span={18}>
                    <Input
                      name="verifyCode"
                      placeholder="输入验证码"
                      prefix={<VerifiedOutlined />}
                    />
                  </Col>

                  <Col span={6}>
                    <div
                      className=" w-[80px] h-[50px] flex-1 cursor-pointer"
                      dangerouslySetInnerHTML={{
                        __html: verifyCodeData?.data.svg as string,
                      }}
                    ></div>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  className=" bg-[#955ce6]"
                  block
                  htmlType="submit"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="mt-[40px] text-center  text-[#666] text-[12px] ">
          Copyright © 2022 包小盒 All right reserved.
        </div>
        <div className="text-[14px] text-center mt-[8px]   text-[#333]">
          浙ICP备19025175号-4 aaa浙公网安备 33010602011191号
        </div>
      </div>
    </>
  );
};

export default Auth;
