'use client';

import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import { CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { FirstNameGroup, Gender } from "@/models/name";
import SearchSelect from "@/app/components/search-select";

const CreateFirstNameForm = ({groups, save}: {groups: FirstNameGroup[], save: Function}) => {
    const [form] = Form.useForm();
    const [valid, setValid] = useState(false);
    const values = Form.useWatch([], form);
    const [group, setGroup] = useState<"create"|"select">("select")

    const groupAssignmentOptions: CheckboxGroupProps<string>['options'] = [
        { label: 'Assign to existing group', value: 'select' },
        { label: 'Create a new one', value: 'create' },
    ];

    const genderOptions: CheckboxGroupProps<string>['options'] = [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' }
    ]

    useEffect(() => {
        form.getFieldValue("name")
        ? setValid(true)
        : setValid(false);
    }, [form, values]);

    const onFormSubmit = () => {
        save(form.getFieldsValue());
        form.setFieldValue("name", "")
        form.setFieldValue("gender", "M")
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
                clearOnDestroy
            >              
                <Row gutter={24}>
                    <Col span={22}>
                        <Row>
                            <Form.Item name="name" required  className="w-full">
                                <Input placeholder="Name" />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Form.Item name="gender" initialValue={"M"} required  className="w-full">
                                <Radio.Group options={genderOptions} onChange={handleGroupRadioChange} />
                            </Form.Item>
                        </Row>
                        <Row>
                            <Col span={18}>
                            <Form.Item>
                                <Radio.Group options={groupAssignmentOptions} onChange={handleGroupRadioChange} value={group} />
                            </Form.Item>
                            </Col>
                            <Col>
                            {
                                group === "select"
                                ? <Form.Item name="group" required={group==="select"}>
                                    <Select
                                        showSearch
                                        allowClear
                                        placeholder="Select a group"
                                        options={groups.map(group=>({...group, label: group.group?.map(name=>name.name).join(', '), value: group._id}))}
                                    /> 
                                </Form.Item>
                                : null
                            }
                            </Col>
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