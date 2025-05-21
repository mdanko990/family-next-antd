import { FirstName, Gender, LastName } from "@/models/name";
import { Button, Col, DatePicker, Flex, Form, Input, Row, Select, Space, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { RecordRole, SetItemProps } from "./record-birth.config";
import { MemberList, Document } from "@/models/record";
import { Status } from "@/models/status";
import { Role } from "@/models/role";
import TextArea from "antd/es/input/TextArea";
import FormItemSet from "@/app/components/form-item-set";
import DocumentForm from "../document.form";

interface RecordBirthFormProps {
    data: RecordDataProps,
    initialDocument: Document,
    save: (value: Document) => void,
}

interface RecordDataProps {
    lastnames: LastName[],
    firstnames: {male: FirstName[], female: FirstName[]},
    statuses: Status[],
    roles: Role[]
}

const RecordBirthForm = ({ data, initialDocument, save }: RecordBirthFormProps) => {
    const [gender, setGender] = useState<Gender>('M');
    const [form] = useForm();
    const [submittable, setSubmittable] = useState<boolean>(false);
    /**
     * SET CONFIG
     * get all roles that have birth type in type-roles =>
     * by using .map turn it into config, where:
     * key - role.name
     * label - capitalize(role.name)
     * render - RecordForm, where gender - role.gender and isAdult - role.isAdult
     */
    /**
     * SET MemberList
     * get all roles that have birth type in type-roles =>
     * create an object where key is the role and value is null at the start
     */
    const config = [
        {
            key: "child" as RecordRole,
            label: "Child",
            render: (field:any)=><RecordForm field={field} gender={gender} isAdult={false}/>
        },
        {
            key: "father" as RecordRole,
            label: "Father",
            render: (field:any)=><RecordForm field={field} gender="M"/>
        },
        {
            key: "mother" as RecordRole,
            label: "Mother",
            render: (field:any)=><RecordForm field={field} gender="F"/>
        },
        {
            key: "godfather" as RecordRole,
            label: "Godfather",
            render: (field:any)=><RecordForm field={field} gender="M"/>
            
        },
        {
            key: "godmother" as RecordRole,
            label: "Godmother",
            render: (field: any)=><RecordForm field={field} gender="F"/>
        }

    ];
    
    const RecordForm = ({field, gender, isAdult = true}:{field: SetItemProps, gender: Gender, isAdult?: boolean}) => {
        const list = gender==='M' ? data.firstnames.male : data.firstnames.female;
        return (<Form.Item>
            <Space direction="vertical" key={field.key}>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item name={["members", field.key, gender==="F"&&!isAdult?"maidenName":"lastName"]}>
                            <Select
                                showSearch
                                allowClear
                                placeholder={gender==="F"&&!isAdult?"Maiden name":"Last name"}
                                options={data.lastnames.map(item=>({...item, label: item.name, value: item.name}))}
                                onSelect={(value: any, option: any)=>handleLastnameSelect(field.key, gender==="F"&&!isAdult?"maidenName":"lastName", option)}
                            />                              
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={["members", field.key, "firstName"]}>
                            <Select
                                showSearch
                                allowClear
                                placeholder={"First name"}
                                options={list.map(item=>({...item, label: item.name, value: item.name}))}
                                onSelect={(value: any, option: any)=>form.setFieldValue(["members", field.key, "firstName"], option)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={["members", field.key, "patronym"]}>
                            <Select
                                showSearch
                                allowClear
                                placeholder={"Patronym"}
                                options={list.map(item=>({...item, label: `${item.name} - ${item.malePatronym} - ${item.femalePatronym}`, value: item.name}))}
                                onSelect={(value: any, option: any)=>form.setFieldValue(["members", field.key, "patronym"], option)}
                            />
                        </Form.Item>
                        {/* <Form.Item name={["members", field.key, "patronym"]}>
                            <Input placeholder="Patronym" />
                        </Form.Item> */}
                    </Col>
                    {gender==="F"&&isAdult
                    ?<Col span={8}>
                        <Form.Item name={["members", field.key, "maidenName"]}>
                            <Select
                                showSearch
                                allowClear
                                placeholder={"Maiden name"}
                                options={data.lastnames.map(item=>({...item, label: item.name, value: item.name}))}
                                onSelect={(value: any, option: any)=>form.setFieldValue(["members", field.key, "maidenName"], option)}
                            />
                        </Form.Item>
                    </Col> : null
                    }
                    <Col span={8}>
                        <Form.Item name={["members", field.key, "status"]}>
                            <Select
                                allowClear
                                placeholder="Status"
                                options={data.statuses.map(item=>({...item, label: item.name, value: item._id}))}
                                onSelect={(value: any, option: any)=>form.setFieldValue(["members", field.key, "status"], option)}
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
                    <Col span={24}>
                        <Form.Item name="">
                            <TextArea rows={2} />
                        </Form.Item>
                    </Col>
                </Row>
            </Space>
        </Form.Item>)
    }

    useEffect(()=>{
        form.setFieldsValue(initialDocument)
    }, [initialDocument]);    

    const handleValuesChange = () => {
        form
        .validateFields({ validateOnly: true })
        .then((value) => setSubmittable(!!!value.errorFields.length))
        .catch((value) => setSubmittable(!!!value.errorFields.length));
    }

    const handleLastnameSelect = (role: string, prop: any, value: any) => {
        if(role === "child" || role === "mother" || role === "father") {
            if(!form.getFieldValue(["members", "child", prop])){
                form.setFieldValue(["members", "child", prop], value.value);
            }
            if(!form.getFieldValue(["members", "mother", "lastName"])) {
                form.setFieldValue(["members", "mother", "lastName"], value.value);
            }
            if(!form.getFieldValue(["members", "father", "lastName"])) {
                form.setFieldValue(["members", "father", "lastName"], value.value);
            }
        } else {
            form.setFieldValue(["members", role, prop], value.value);
        }
    }
    
    const handleSave = () => {
        form.setFieldValue(["members", "child", "gender"], gender);
        form.setFieldValue(["members", "child", "age"], 0);
        form.setFieldValue(["members", "child", "ageUnit"], "y");
        save(form.getFieldsValue())
    }

    return (
        <>
        <Form form={form} onValuesChange={handleValuesChange}>
            <Row gutter={8} justify="space-between">
                <Col span={10}>
                    <Form.Item name="date" key="date">
                        <DatePicker placeholder="Date"  className="w-full" />
                    </Form.Item>
                </Col>
            </Row>
            <FormItemSet<MemberList, RecordRole> config={config} initList={new MemberList()}/>
            <DocumentForm/>
        </Form>
        <Flex justify="end">
            <Button  type="primary" onClick={handleSave} disabled={!submittable}>Save</Button>
        </Flex>
        </>
    )
}

export default RecordBirthForm;