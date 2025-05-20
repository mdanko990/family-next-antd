import { Type } from "@/models/type";
import { notification } from "antd";

const url = 'http://localhost:5000/dictionary/types';

export const getAllTypes = async () => {
    return await fetch(url).then(response => response.json());
}

export const createType = async (type: Type): Promise<Type> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(type)
    })
    .then(response => response.json());
}


export const updateType = async (type: Type): Promise<Type> => {
    return await fetch(`${url}/${type._id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(type)
    })
    .then(response => response.json());
}

export const deleteType = async (id: string): Promise<void> => {
    await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    });
}