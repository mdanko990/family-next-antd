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
        sorter: (a, b) => {
            return (a.gender === b.gender) ? 0 : a ? -1 : 1;
        }
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '150px',
        sorter: (a: any, b: any) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }
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