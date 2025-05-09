import TableActionsPopover from "@/app/dictionary/components/table-actions.popover";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { UserOutlined } from '@ant-design/icons';
import { FirstName } from "@/models/name";

export const firstNameGroupColumns: (editFn: Function, deleteFn: Function) => ColumnsType = (editFn, deleteFn) => [
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: '50px',
        render:(value: any, record: any) => (
            value === "M"
            ? <UserOutlined style={{color: "#6777b6"}} />
            : <UserOutlined style={{color: "#d17086"}}/>
        ),
    },
    {
        title: 'Groups',
        dataIndex: 'group',
        key: 'group',
        render: (value: FirstName[])=>(
            <span>
            {
                value && Array.isArray(value) ? value.map((item: FirstName) => item.name).join(', ') : ''
            }
            </span>
        )
    },
        {
        dataIndex: 'actions',
        key: 'actions',
        width: '50px',
        render: (value: any, record: any) => (
            <Space size="middle">
                <TableActionsPopover type='firstnames' editFn={editFn} deleteFn={deleteFn} data={record}/>
            </Space>
        ),
    }
];