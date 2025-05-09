import { filterObject } from '@/utils/filter';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Col, Form, Input, Row, Select } from 'antd';

/** 查询表单参数类型 */
interface searchFormValuesType {
  userNo?: string;
  nickName?: string;
  mobileNumber?: string;
  status?: number;
  current: number;
  pageSize: number;
}

/** 用户列表主组件 */
const UsersList = () => {
  /** 查询表单实例 */
  const [form] = Form.useForm<searchFormValuesType>();

  /** 查询表单搜索后的回调 */
  const onSearch = async (values: any) => {
    const searchParams = filterObject(values);
    console.log(searchParams);
  };

  /** 重置表单 */
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <PageContainer
        header={{
          title: '用户列表',
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
          <Row gutter={12}>
            <Col>
              {/* 代理编号 */}
              <Form.Item name="userNo">
                <Input placeholder="用户编号" style={{ width: 180 }} />
              </Form.Item>
            </Col>
            <Col>
              {/* 昵称 */}
              <Form.Item name="nickName">
                <Input placeholder="昵称" style={{ width: 180 }} />
              </Form.Item>
            </Col>
            <Col>
              {/* 手机号 */}
              <Form.Item name="mobileNumber">
                <Input placeholder="手机号" style={{ width: 180 }} />
              </Form.Item>
            </Col>

            <Col>
              {/* 状态筛选 */}
              <Form.Item name="status">
                <Select
                  placeholder="状态"
                  style={{ width: 190 }}
                  options={[
                    { value: null, label: '状态：全部' },
                    { value: 1, label: '状态：启用' },
                    { value: 0, label: '状态：禁用' },
                  ]}
                />
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
          </Row>
        </Form>
      </PageContainer>
    </>
  );
};

export default UsersList;
