import { notification } from "antd";

const url = 'http://localhost:5000/dictionary/roles';

export const getAllRoles = async () => {
    return await fetch(url).then(response => response.json());
}
