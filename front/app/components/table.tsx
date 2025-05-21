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