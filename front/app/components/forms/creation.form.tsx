'use client';

import { Col, DatePicker, Form, Input, Row, Select } from "antd";

class CreationFormProps {
    config: any[] = []
}

const CreationForm = ({config}: CreationFormProps) => {
    return (
        <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter user name' }]}
                        >
                        <Input placeholder="Please enter user name" />
                    </Form.Item>
                </Col>
            <Col span={12}>
            <Form.Item
            name="url"
            label="Url"
            rules={[{ required: true, message: 'Please enter url' }]}
            >
            <Input
            style={{ width: '100%' }}
            addonBefore="http://"
            addonAfter=".com"
            placeholder="Please enter url"
            />
            </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
            <Form.Item
            name="owner"
            label="Owner"
            rules={[{ required: true, message: 'Please select an owner' }]}
            >

            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please choose the type' }]}
            >

            </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={12}>
            <Form.Item
            name="approver"
            label="Approver"
            rules={[{ required: true, message: 'Please choose the approver' }]}
            >

            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
            name="dateTime"
            label="DateTime"
            rules={[{ required: true, message: 'Please choose the dateTime' }]}
            >
            <DatePicker.RangePicker
            style={{ width: '100%' }}
            getPopupContainer={(trigger) => trigger.parentElement!}
            />
            </Form.Item>
            </Col>
            </Row>
            <Row gutter={16}>
            <Col span={24}>
            <Form.Item
            name="description"
            label="Description"
            rules={[
                {
                    required: true,
                        message: 'please enter url description',
                        },
                        ]}
                        >
                        <Input.TextArea rows={4} placeholder="please enter url description" />
                        </Form.Item>
                        </Col>
                        </Row>
                        </Form>
    );
}

export default CreationForm;