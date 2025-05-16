import { notification } from "antd";

const url = 'http://localhost:5000/dictionary/types';

export const getAllTypes = async () => {
    return await fetch(url).then(response => response.json());
}
