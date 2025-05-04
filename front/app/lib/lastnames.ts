import { Name } from "@/models/name";

const url = 'http://localhost:5000/dictionary/lastnames';

export const getAllLastNames = async () => {
    return await fetch(url).then(response => response.json());
}

export const createLastName = async (lastName: Name) => {
    return await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // Important: Tell the server you're sending JSON
        },
        body: JSON.stringify(lastName)
    })
    .then(response => response.json());
}