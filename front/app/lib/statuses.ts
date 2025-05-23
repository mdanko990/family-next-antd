import { Status } from "@/models/status";

const url = 'http://localhost:5000/dictionary/statuses';

export const getAllStatuses = async () => {
    return await fetch(url).then(response => response.json());
}

export const createStatus = async (status: Status): Promise<Status> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
    })
    .then(response => response.json());
}


export const updateStatus = async (status: Status): Promise<Status> => {
    return await fetch(`${url}/${status._id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(status)
    })
    .then(response => response.json());
}

export const deleteStatus = async (id: string): Promise<void> => {
    await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    });
}