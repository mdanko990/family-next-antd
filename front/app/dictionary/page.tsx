'use client';

import { Tabs, TabsProps } from "antd";
import FirstNamesTab from "./components/firstnames/firstnames.tab";
import LastNamesTab from "./components/lastnames/lastnames.tab";

const Dictionary = () => {
    const items: TabsProps['items'] = [
        {
            key: 'lastnames',
            label: 'Lastnames',
            children: <LastNamesTab />,
            className: 'flex justify-center'
        },
        {
            key: 'firstnames',
            label: 'Firstnames',
            children: <FirstNamesTab />,
            className: 'flex justify-center'
        },
    ];

    return (
        <Tabs
            defaultActiveKey="lastnames"
            items={items}
            />
    );
}


export default Dictionary;