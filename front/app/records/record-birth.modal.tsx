import { Button, Checkbox, Col, DatePicker, Divider, Flex, Form, Input, Modal, Popover, Row, Select, Space, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { Cake, X } from "lucide-react";
import { useState } from "react";
import ToggleDivider from "./toggle-divider";
import FormItemSet from "./form-item-set";
import { MemberList, Document, Record } from "@/models/record";
import { FirstName, Gender, LastName } from "@/models/name";
import { Status } from "@/models/status";
import { createDocument } from "../lib/documents";
import { Type } from "@/models/type";
import { Role } from "@/models/role";

type RecordRole = "child" | "mother" | "father" | "godmother" | "godfather";

interface SetItemProps {
    key: RecordRole,
    label: string,
    render: (field: any) => React.JSX.Element
}

interface RecordBirthModalProps {
    type: Type | null,
    initialDocument: Document,
    firstnamesMale: FirstName[],
    firstnamesFemale: FirstName[],
    lastnames: LastName[],
    statuses: Status[],
    roles: Role[]
}

const RecordBirthModal = ({type, initialDocument, firstnamesMale, firstnamesFemale, lastnames, statuses, roles}:RecordBirthModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [gender, setGender] = useState<Gender>('M');
    const [documentForm] = useForm();
    const [recordsForm] = useForm();

    const config: SetItemProps[] = [
        {
            key: "child",
            label: "Child",
            render: (field)=><RecordForm field={field} gender={gender} isAdult={false} firstnames={gender==='M'?firstnamesMale:firstnamesFemale}/>

        },
        {
            key: "father",
            label: "Father",
            render: (field)=><RecordForm field={field} gender="M" isAdult={true} firstnames={firstnamesMale}/>
        },
        {
            key: "mother",
            label: "Mother",
            render: (field)=><RecordForm field={field} gender="F" isAdult={true} firstnames={firstnamesFemale}/>

        },
        {
            key: "godfather",
            label: "Godfather",
            render: (field)=><RecordForm field={field} gender="M" isAdult={true} firstnames={firstnamesMale}/>

        },
        {
            key: "godmother",
            label: "Godmother",
            render: (field)=><RecordForm field={field} gender="F" isAdult={true} firstnames={firstnamesFemale}/>

        }
    ];

    const showModal = () => {
      setIsModalOpen(true);
    };

    const validate = () => {
        setDisableSubmit(!recordsForm.getFieldsError().length && !documentForm.getFieldsError().length);
    }
  
    const handleOk = () => {
        documentForm.setFieldValue(["members", "child", "gender"], gender);
        const members = Object.fromEntries(
            Object.entries(documentForm.getFieldsValue().members).map(([key, value]) => [key, {
                ...value as Record,
                role: roles.find(role=> role.name === key)
            }]),
          );
        createDocument({...documentForm.getFieldsValue(), members, type: type})
        
        setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const DocumentForm = () => (
        <>
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item name="location" rules={[{ required: true }]}>
                        <Input placeholder="Location" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="archive" rules={[{ required: true }]}>
                        <Input placeholder="Archive"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item name="fond" rules={[{ required: true }]}>
                        <Input placeholder="Fond"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="inventory" rules={[{ required: true }]}>
                        <Input placeholder="Inventory"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item name="file" rules={[{ required: true }]}>
                        <Input placeholder="File"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="page" rules={[{ required: true }]}>
                        <Input placeholder="Page" type="number"/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="link" rules={[{ required: true }]}>
                <Input placeholder="Link"/>
            </Form.Item>
        </>
    )

    const RecordForm = ({field, gender, isAdult, firstnames=[]}:{field: SetItemProps, gender: Gender, isAdult: boolean,firstnames: FirstName[]}) => (
        <>
            <Space direction="vertical" key={field.key}>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item name={["members", field.key, gender==="F"&&!isAdult?"maidenname":"lastname"]}>
                            <Select
                                showSearch
                                allowClear
                                placeholder={gender==="F"&&!isAdult?"Maiden name":"Last name"}
                                options={lastnames.map(item=>({...item, label: item.name, value: item.name}))}
                                onSelect={(value: any, option: any)=>documentForm.setFieldValue(["members", field.key, gender==="F"&&!isAdult?"maidenname":"lastname"], option)}
                            />                              
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={["members", field.key, "firstname"]}>
                            <Select
                                showSearch
                                allowClear
                                placeholder={"First name"}
                                options={firstnames.map(item=>({...item, label: item.name, value: item.name}))}
                                onSelect={(value: any, option: any)=>documentForm.setFieldValue(["members", field.key, "firstname"], option)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={["members", field.key, "patronym"]}>
                            <Input placeholder="Patronym" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    {gender==="F"&&!isAdult
                    ?<Col span={8}>
                        <Form.Item name={["members", field.key, "maidenname"]}>
                            <Select
                                showSearch
                                allowClear
                                placeholder={"Maiden name"}
                                options={firstnames.map(item=>({...item, label: item.name, value: item.name}))}
                                onSelect={(value: any, option: any)=>documentForm.setFieldValue(["members", field.key, "maidenname"], option)}
                            />
                        </Form.Item>
                    </Col> : null
                    }
                    <Col span={8}>
                        <Form.Item name={["members", field.key, "status"]}>
                            <Select
                                allowClear
                                placeholder="Status"
                                options={statuses.map(item=>({...item, label: item.name, value: item.name}))}
                                onSelect={(value: any, option: any)=>documentForm.setFieldValue(["members", field.key, "status"], option)}
                            />
                        </Form.Item>
                    </Col>
                    { !isAdult
                        ? <Col span={8}>
                            <Form.Item name={["members", field.key, "gender"]}>
                                <Switch
                                    size="small"
                                    checkedChildren="F"
                                    unCheckedChildren="M"
                                    onClick={(value)=>{value?setGender('F'):setGender('M')}}
                                />
                            </Form.Item>
                        </Col>
                        : <Col span={8}></Col>
                    }
                </Row>
                <Form.Item name={["members",field.key,"role"]} initialValue={roles.find(role=>role.name===field.key)||null} hidden>
                </Form.Item>                 
            </Space>
        </>
    )

    return (
      <>
        <Button shape="circle" icon={<Cake size={16} />} onClick={showModal}/>
        <Modal
          closable={false}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: disableSubmit }}
        >
            <Form form={documentForm} initialValues={initialDocument} onValuesChange={validate}>
                <Row gutter={8} justify="space-between">
                    <Col span={10}>
                        <Form.Item name="date">
                            <DatePicker placeholder="Date"  className="w-full" />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        {/* <Form.Item>
                            <Space className='flex align-center'>
                                Gender: 
                                <Switch
                                    size="small"
                                    checkedChildren="F"
                                    unCheckedChildren="M"
                                    onClick={(value)=>{value?setGender('F'):setGender('M')}}
                                />
                            </Space>
                        </Form.Item> */}
                    </Col>
                </Row>
                <FormItemSet<MemberList, RecordRole> form={recordsForm} config={config} initList={new MemberList()} change={validate}/>
                <ToggleDivider label="Documents" content={<DocumentForm />}/>
            </Form>
        </Modal>
      </>
    );
  }

export default RecordBirthModal;