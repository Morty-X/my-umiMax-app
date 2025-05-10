import {
  getOrderFeeData,
  updateOrderFeeData,
} from '@/services/Order/FeeChoiceConfig/api';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Form,
  InputNumber,
  message,
  type FormListFieldData,
} from 'antd';
import { useEffect, type FC } from 'react';

interface FormValuesType {
  feeTips: number[];
  agentExtract: number;
  platformExtract: number;
}

/** 删除按钮组件 */
const DeleteButton = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <DeleteOutlined
      aria-label="删除规则"
      role="button"
      onClick={onRemove}
      className="p-2 mb-5 text-white bg-red-500 rounded-full cursor-pointer "
    />
  );
};

/** 添加按钮组件 */
const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="dashed"
      onClick={onClick}
      className="h-[40px] w-[100px]  mb-[25px]"
      icon={<PlusOutlined />}
    >
      添加一项
    </Button>
  );
};

/**
 * 数字输入组件
 * 用于表单中需要输入数字的小费选项字段
 * @param {Object} props 组件属性
 * @param {FormListFieldData} props.field 表单字段数据，包含字段的名称、ID等信息
 * @returns {JSX.Element} 渲染后的数字输入组件
 */
const NumberInput = ({ field }: { field: FormListFieldData }) => {
  // field 字段用于支持动态表单项的正确渲染和管理。
  // 返回一个表单项，用于输入数字
  const { key, ...restField } = field;
  return (
    <Form.Item
      {...restField}
      name={[field.name]}
      rules={[
        {
          required: true,
          message: '请输入小费选项',
        },
      ]}
      initialValue={0}
    >
      <InputNumber className="w-72 h-[38px]" />
    </Form.Item>
  );
};
/** 通用带标签的数字输入组件 */
const LabeledNumberInput = ({
  label,
  name,
  rules = [],
  initialValue,
}: {
  label: string; // 标签文字
  name: string | number | (string | number)[]; // 表单字段名称
  rules?: any[]; // 校验规则
  initialValue?: number; // 初始值
}) => {
  return (
    <Form.Item
      label={<p className="leading-[30px]">{label}</p>}
      name={name}
      rules={rules}
      initialValue={initialValue}
    >
      <InputNumber className="w-80 h-[38px]" />
    </Form.Item>
  );
};

const FeeChoiceConfig: FC = () => {
  const [form] = Form.useForm<FormValuesType>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getOrderFeeData();
        if (res.code === 200) {
          form.setFieldsValue(res.data);
        }
      } catch (error) {
        message.error(`数据加载失败`);
      }
    };
    loadData();
  }, [form]);
  const onFinish = async (values: any) => {
    try {
      await updateOrderFeeData(values);
      message.success('配置保存成功');
    } catch (error) {
      message.error('保存失败，请重试');
    }
  };
  return (
    <>
      <PageContainer
        header={{
          title: '小费选择配置',
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          hideRequiredMark={true}
          layout="vertical"
        >
          <Form.List name="feeTips">
            {(fields, { add, remove }) => (
              <>
                <p className="pb-2">小程序端展示的小费选项：</p>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="flex items-center mb-2 gap-x-3"
                  >
                    <NumberInput field={field} />
                    <DeleteButton onRemove={() => remove(field.name)} />
                  </div>
                ))}
                <AddButton onClick={() => add()} />
              </>
            )}
          </Form.List>

          <LabeledNumberInput
            label="平台抽成"
            name="platformExtract"
            rules={[{ required: true, message: '请输入平台抽成' }]}
          />
          {/* 可以复用到其他字段 */}
          <LabeledNumberInput
            label="代理抽成"
            name="agentExtract"
            rules={[{ required: true, message: '请输入代理抽成' }]}
            initialValue={0}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              提交保存
            </Button>
          </Form.Item>
        </Form>
      </PageContainer>
    </>
  );
};
export default FeeChoiceConfig;
