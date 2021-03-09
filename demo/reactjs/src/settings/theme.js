import { Button, Form, message, Radio } from 'antd';
import React, { useContext, useState } from 'react';
import { Context } from '../Context';

export default function Theme({theme}) {
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    layout: "vertical"
  };
  const tailLayout = {
      style: {
          marginBottom: 8
      }
  };
  const onFinish = (values) => {
    setLoading(true);
    context.saveThemeInfo(values);
    setTimeout(() => {
      setLoading(false);
      message.success('Updated successfully!');
    }, 100);
  };

  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={context.theme}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      >
      <Form.Item
        {...tailLayout}
        label="Theme"
        name="theme"
        rules={[{ required: true, message: 'Please select theme!' }]}
      >
        <Radio.Group>
          <Radio value="theme-1">Theme 1</Radio>
          <Radio value="theme-2">Theme 2</Radio>
          <Radio value="theme-3">Theme 3</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        {...tailLayout}
        label="Layout"
        name="layout"
        rules={[{ required: true, message: 'Please select layout!' }]}
      >
        <Radio.Group>
          <Radio value="layout-1">Layout 1</Radio>
          <Radio value="layout-2">Layout 2</Radio>
          <Radio value="layout-3">Layout 3</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item {...tailLayout}>
          <Button loading={loading} type="primary" htmlType="submit">
              Save
          </Button>
      </Form.Item>
    </Form>
  )
}