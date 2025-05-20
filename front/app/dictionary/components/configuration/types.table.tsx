import DataTable from "@/app/components/table";
import palette from "@/app/lib/color-palette";
import { createType, deleteType } from "@/app/lib/types";
import { Role } from "@/models/role";
import { Button, Flex, Form, Input, message, Popconfirm, Popover } from "antd";
import { useForm } from "antd/es/form/Form";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";

const TypesTable = ({data, refresh}: {data: Role[], refresh: Function}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    
    const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name"
        },
        {
            key: "actions",
            dataIndex: "actions",
            width: "50px",
            render: (value: any, record: any) => <Flex gap={8}>
                <Pencil size={18} color={palette.grey} style={{cursor: "pointer"}}/>
                <Popconfirm
                    title="Delete the type"
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
            <Form.Item name="name">
                <Input placeholder="Type"/>
            </Form.Item>
        </Form>
        <Flex justify="space-between">
            <Button type="link" onClick={handleCancel}>Cancel</Button>
            <Button type="link" onClick={handleConfirmation}>Add</Button>
        </Flex>
        </>
    }
    
    const handleConfirmation = () => {
        createType(form.getFieldsValue())
        .then(()=>{
            message.success(`Type ${form.getFieldValue("name")} created!`)
            setOpen(false);
            refresh();
        })
        .catch((err)=>{
            message.error(`Failed to create type ${form.getFieldValue("name")}\n Error: ${err}`)
        })
    }
    
    const handleCancel = () => {
      setOpen(false);
    };

    const handleRowDeleteClick = (value: any) => {
        deleteType(value._id)
        .then(()=>{
            messageApi.success(`Type ${value.name} deleted!`)
            refresh();
        })
        .catch((err)=>{
            messageApi.error(`Failed to delete type ${value.name}\n Error: ${err}`)
        })
    }

    return (
        <>
            <Flex justify="space-between">
                <h3>Types</h3>
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

export default TypesTable;