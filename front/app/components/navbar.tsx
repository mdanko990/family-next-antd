'use client';

import React, { useState } from "react";
import { Button, Grid, Menu, Space, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";


const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function Navbar() {
  const screens = useBreakpoint();

  const menuItems = [
    {
      label: <Link href="/records">Records</Link>,
      key: "records",
    },
    {
      label: <Link href="/dictionary">Dictionary</Link>,
      key: "dictionary",
    },
  ];

  const [current, setCurrent] = useState("records");
  const onClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <nav>
          <Menu
            className="w-full flex justify-center"
            mode="horizontal"
            items={menuItems}
            onClick={onClick}
            selectedKeys={screens.md ? [current] : undefined}
            overflowedIndicator={
              <Button type="text" icon={<MenuOutlined />}></Button>
            }
          />
    </nav>
  );
}
