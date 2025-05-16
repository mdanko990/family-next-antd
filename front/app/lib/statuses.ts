import { notification } from "antd";

const url = 'http://localhost:5000/dictionary/statuses';

export const getAllStatuses = async () => {
    return await fetch(url).then(response => response.json());
}
