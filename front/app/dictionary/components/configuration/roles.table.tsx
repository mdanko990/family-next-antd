import DataTable from "@/app/components/table";
import { GenderRenderer } from "@/app/components/table-cell.renderer";
import palette from "@/app/lib/color-palette";
import { createRole, deleteRole } from "@/app/lib/roles";
import { Gender } from "@/models/name";
import { Role } from "@/models/role";
import { Button, Col, Flex, Form, Input, message, Popconfirm, Popover, Row, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";

const RolesTable = ({data, refresh}: {data: Role[], refresh: Function}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState<Gender>("M");
    const [form] = useForm();
    
    const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name"
        },
        {
            key: "gender",
            title: "Gender",
            dataIndex: "gender",
            render: GenderRenderer
        },
        {
            key: "actions",
            dataIndex: "actions",
            width: "50px",
            render: (value: any, record: any) => <Flex gap={8}>
                <Pencil size={18} color={palette.grey} style={{cursor: "pointer"}}/>
                <Popconfirm
                    title="Delete the role"
                    onConfirm={()=>handleRowDeleteClick(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Trash2 size={18} color={palette.grey} style={{cursor: "pointer"}}/>
                </Popconfirm>
            </Flex>
        }
    ];
    
    const content = () => {
        return <>
        <Form form={form} clearOnDestroy>
            <Row gutter={8}>
                <Col span={20}>
                    <Form.Item name="name">
                        <Input placeholder="Role"/>
                    </Form.Item>
                </Col>
                <Col span={2}>
                    <Form.Item>
                        <Switch
                            size="small"
                            checkedChildren="F"
                            unCheckedChildren="M"
                            onClick={(value)=>{value?setGender('F'):setGender('M')}}
                            />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        <Flex justify="space-between" gap={8}>
            <Button type="link" onClick={handleCancel}>Cancel</Button>
            <Button type="link" onClick={handleConfirmation}>Add</Button>
        </Flex>
        </>
    }
    
    const handleConfirmation = () => {
        createRole({...form.getFieldsValue(), gender})
        .then(()=>{
            message.success(`Role ${form.getFieldValue("name")} created!`)
            setOpen(false);
            refresh();
        })
        .catch((err)=>{
            message.error(`Failed to create role ${form.getFieldValue("name")}\n Error: ${err}`)
        })
    }
    
    const handleCancel = () => {
      setOpen(false);
    };

    const handleRowDeleteClick = (value: any) => {
        deleteRole(value._id)
        .then(()=>{
            messageApi.success(`Role ${value.name} deleted!`)
            refresh();
        })
        .catch((err)=>{
            messageApi.error(`Failed to delete role ${value.name}\n Error: ${err}`)
        })
    };

    return (
        <>
            <Flex justify="space-between">
                <h3>Roles</h3>
                <Flex gap={8}>
                    <Button shape="circle" size="small" icon={<RefreshCw size={14} />} onClick={()=>refresh()}/>
                    <Popover
                        content={content}
                        trigger="click"
                        open={open}
                        onOpenChange={(value)=>setOpen(value)}
                        destroyTooltipOnHide
                        >
                        <Button shape="circle" size="small" icon={<Plus size={14}/>}/>
                    </Popover>
                </Flex>
            </Flex>
            <DataTable data={data} columns={columns}/>
            {contextHolder}
        </>
    )
}

export default RolesTable;