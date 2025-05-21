'use client';

import { Table } from "antd";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

class DataTableProps {
    title?: string;
    data: any[] = [];
    columns: any[] = [];
    style?: CSSProperties;
    footer?: ()=>ReactNode | undefined;
}

const DataTable = ({title, data, columns, style, footer}: DataTableProps) => {
    const [transformedData, setTransformedData] = useState(data || []);

    useEffect(()=>{
        const newData = [...data].map((item, i) => {
            return {...item, key: i};
        })
        setTransformedData(newData);
    }, [data])

    /**
     * make rows editable: for statuses, types, roles
     *  - click on pencil in last column and all cells of the row are editable
     * make cells editable: for type-roles
     *  - double click on the cell, edit the cell, save on blur
     * make the record editable: for records
     *  - show button in on row hover at the end of the row (edit, edit decoument, delete, delete document)
     *  - click on pencil and open the modal
     */

    return (
        <Table
            title={()=>title}
            dataSource={transformedData}
            columns={columns}
            size="small"
            style={style}
            footer={footer}
            />
    );
}

export default DataTable;