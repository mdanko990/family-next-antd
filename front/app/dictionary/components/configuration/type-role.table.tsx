import DataTable from "@/app/components/table";
import palette from "@/app/lib/color-palette";
import { createType, deleteType } from "@/app/lib/types";
import capitalize from "@/helpers/capitalize";
import { Role } from "@/models/role";
import { Type } from "@/models/type";
import { TypeRole } from "@/models/type-role";
import { Button, Flex, Form, Input, message, Popconfirm, Popover } from "antd";
import { useForm } from "antd/es/form/Form";
import { Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { title } from "process";
import { useEffect, useState } from "react";

const TypeRolesTable = ({data, refresh}: {data: {roles: Role[], types: Type[], typeRoles: any[]}, refresh: Function}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [columns, setColumns] = useState<any[]>([]);

    useEffect(()=>{
        const firstCol = {
            key: "role",
            title: "Role",
            dataIndex: "role",
            render: (value: any, record: any) => (<div>{capitalize(record?.name) || ''}</div>)
        }
        const cols = data.types.map(type => ({
            key: type.name,
            title: capitalize(type.name),
            dataIndex: type._id,
            width: "70px",
            render: (value: any, record: any) => {
                const dependency = record?.types?.find((item: any) => item.type?.name == type.name);
                return <span>{dependency ? dependency.limit : null}</span>
            }
        }));
        setColumns([firstCol, ...cols]);
    }, [data])
    
    return (
        <>
            <Flex justify="space-between">
                <h3>Type - Role dependency</h3>
                <Button shape="circle" size="small" icon={<RefreshCw size={14} />} onClick={()=>refresh()}/>
            </Flex>
            <DataTable data={data.typeRoles} columns={columns}/>
            {contextHolder}
        </>
    )
}

export default TypeRolesTable;