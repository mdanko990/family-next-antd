'use client';

import { Button, Col, Form, Input, Row } from "antd";
import { CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

const CreateLastnameForm = ({save}: {save: Function}) => {
    const [form] = Form.useForm();
    const [valid, setValid] = useState(false);
    const values = Form.useWatch([], form);

    const onFormSubmit = () => {
        save(form.getFieldsValue());
        form.setFieldValue("male", "")
        form.setFieldValue("female", "")
    }

    useEffect(() => {
        form.getFieldValue("male") && form.getFieldValue("female")
        ? setValid(true)
        : setValid(false);
    }, [form, values]);

    return (
        <>
            <Form
                form={form}
            >              
                <Row gutter={8}>
                    <Col span={11}>
                        <Form.Item name="male" required>
                            <Input placeholder="Male variation" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="female" required>
                            <Input placeholder="Female variation" />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="primary" shape="circle" icon={<CheckOutlined />} disabled={!valid} onClick={onFormSubmit}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default CreateLastnameForm;