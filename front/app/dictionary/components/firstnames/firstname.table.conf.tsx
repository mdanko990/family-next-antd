import TableActionsPopover from "@/app/dictionary/components/table-actions.popover";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { UserOutlined } from '@ant-design/icons';
import { FirstNameGroup } from "@/models/name";
import palette from "@/app/lib/color-palette";

export const firstNameColumns: (editFn: Function, deleteFn: Function) => ColumnsType = (editFn, deleteFn) => [
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: '50px',
        render:(value: any, record: any) => (
            value === "M"
            ? <UserOutlined style={{color: palette.blue}} />
            : <UserOutlined style={{color: palette.pink}}/>
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