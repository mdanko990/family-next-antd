import { LastName } from "@/models/name";
import { notification } from "antd";

const url = 'http://localhost:5000/dictionary/lastnames';

export const getAllLastNames = async () => {
    return await fetch(url).then(response => response.json());
}

export const createLastName = async (lastName: LastName) => {
    return await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lastName)
    })
    .then(response => response.json())
    .then(() => {
        notification.success({
            message: 'Lastname was added',
        });
    })
    .catch((error) => {
        notification.error({
            message: 'Lastname creation failed',
            description: error
        });
    });
}

export const updateLastName = async (lastName: LastName) => {
    return await fetch(`${url}/${lastName._id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lastName)
    })
    .then(response => response.json())
        .then(() => {
        notification.success({
            message: 'Lastname was modified',
        });
    })
    .catch((error) => {
        notification.error({
            message: 'Lastname modification failed',
            description: error
        });
    });
}

export const deleteLastName = async (id: string) => {
    return await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
        .then(() => {
        notification.success({
            message: 'Lastname was deleted',
        });
    })
    .catch((error) => {
        notification.error({
            message: 'Lastname deleting failed',
            description: error
        });
    });
}