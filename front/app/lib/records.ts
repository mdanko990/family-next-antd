import { LastName } from "@/models/name";
import { notification } from "antd";

const url = 'http://localhost:5000/records';

export const getAllRecords = async () => {
    return await fetch(url).then(response => response.json());
}
