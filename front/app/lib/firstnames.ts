import { FirstName } from "@/models/name";
import { notification } from "antd";

const url = 'http://localhost:5000/dictionary/firstnames';

export const getAllFirstNames = async () => {
    return await fetch(url).then(response => response.json());
}

export const getAllFirstNamesByGroups = async () => {
    return await fetch(`${url}/by-groups`).then(response => response.json());
}

export const getAllFirstNamesByNames = async () => {
    return await fetch(`${url}/by-names`).then(response => response.json());
}

export const getAllFirstNamesByGender = async () => {
    return await fetch(`${url}/by-gender`).then(response => response.json());
}

export const createFirstName = async (firstName: FirstName): Promise<FirstName> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(firstName)
    })
    .then(response => response.json())
    .then((response) => {
        notification.success({
            message: 'Firstname was added',
        });
        return response;
    })
    .catch((error) => {
        notification.error({
            message: 'Firstname creation failed',
            description: error
        });
    });
}

export const updateFirstName = async (firstName: FirstName) => {
    return await fetch(`${url}/${firstName._id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(firstName)
    })
    .then(response => response.json())
        .then(() => {
        notification.success({
            message: 'Firstname was modified',
        });
    })
    .catch((error) => {
        notification.error({
            message: 'Firstname modification failed',
            description: error
        });
    });
}

export const deleteFirstName = async (id: string) => {
    return await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
        .then(() => {
        notification.success({
            message: 'Firstname was deleted',
        });
    })
    .catch((error) => {
        notification.error({
            message: 'Firstname deleting failed',
            description: error
        });
    });
}