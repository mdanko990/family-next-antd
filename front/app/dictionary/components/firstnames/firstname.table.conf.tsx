import TableActionsPopover from "@/app/dictionary/components/table-actions.popover";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { UserOutlined } from '@ant-design/icons';
import { FirstNameGroup } from "@/models/name";

export const firstNameColumns: (editFn: Function, deleteFn: Function) => ColumnsType = (editFn, deleteFn) => [
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '150px',
    },
    {
        title: 'Variations',
        dataIndex: 'group',
        key: 'group',
        render: (value: FirstNameGroup, record)=>(
            <span>
            {
                value ? value.group?.filter(item => item._id !== record._id)
                .map(item => item.name).join(', ') : ''
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