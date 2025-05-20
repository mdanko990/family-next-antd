import { getAllRoles } from "@/app/lib/roles";
import { getAllTypeRoles } from "@/app/lib/type-roles";
import { getAllTypes } from "@/app/lib/types";
import { Role } from "@/models/role";
import { Type } from "@/models/type";
import { TypeRole } from "@/models/type-role";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import RolesTable from "./roles.table";
import TypesTable from "./types.table";
import StatusesTable from "./statuses.table";
import { getAllStatuses } from "@/app/lib/statuses";
import { Status } from "@/models/status";
import TypeRolesTable from "./type-role.table";

const ConfigurationTab = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [typeRoles, setTypeRoles] = useState<TypeRole[]>([]);

    useEffect(() => {
        refreshRoles();
        refreshTypes();
        refreshStatuses();
        refreshTypeRoles();
    }, []);

    const refreshTypes = () => {
        getAllTypes().then((data)=>setTypes(data));
    }

    const refreshRoles = () => {
        getAllRoles().then((data)=>setRoles(data));
    }

    const refreshTypeRoles = () => {
        getAllTypeRoles().then((data)=>setTypeRoles(data));
    }
    
    const refreshStatuses = () => {
        getAllStatuses().then((data)=>setStatuses(data));
    }

    return (
        <>
        <Row gutter={[8, 8]} className="w-full">
            <Col span={12}>
                <Card>
                    <RolesTable data={roles} refresh={refreshRoles}/>
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <TypesTable data={types} refresh={refreshTypes}/>
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <StatusesTable data={statuses} refresh={refreshStatuses}/>
                </Card>
            </Col>
            <Col span={12}>
                <Card>
                    <TypeRolesTable data={{roles, types, typeRoles}} refresh={refreshTypeRoles}/>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default ConfigurationTab;