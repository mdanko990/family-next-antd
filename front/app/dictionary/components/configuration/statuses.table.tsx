import DataTable from "@/app/components/table";
import palette from "@/app/lib/color-palette";
import { createStatus, deleteStatus } from "@/app/lib/statuses";
import { Status } from "@/models/status";
import { Button, Flex, Form, Input, message, Popconfirm, Popover } from "antd";
import { useForm } from "antd/es/form/Form";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";

const StatusesTable = ({data, refresh}: {data: Status[], refresh: Function}) => {
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
                    title="Delete the status"
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
                <Input placeholder="Status"/>
            </Form.Item>
        </Form>
        <Flex justify="space-between">
            <Button type="link" onClick={handleCancel}>Cancel</Button>
            <Button type="link" onClick={handleConfirmation}>Add</Button>
        </Flex>
        </>
    }
    
    const handleConfirmation = () => {
        createStatus(form.getFieldsValue())
        .then(()=>{
            message.success(`Status ${form.getFieldValue("name")} created!`)
            setOpen(false);
            refresh();
        })
        .catch((err)=>{
            message.error(`Failed to create status ${form.getFieldValue("name")}\n Error: ${err}`)
        })
    }
    
    const handleCancel = () => {
      setOpen(false);
    };

    const handleRowDeleteClick = (value: any) => {
        deleteStatus(value._id)
        .then(()=>{
            messageApi.success(`Status ${value.name} deleted!`)
            refresh();
        })
        .catch((err)=>{
            messageApi.error(`Failed to delete status ${value.name}\n Error: ${err}`)
        })
    }

    return (
        <>
            <Flex justify="space-between">
                <h3>Statuses</h3>
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

export default StatusesTable;