import { ColumnsType } from "antd/es/table";
import TableActionsPopover from "../table-actions.popover";
import { Space } from "antd";

export const lastNameColumns: (editFn: Function, deleteFn: Function) => ColumnsType = (editFn, deleteFn) => [
    {
        title: 'Male',
        dataIndex: 'male',
        key: 'male',
    },
    {
        title: 'Female',
        dataIndex: 'female',
        key: 'female',
    },
    {
        dataIndex: 'actions',
        key: 'actions',
        width: '50px',
        render: (value: any, record: any) => (
            <Space size="middle">
                <TableActionsPopover type="lastnames" editFn={editFn} deleteFn={deleteFn} data={record}/>
            </Space>
        ),
    }
];