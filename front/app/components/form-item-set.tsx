'use client'

import { Button, Col, Flex, Form, Row } from "antd";
import { X } from "lucide-react";
import { Record } from '@/models/record'
import { useState } from "react";
import ToggleDivider from "./toggle-divider";

interface SetItemProps<K> {
    key: K,
    label: string,
    render: (field: SetItemProps<K>) => React.JSX.Element
}

interface FormItemSetProps<T, K> {
    config: SetItemProps<K>[],
    initList: T,
}

const FormItemSet = <T, K>({ config, initList}: FormItemSetProps<T, K>) => {
    const [list, setList] = useState(initList);

    const add = (value: keyof T) => {
        setList({...list, [value]: new Record()});
    }
    const remove = (value: keyof T) => {
        setList({...list, [value]: undefined});
    }

    /**
     * disable if length of list[role] is same as limit
     */

    return (
        <Form.Item>
            <Flex gap={4}>
                {
                    config.map(item => (
                        /**wrap buttons */
                        <Button key={item.label} type="dashed" onClick={()=>add(item.key as keyof T)} block disabled={!!list[item.key as keyof T]} className="mb-4">
                        + {item.label}
                        </Button>
                    ))
                }
            </Flex>
            {
                config.map(item => (
                    list[item.key as keyof T]
                    ? <Row gutter={8} key={item.key as string}>
                        <Col span={22}>
                            <ToggleDivider defaultOpen={true} label={item.label}>{item.render(item)}</ToggleDivider>
                        </Col>
                        <Col className="pt-[21px]">
                            <X size={16}
                                cursor={'pointer'}
                                onClick={() => {
                                    remove(item.key as keyof T);
                                }}
                                />
                        </Col>
                    </Row>
                    : null
                ))
            }
        </Form.Item>
    )
}

export default FormItemSet;