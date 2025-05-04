import { ColumnsType } from "antd/es/table";

export const firstNameColumns: ColumnsType = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Variations',
        dataIndex: 'similar',
        key: 'similar',
    },
];