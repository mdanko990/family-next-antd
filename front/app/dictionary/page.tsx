'use client';

import { Tabs, TabsProps } from "antd";
import FirstNamesTab from "./components/firstnames/firstnames.tab";
import LastNamesTab from "./components/lastnames/lastnames.tab";
import ConfigurationTab from "./components/configuration/configuration.tab";

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
        {
            key: 'configuration',
            label: 'Configuration',
            children: <ConfigurationTab />,
            className: 'flex w-full'
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