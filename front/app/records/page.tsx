"use client"

import { useEffect, useState } from "react";
import DataTable from "../components/table";
import recordColumns from "./records.table.conf";
import { getAllRecords } from "../lib/records";
import { Record, Document } from '@/models/record'
import { Button, Flex, message, Space } from "antd";
import { Blend, RefreshCw, Skull } from "lucide-react";
import RecordInitPopconfirm from "./record-init.popconfirm";
import RecordBirthModal from "./birth/record-birth.modal";
import { FirstName, LastName } from "@/models/name";
import { getAllFirstNames, getAllFirstNamesByGender } from "../lib/firstnames";
import { getAllLastNames } from "../lib/lastnames";
import { getAllStatuses } from "../lib/statuses";
import { Status } from "@/models/status";
import { getAllTypes } from "../lib/types";
import { Type } from "@/models/type";
import { getAllRoles } from "../lib/roles";
import { Role } from "@/models/role";
import RecordMarriageModal from "./marriage/record-marriage.modal";

export default function Records() {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<Record[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [firstnames, setFirstnames] = useState<{male: FirstName[], female: FirstName[]}>({male: [], female: []});
    const [lastnames, setLastnames] = useState<LastName[]>([]);

    const [recordsTotal, setRecordsTotal] = useState(0);
    const [documentsTotal, setDocumentsTotal] = useState(0);
    const [defaultDocument, setDefaultDocument] = useState(new Document());

    useEffect(() => {
        refreshRecords();
        getAllStatuses()
        .then((res) =>{
            setStatuses(res)
        })
        getAllFirstNamesByGender()
        .then((res) =>{
            setFirstnames(res)
        })
        getAllLastNames()
        .then((res) =>{
            setLastnames(res)
        })
        getAllTypes()
        .then((res) => {
            setTypes(res);
        })
        getAllRoles()
        .then((res) => {
            setRoles(res);
        })
    },[]);

    const refreshRecords = () => {
        getAllRecords()
        .then((res) => {
            setData(res.data);
            setRecordsTotal(res.recordsTotal || 0);
            setDocumentsTotal(res.documentsTotal || 0);
        })
        .catch((error)=>{message.error(error);setData([])})
    }

    return (
        <div>
            <Flex justify="space-between">
                <Space>
                    <Space>Documents: {documentsTotal}</Space>
                    <Space>Records: {recordsTotal}</Space>
                </Space>
                <Flex gap={24}>
                    <Space>
                        <Button shape="circle" icon={<RefreshCw size={14}/>} onClick={refreshRecords}/>
                    </Space>
                    <Space>
                        <RecordInitPopconfirm initialValues={defaultDocument} save={(value: Document)=>setDefaultDocument(value)}/>
                    </Space>
                    <Space>
                        <RecordBirthModal
                            type={types.find((item:Type)=>item.name === "birth")||null}
                            firstnames={firstnames}
                            lastnames={lastnames}
                            statuses={statuses}
                            roles={roles}
                            initialDocument={defaultDocument}/>
                        <RecordMarriageModal
                            type={types.find((item:Type)=>item.name === "marriage")||null}
                            firstnames={firstnames}
                            lastnames={lastnames}
                            statuses={statuses}
                            roles={roles}
                            initialDocument={defaultDocument}/>
                        <Button shape="circle" icon={<Skull size={16} />}/>
                    </Space>
                </Flex>
            </Flex>
            <DataTable
                data={data}
                columns={recordColumns}/>
        </div>
    );
}
