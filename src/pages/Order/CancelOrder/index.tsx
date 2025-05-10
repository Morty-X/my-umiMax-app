import {
  getOrderCancelState,
  updateOrderCancelConfig,
} from '@/commonApi/orderConcal';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Space,
  type FormInstance,
} from 'antd';
import FormList from 'antd/es/form/FormList';
import type { FormListFieldData } from 'antd/lib';
import { useEffect, type FC } from 'react';
interface CancelRule {
  timeRange: [number, number];
  price: number;
}
interface CancelTips {
  title: string;
  name: string;
}
interface FormValues {
  userCancelRules: CancelRule[];
  riderCancelRules: CancelRule[];
  userCancelTips: string[];
  riderCancelTips: string[];
  adminCancelTips: string[];
  agentCancelTips: string[];
}

// 配置常量
const CANCEL_TIPS_CONFIG: CancelTips[] = [
  {
    title: '用户取消订单选项配置',
    name: 'userCancelTips',
  },
  {
    title: '骑手取消订单选项配置：',
    name: 'riderCancelTips',
  },
  {
    title: '管理员取消订单选项配置：',
    name: 'adminCancelTips',
  },
  {
    title: '代理取消订单选项配置：',
    name: 'agentCancelTips',
  },
];

/** 删除按钮组件 */
const DeleteButton = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <DeleteOutlined
      aria-label="删除规则"
      role=" button"
      onClick={onRemove}
      className="p-2 text-white bg-red-500 rounded-full cursor-pointer"
    />
  );
};

/** 添加按钮组件 */
const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="dashed"
      onClick={onClick}
      className="h-[40px] w-[100px] "
      icon={<PlusOutlined />}
    >
      添加一项
    </Button>
  );
};

/** 时间范围输入组件 */
const TimeRangeInput = ({ field }: { field: FormListFieldData }) => {
  return (
    <>
      <Space>
        <Form.Item
          {...field}
          label="时间范围（分钟）："
          labelCol={{ span: 24 }}
          name={[field.name, 'timeRange', 0]}
          rules={[
            {
              required: true,
              message: '请输入起始时间',
            },
          ]}
        >
          <InputNumber className=" w-32 h-[38px]" />
        </Form.Item>
        <span className="">~</span>
        <Form.Item
          {...field}
          label=" "
          labelCol={{ span: 24 }}
          name={[field.name, 'timeRange', 1]}
          rules={[
            {
              required: true,
              message: '请输入结束时间',
            },
          ]}
        >
          <InputNumber className="w-32 h-[38px]" />
        </Form.Item>
      </Space>
    </>
  );
};

/** 价格输入组件 */
const PriceInput = ({ field }: { field: FormListFieldData }) => {
  return (
    <>
      <Form.Item
        {...field}
        label="超时费用比例："
        labelCol={{ span: 24 }}
        name={[field.name, 'price']}
        rules={[
          {
            required: true,
            message: '请输入费用比例',
          },
        ]}
      >
        <InputNumber className=" w-32 h-[38px]" />
      </Form.Item>
    </>
  );
};

/** 规则项组件 */
const RuleItem = ({
  field,
  remove,
}: {
  field: FormListFieldData;
  remove: (name: number) => void;
}) => {
  return (
    <>
      <Space key={field.name}>
        <TimeRangeInput field={field} />
        <PriceInput field={field} />
        <DeleteButton onRemove={() => remove(field.name)} />
      </Space>
    </>
  );
};

/** 规则表单列表组件 */
const RuleFormList = ({
  name,
  label,
  description,
  form,
}: {
  name: string;
  label: string;
  description: string;
  form: FormInstance<FormValues>; // 显式指定泛型类型
}) => {
  const fields = Form.useWatch(name, form) as CancelRule[] | undefined;
  const getLastRule = () => {
    if (!fields || fields.length === 0) return null;
    return fields[fields.length - 1];
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">{label}</h3>
        <p className="mb-4 text-gray-600">{description}</p>
        <FormList name={name}>
          {(fieldsList: FormListFieldData[], { add, remove }) => {
            return (
              <>
                {fieldsList.map((field) => (
                  <RuleItem key={field.key} field={field} remove={remove} />
                ))}
                <Form.Item>
                  <AddButton
                    onClick={() => {
                      const lastRule = getLastRule();
                      if (lastRule) {
                        // 根据上一条规则设置默认值：时间范围 +10 分钟，价格保持一致
                        const newTimeRange = [
                          lastRule.timeRange[0] + 3,
                          lastRule.timeRange[1] + 3,
                        ];
                        const newPrice = lastRule.price + 0.1;
                        add({ timeRange: newTimeRange, price: newPrice });
                      } else {
                        // 默认初始值
                        add({ timeRange: [0, 3], price: 0 });
                      }
                    }}
                  />
                </Form.Item>
              </>
            );
          }}
        </FormList>
      </div>
    </>
  );
};
/** 提示项组件 */
const TipsItem = ({
  field,
  remove,
}: {
  field: FormListFieldData;
  remove: (name: number) => void;
}) => (
  <Space key={field.key} align="baseline" className="flex mb-2">
    <Form.Item
      {...field}
      className="w-96"
      name={[field.name]}
      rules={[{ required: true, message: '请输入配置项' }]}
    >
      <Input className="h-10 " />
    </Form.Item>
    <DeleteButton onRemove={() => remove(field.name)} />
  </Space>
);

/** 提示表单列表组件 */
const TipsFormList = ({ name, title }: { name: string; title: string }) => (
  <div className="my-6">
    <h3 className="mb-4 text-lg font-semibold">{title}</h3>
    <Form.List name={name}>
      {(fields: FormListFieldData[], { add, remove }) => (
        <>
          {fields.map((field) => (
            <TipsItem key={field.key} remove={remove} field={field}></TipsItem>
          ))}
          <Form.Item>
            <AddButton onClick={() => add()} />
          </Form.Item>
        </>
      )}
    </Form.List>
  </div>
);

/** 主组件 */
const CancelOrderConfig: FC = () => {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getOrderCancelState();
        if (res.code === 200) {
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        message.error('数据加载失败');
      }
    };
    loadData();
  }, [form]);
  const onFinish = async (values: FormValues) => {
    console.log('🚀 ~ onFinish ~ values:', values);
    try {
      await updateOrderCancelConfig(values);
      message.success('配置保存成功');
    } catch (error) {
      message.error('保存失败，请重试');
    }
  };

  return (
    <>
      <PageContainer
        header={{
          title: '取消订单配置',
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          hideRequiredMark={true}
          layout="vertical"
        >
          <RuleFormList
            name="userCancelRules"
            label="用户取消订单规则"
            description="用户在订单状态为【已接单、配送中】时取消订单会触发此规则"
            form={form} // 👈 新增这一行
          />
          <RuleFormList
            name="riderCancelRules"
            label="骑手取消订单规则"
            description="骑手在订单状态为【已接单、配送中】时取消订单会触发此规则"
            form={form} // 👈 新增这一行
          />
          {CANCEL_TIPS_CONFIG.map((config) => (
            <TipsFormList
              key={config.name}
              name={config.name}
              title={config.title}
            />
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              保存配置
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    </>
  );
};
export default CancelOrderConfig;
