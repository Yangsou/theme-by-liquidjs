import { Button, Modal, Tabs } from 'antd';
import React, { useState } from 'react';
import {SettingOutlined} from '@ant-design/icons';
import General from './general';
import Theme from './theme';

export default function Settings({general, theme, logo}) {
    const [visible, setVisible] = useState(false);
    const handleOk = () => {
        //
    }
    const handleCancel = () => {
        setVisible(false);
    }
    const showModal = () => {
        setVisible(true);
    };
    function callback(key) {
        console.log(key);
    }
    
    return (
        <>
            <Button
                type="primary"
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20
                }}
                shape="circle"
                icon={<SettingOutlined />}
                onClick={showModal}>
            </Button>
            <Modal
                title="Settings"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
                bodyStyle={{
                    paddingTop: 0
                }}
                footer={null}
            >
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <Tabs.TabPane tab="General" key="1">
                        <General logo={logo} general={general} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Theme" key="2">
                        <Theme theme={theme} />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
        </>
    )
}