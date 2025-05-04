'use client';

import DataTable from "../components/table";
import { Button, Drawer, Popover, Space, Tabs, TabsProps } from "antd";
import { lastNameColumns } from "./lastnames.table.conf";
import { useState } from "react";
import { firstNameColumns } from "./firstnames.table.conf";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import CreateLastnameForm from "./lastname.form";
import useSWR from 'swr';
import { fetcher } from "@/helpers/fetcher.helper";
import FirstNamesTab from "./firstnames.tab";
import LastNamesTab from "./lastnames.tab";

const Dictionary = () => {
    const [open, setOpen] = useState(false);
    const [columns, setColumns] = useState(lastNameColumns);

    const items: TabsProps['items'] = [
        {
            key: 'lastnames',
            label: 'Lastnames',
            children: <LastNamesTab />
        },
        {
            key: 'firstnames',
            label: 'Firstnames',
            children: <FirstNamesTab />
        },
    ];

    const showCreationForm = () => {
        setOpen(true);
    };

    return (
        <Tabs
            defaultActiveKey="lastnames"
            items={items}
            tabBarExtraContent={
                <Popover
                    content={<CreateLastnameForm close={()=>setOpen(false)}/>}
                    trigger="click"
                    open={open}
                    >
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={showCreationForm}/>
                </Popover>
            }
            />
    );
}


export default Dictionary;