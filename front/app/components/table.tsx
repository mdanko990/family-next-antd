'use client';

import { Table } from "antd";
import { useState } from "react";
import TableActionsPopover from "./popovers/table-actions.popover";

class DataTableProps {
    data: any[] = [];
    columns: any[] = [];
}

const DataTable = ({data, columns}: DataTableProps) => {
    const [openContextMenu, setOpenContextMenu] = useState(false);

    const handleRowOnContextMenu = () => {
        setOpenContextMenu(true);
    }

    return (
        <Table
            dataSource={data}
            columns={columns}
            size="small"
            />
    );
}

export default DataTable;