'use client';

import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import { CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { FirstNameGroup } from "@/models/name";

const CreateFirstNameForm = ({groups, save}: {groups: FirstNameGroup[], save: Function}) => {
    const [form] = Form.useForm();
    const [valid, setValid] = useState(false);
    const values = Form.useWatch([], form);
    const [group, setGroup] = useState<"create"|"select">("select")

    const groupAssignmentOptions: CheckboxGroupProps<string>['options'] = [
        { label: 'Assign to existing group', value: 'select' },
        { label: 'Create a new one', value: 'create' },
    ];

    useEffect(() => {
        form.getFieldValue("name")
        ? setValid(true)
        : setValid(false);
    }, [form, values]);

    const onFormSubmit = () => {
        save(form.getFieldsValue());
        form.setFieldValue("name", "")
        form.setFieldValue("group", "")
    }

    const handleGroupRadioChange = (event: any) => {
        switch(event.target.value) {
            case "create":
                setGroup("create");
                break;
            case "select":
                setGroup("select");
                break;
        }
    }

    return (
        <>
            <Form
                form={form}
            >              
                <Row gutter={24}>
                    <Col span={22}>
                        <Row>
                            <Form.Item name="name" required  className="w-full">
                                <Input placeholder="Name" />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item>
                                <Radio.Group options={groupAssignmentOptions} onChange={handleGroupRadioChange} value={group} />
                            </Form.Item>
                        </Row>
                        <Row>
                            {
                                group === "select"
                                ? <Form.Item name="group" required={group==="select"}>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ width: 200 }}
                                        placeholder="Search to Select"
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={groups.map(group=>({...group, label: group.group?.map(name=>name.name).join(', '), value: group._id}))}
                                    />
                                </Form.Item>
                                : null
                            }
                        </Row>
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

export default CreateFirstNameForm;