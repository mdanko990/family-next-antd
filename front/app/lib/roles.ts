import { Role } from "@/models/role";

const url = 'http://localhost:5000/dictionary/roles';

export const getAllRoles = async () => {
    return await fetch(url).then(response => response.json());
}

export const createRole = async (role: Role): Promise<Role> => {
    return await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(role)
    })
    .then(response => response.json());
}

export const updateRole = async (role: Role): Promise<Role> => {
    return await fetch(`${url}/${role._id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(role)
    })
    .then(response => response.json());
}

export const deleteRole = async (id: string): Promise<void> => {
    await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
}