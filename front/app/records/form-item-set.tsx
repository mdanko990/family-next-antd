'use client'

import { Button, Col, Flex, Form, FormInstance, Input, Row, Space } from "antd";
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
    form: FormInstance,
    config: SetItemProps<K>[],
    initList: T,
    change: () => void
}

const FormItemSet = <T, K>({form, config, initList, change}: FormItemSetProps<T, K>) => {
    const [list, setList] = useState(initList);

    const add = (value: keyof T) => {
        setList({...list, [value]: new Record()});
    }
    const remove = (value: keyof T) => {
        setList({...list, [value]: undefined});
    }

    return (
        // <Form form={form} onFieldsChange={change}>
        <>
            <Flex gap={4}>
                {
                    config.map(item => (
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
                            <ToggleDivider defaultOpen label={item.label} content={item.render(item)}/>
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
        </>
        // </Form>
    )
}

export default FormItemSet;