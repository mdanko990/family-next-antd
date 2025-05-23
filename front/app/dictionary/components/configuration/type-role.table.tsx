import DataTable2 from "@/app/components/editable";
import capitalize from "@/helpers/capitalize";
import { Role } from "@/models/role";
import { Type } from "@/models/type";
import { Button, Flex, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const TypeRolesTable = ({data, refresh}: {data: {roles: Role[], types: Type[], typeRoles: any[]}, refresh: Function}) => {
    const [messageApi, contextHolder] = message.useMessage();
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
            editable: true,
            dataIndex: type._id,
            width: "70px",
            render: (value: any, record: any) => {
                const dependency = record?.types?.find((item: any) => item.type?.name == type.name);
                return <span>{dependency ? dependency.limit : 0}</span>
            }
        })) || [];
        setColumns([firstCol, ...cols]);
    }, [data])
    
    return (
        <>
            <Flex justify="space-between">
                <h3>Type - Role dependency</h3>
                <Button shape="circle" size="small" icon={<RefreshCw size={14} />} onClick={()=>refresh()}/>
            </Flex>
            <DataTable2 data={data?.typeRoles||[]} defaultColumns={columns} mode="row"/>
            {contextHolder}
        </>
    )
}

export default TypeRolesTable;