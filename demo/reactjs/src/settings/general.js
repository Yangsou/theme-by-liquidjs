import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { Context } from '../Context';

export default function General({general}) {
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
        console.log('Success:', values);
        setLoading(true);
        context.saveGeneralInfo(values);
        setTimeout(() => {
            setLoading(false);
        }, 100);
    };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            {...layout}
            name="basic"
            initialValues={general}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                {...tailLayout}
                label="Brand"
                name="brand"
                rules={[{ required: true, message: 'Please input your brand!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                {...tailLayout}
                label="Slogan"
                name="slogan"
                rules={[{ required: true, message: 'Please input your slogan!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                {...tailLayout}
                label="Description"
                name="description"
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button loading={loading} type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}