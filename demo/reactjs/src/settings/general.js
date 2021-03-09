import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import React, { useContext, useState } from 'react';
import { Context } from '../Context';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

export default function General({general, logo}) {
    const [loading, setLoading] = useState(false);
    const [logoUrl, setLogoUrl] = useState('');
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
        context.saveGeneralInfo(values, logoUrl || logo);
        setTimeout(() => {
            setLoading(false);
            message.success('Updated successfully!');
        }, 100);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = file => {
        //
    }
    const customRequest = ({
        file,
        onSuccess,
      }) => {
        setTimeout(() => {
        getBase64(file, (result) => {
            setLogoUrl(result);
        })
        onSuccess('ok');
        }, 0);
    };
console.log(logo)
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={general}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* <Form.Item
                {...tailLayout}
                label="logo"
                valuePropName="fileList"> */}
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={customRequest}
                    onChange={({file}) => handleChange(file)}
                >
                    {logoUrl || logo ? <img src={logoUrl || logo} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            {/* </Form.Item> */}
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