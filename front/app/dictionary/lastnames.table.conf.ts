import { ColumnsType } from "antd/es/table";
import TableActionsPopover from "../components/popovers/table-actions.popover";

export const lastNameColumns: ColumnsType = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        dataIndex: 'actions',
        key: 'actions',
        render: TableActionsPopover,
    }
];