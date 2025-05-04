'use client';

import { Button, Col, Form, Input, Row } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { createLastName } from "../lib/lastnames";

const CreateLastnameForm = ({close}: {close: Function}) => {
    const [form] = Form.useForm();
    const [valid, setValid] = useState(false);
    const values = Form.useWatch([], form);

    const onFormSubmit = () => {
        createLastName(form.getFieldsValue());
        close();
    }

    const onClose = () => {
        close();
    }

    useEffect(() => {
        form.getFieldValue("name")
        ? setValid(true)
        : setValid(false);
    }, [form, values]);

    return (
        <>
            <Form
                form={form}
            >              
                <Row gutter={2}>
                    <Col>
                        <Form.Item name="name" required>
                            <Input placeholder="Enter new lastname" />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="primary" shape="circle" icon={<CheckOutlined />} disabled={!valid} onClick={onFormSubmit}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="text" color="primary" onClick={onClose}>Close</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default CreateLastnameForm;